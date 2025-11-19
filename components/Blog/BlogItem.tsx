"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface InlineNode {
  type?: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  url?: string;
  children?: InlineNode[];
}

interface ContentBlock {
  type: string;
  level?: number;
  format?: string;
  children: InlineNode[];
}

interface Blog {
  Title: string;
  Introduction: ContentBlock[];
  Date: string;
  Content: ContentBlock[];
  Gallery?: { url: string }[];
  Tags?: string[];
}

// --- helpers ---
const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const plainTextFromInline = (nodes: InlineNode[] = []): string =>
  nodes
    .map((c) =>
      c.text
        ? c.text
        : c.children
        ? plainTextFromInline(c.children as InlineNode[])
        : ""
    )
    .join(" ");

const readingTimeFromBlocks = (blocks: ContentBlock[] = []): number => {
  const words = blocks
    .map((b) =>
      Array.isArray(b.children) ? plainTextFromInline(b.children) : ""
    )
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return minutes;
};

// --- component ---
// Fonction pour formater le texte (gras, italique, souligné, lien)
function renderInline(child: InlineNode, idx: number): React.ReactNode {
  if (child.type === "link") {
    return (
      <a
        key={idx}
        href={child.url}
        target="_blank"
        className="text-lightBlue underline"
      >
        {child.children?.map((c, i) => renderInline(c, i))}
      </a>
    );
  }

  let content: React.ReactNode = child.text;
  if (child.bold) content = <strong key={idx}>{content}</strong>;
  if (child.italic) content = <em key={idx}>{content}</em>;
  if (child.underline) content = <u key={idx}>{content}</u>;

  return content;
}

function renderInlineNodes(children: InlineNode[]): React.ReactNode {
  return children.map((child, idx) => renderInline(child, idx));
}

// Fonction pour afficher l'Introduction et le Content
function renderContent(blocks: ContentBlock[]) {
  return blocks.map((block, index) => {
    // Gestion des titres h1-h6
    if (block.type === "heading") {
      const level = block.level || 1;
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      const headingClass =
        level === 1
          ? "text-5xl"
          : level === 2
          ? "text-4xl"
          : level === 3
          ? "text-3xl"
          : "text-2xl";
      const id = slugify(plainTextFromInline(block.children));
      return (
        <HeadingTag
          key={index}
          id={id}
          className={`mt-16 mb-4 font-semibold text-gray-900 scroll-mt-28 ${headingClass}`}
        >
          {renderInlineNodes(block.children)}
        </HeadingTag>
      );
    }

    // Gestion des paragraphes
    if (block.type === "paragraph") {
      return (
        <p key={index} className="text-lg leading-relaxed mb-4 text-gray-700">
          {renderInlineNodes(block.children)}
        </p>
      );
    }

    // Gestion des citations
    if (block.type === "quote") {
      return (
        <blockquote
          key={index}
          className="border-l-4 border-gray-500 pl-4 italic text-gray-600 mb-4"
        >
          {renderInlineNodes(block.children)}
        </blockquote>
      );
    }

    // Gestion des listes
    if (block.type === "list") {
      if (block.format === "unordered") {
        return (
          <ul key={index} className="list-disc list-inside mb-4">
            {block.children.map((item, itemIdx) => (
              <li key={itemIdx} className="text-lg text-gray-700">
                {item.children && renderInlineNodes(item.children)}
              </li>
            ))}
          </ul>
        );
      }
      if (block.format === "ordered") {
        return (
          <ol key={index} className="list-decimal list-inside mb-4">
            {block.children.map((item, itemIdx) => (
              <li key={itemIdx} className="text-lg text-gray-700">
                {item.children && renderInlineNodes(item.children)}
              </li>
            ))}
          </ol>
        );
      }
    }

    return null;
  });
}

export default function BlogItem({ blog }: { blog: Blog }) {
  const articleRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation();
  const router = useRouter();

  // TOC removed per request

  const minutes = useMemo(
    () =>
      readingTimeFromBlocks([
        ...(blog?.Introduction || []),
        ...(blog?.Content || []),
      ]),
    [blog]
  );

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = Math.min(
        Math.max(window.scrollY - el.offsetTop, 0),
        total
      );
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!blog) return <p className="text-center">Article non trouvé.</p>;

  return (
    <article
      ref={articleRef}
      className="max-w-6xl mx-auto flex flex-col pt-16 md:pt-24 pb-56 px-8"
    >
      {/* Reading progress bar */}
      <div
        aria-hidden
        className="fixed left-0 right-0 top-0 h-1 z-[60] bg-transparent"
      >
        <div
          className="h-full bg-gradient-to-r from-darkBlue to-black transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Titre et introduction en pleine largeur */}
      <div className="w-full max-w-6xl">
        {/* Breadcrumbs + meta */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 py-5">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page" className="text-gray-700">
            Article
          </span>
        </nav>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 leading-tight">
          {blog.Title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <time dateTime={new Date(blog.Date).toISOString()}>
            {formatDate(blog.Date)}
          </time>
          <span aria-hidden>•</span>
          <span>
            {minutes} {t("min_read")}
          </span>
        </div>
        {!!(blog.Tags && blog.Tags.length) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {blog.Tags.map((tg, i) => (
              <span
                key={`${tg}-${i}`}
                className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 ring-1 ring-slate-200"
              >
                {tg}
              </span>
            ))}
          </div>
        )}
        {renderContent(blog.Introduction)}

        {/* TOC removed */}
      </div>

      {/* Contenu principal en une seule colonne */}
      <div className="mt-16 lg:mt-24">
        {/* Texte */}
        <div className="w-full prose prose-lg max-w-none">
          {renderContent(blog.Content)}

          {/* Share actions */}
          <div className="mt-10 flex items-center gap-3 text-sm text-slate-700">
            <span className="font-medium">{t("share")}:</span>
            <ShareButtons />
          </div>

          <div className="mt-12">
            <button
              onClick={() => {
                try {
                  const ref = document.referrer || "";
                  const { pathname } = new URL(ref, window.location.origin);
                  if (pathname.startsWith("/blog")) {
                    router.back();
                    return;
                  }
                } catch {}
                router.push("/blog");
              }}
              className="inline-flex items-center gap-2 text-blue-700 hover:underline"
            >
              ← {t("back_to_blog")}
            </button>
          </div>
        </div>
      </div>

      {/* Galerie d'images pleine largeur sous le contenu */}
      {blog.Gallery && blog.Gallery.length > 0 && (
        <div className="w-full pt-10">
          <BlogGallery
            images={blog.Gallery}
            variant="full"
            title={blog.Title}
          />
        </div>
      )}
    </article>
  );
}

function formatDate(s: string): string {
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function ShareButtons() {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  const url = typeof window !== "undefined" ? window.location.href : "";

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const open = (shareUrl: string) => () =>
    window.open(shareUrl, "_blank", "noopener,noreferrer");

  const encoded = encodeURIComponent(url);
  const title =
    typeof document !== "undefined" ? encodeURIComponent(document.title) : "";

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={doCopy}
        className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800"
        aria-live="polite"
      >
        {t("copy_link")}
        {copied ? " ✓" : ""}
      </button>
      <button
        onClick={open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`
        )}
        className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800"
      >
        LinkedIn
      </button>
      <button
        onClick={open(
          `https://twitter.com/intent/tweet?url=${encoded}&text=${title}`
        )}
        className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800"
      >
        X
      </button>
    </div>
  );
}

function BlogGallery({
  images,
  variant = "grid",
  title,
}: {
  images: { url: string }[];
  variant?: "grid" | "sidebar" | "gridCompact" | "full";
  title?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const isFull = variant === "full";
  const gridCols = isFull
    ? ""
    : variant === "gridCompact"
    ? "grid-cols-2 sm:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-3";
  const aspect = isFull
    ? "aspect-[16/9] md:aspect-[21/9]"
    : variant === "gridCompact"
    ? "aspect-[4/3]"
    : "aspect-[4/3] md:aspect-[16/10]";
  const gap = isFull
    ? "space-y-6"
    : variant === "gridCompact"
    ? "gap-3"
    : "gap-4";

  return (
    <div>
      {isFull ? (
        <div className={`${gap}`}>
          {images.map((image, i) => (
            <button
              key={i}
              className={`relative w-full ${aspect} overflow-hidden rounded-xl border border-slate-200 group block`}
              onClick={() => setOpenIdx(i)}
              aria-label={`Ouvrir l'image ${i + 1}`}
            >
              <Image
                src={image.url}
                alt={`Image ${i + 1} ${title ? `- ${title}` : ""}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="100vw"
              />
            </button>
          ))}
        </div>
      ) : (
        <div className={`grid ${gridCols} ${gap}`}>
          {images.map((image, i) => (
            <button
              key={i}
              className={`relative w-full ${aspect} overflow-hidden rounded-xl border border-slate-200 group`}
              onClick={() => setOpenIdx(i)}
              aria-label={`Ouvrir l'image ${i + 1}`}
            >
              <Image
                src={image.url}
                alt={`Image ${i + 1} ${title ? `- ${title}` : ""}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 1000px, 100vw"
              />
            </button>
          ))}
        </div>
      )}

      {openIdx !== null && (
        <Lightbox
          images={images}
          index={openIdx}
          onClose={() => setOpenIdx(null)}
          onPrev={() =>
            setOpenIdx((i) => (i! > 0 ? i! - 1 : images.length - 1))
          }
          onNext={() =>
            setOpenIdx((i) => (i! < images.length - 1 ? i! + 1 : 0))
          }
          title={title}
        />
      )}
    </div>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  title,
}: {
  images: { url: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Agrandir l'image"
      onClick={onClose}
    >
      <div className="absolute inset-0" />
      <div className="relative w-full max-w-5xl h-[80vh]">
        <Image
          src={images[index].url}
          alt={`Image ${index + 1} ${title ? `- ${title}` : ""}`}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>
      {/* Controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Image précédente"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white p-3"
      >
        ‹
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Image suivante"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white p-3"
      >
        ›
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Fermer"
        className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 text-white p-3"
      >
        ✕
      </button>
    </div>
  );
}
