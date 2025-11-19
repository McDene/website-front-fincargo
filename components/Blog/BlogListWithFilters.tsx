"use client";

import { useEffect, useMemo, useState } from "react";
import BlogOverview from "@/components/Blog/BlogOverview";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Tag = { id: number | string; slug: string; name: string };
type BlogItem = Record<string, unknown>;

// Match BlogOverview expected shape
interface OverviewBlog {
  id: number;
  PrefaceTitle: string;
  Date: string;
  Slug: string;
  PrefaceImage?: { url: string };
  TagLabel?: string;
  TagLabels?: string[];
}

function normalizeTags(raw: unknown[]): Tag[] {
  const arr = Array.isArray(raw) ? raw : [];
  return arr
    .map((v) => {
      const t = v as Record<string, unknown>;
      return {
        id:
          (t?.id as number | string) ??
          (t?.documentId as string) ??
          (t?.slug as string) ??
          (t?.Slug as string) ??
          (t?.tag as string) ??
          (t?.name as string) ??
          "tag",
        slug: ((t?.slug as string) ?? (t?.Slug as string) ?? "").toString(),
        name:
          ((t?.tag as string) ||
            (t?.Tag as string) ||
            (t?.name as string) ||
            (t?.Name as string) ||
            "").toString(),
      } as Tag;
    })
    .filter((t) => t.slug && t.name);
}

function extractBlogTagSlugs(blog: BlogItem): string[] {
  const out: string[] = [];
  const push = (v?: string) => {
    if (typeof v === "string" && v) out.push(v.toLowerCase());
  };
  const candidates: unknown[] = [];
  const b = blog as Record<string, unknown>;
  if (Array.isArray(b?.tags)) candidates.push(...(b.tags as unknown[]));
  if (Array.isArray(b?.Tags)) candidates.push(...(b.Tags as unknown[]));
  const tagsData = (b?.tags as Record<string, unknown> | undefined)?.data;
  const TagsData = (b?.Tags as Record<string, unknown> | undefined)?.data;
  if (Array.isArray(tagsData)) candidates.push(...(tagsData as unknown[]));
  if (Array.isArray(TagsData)) candidates.push(...(TagsData as unknown[]));
  const attr = (b?.attributes as Record<string, unknown>) || {};
  const attrTagsData = (attr?.tags as Record<string, unknown> | undefined)?.data;
  const attrTagsUpperData = (attr?.Tags as Record<string, unknown> | undefined)?.data;
  if (Array.isArray(attrTagsData)) candidates.push(...(attrTagsData as unknown[]));
  if (Array.isArray(attrTagsUpperData)) candidates.push(...(attrTagsUpperData as unknown[]));
  for (const t of candidates) {
    if (!t) continue;
    const obj = t as Record<string, unknown>;
    push(
      (obj?.slug as string) ||
        (obj?.Slug as string) ||
        ((obj?.attributes as Record<string, unknown> | undefined)?.slug as string) ||
        ((obj?.attributes as Record<string, unknown> | undefined)?.Slug as string)
    );
  }
  return out;
}

export default function BlogListWithFilters({
  items,
  tags: rawTags,
}: {
  items: BlogItem[];
  tags: unknown[];
}) {
  const tags = useMemo(() => normalizeTags(rawTags), [rawTags]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string | null>(() =>
    (searchParams.get("tag") || "").toLowerCase() || null
  );

  // Keep state in sync with URL (back/forward or manual changes)
  useEffect(() => {
    const current = (searchParams.get("tag") || "").toLowerCase() || null;
    setSelected((prev) => (prev !== current ? current : prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const setQueryTag = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!slug) {
      params.delete("tag");
    } else {
      params.set("tag", slug.toLowerCase());
    }
    const qs = params.toString();
    setSelected(slug ? slug.toLowerCase() : null);
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: true });
  };

  const filteredOverview: OverviewBlog[] = useMemo(() => {
    const source = selected
      ? (items || []).filter((b) =>
          extractBlogTagSlugs(b).includes((selected || "").toLowerCase())
        )
      : items || [];
    return source
      .map(toOverviewBlog)
      .filter((v): v is OverviewBlog => v !== null);
  }, [items, selected]);

  const filters = (
    <>
      <button
        onClick={() => setQueryTag(null)}
        className={`px-3 py-1.5 rounded-full text-sm ring-1 transition ${
          !selected
            ? "bg-darkBlue text-white ring-darkBlue"
            : "bg-white text-slate-800 ring-slate-300 hover:bg-slate-50"
        }`}
      >
        All
      </button>
      {tags.map((t) => (
        <button
          key={String(t.id)}
          onClick={() => setQueryTag(t.slug)}
          className={`px-3 py-1.5 rounded-full text-sm ring-1 transition ${
            selected === t.slug.toLowerCase()
              ? "bg-darkBlue text-white ring-darkBlue"
              : "bg-white text-slate-800 ring-slate-300 hover:bg-slate-50"
          }`}
        >
          {t.name}
        </button>
      ))}
    </>
  );

  return <BlogOverview blogData={filteredOverview} filters={tags.length > 0 ? filters : undefined} />;
}

// --- helpers to adapt Strapi payloads to OverviewBlog ---
const toOverviewBlog = (raw: BlogItem): OverviewBlog | null => {
  const b = raw as Record<string, unknown>;

  // id
  const idRaw = (b?.id as number | undefined) ?? undefined;
  const id = typeof idRaw === "number" ? idRaw : stableIdFrom(b);

  // Prefer flat keys, then attributes.* fallbacks
  const attr = (b?.attributes as Record<string, unknown>) || {};
  const PrefaceTitle = stringish(b?.PrefaceTitle) || stringish(b?.Title) || stringish(attr?.PrefaceTitle) || stringish(attr?.Title) || "";
  const Slug = stringish(b?.Slug) || stringish(attr?.Slug) || "";
  const DateVal = stringish(b?.Date) || stringish(attr?.Date) || new Date().toISOString();

  // PrefaceImage URL – handle either flat { PrefaceImage: { url } } or nested attributes
  const imageFlat = (b?.PrefaceImage as Record<string, unknown>) || undefined;
  const imageAttr = (attr?.PrefaceImage as Record<string, unknown>) || undefined;
  const imageData = (imageAttr?.data as Record<string, unknown>) || undefined;
  const imageDataAttr = (imageData?.attributes as Record<string, unknown>) || undefined;
  const url =
    stringish((imageFlat || {})?.url) ||
    stringish((imageAttr || {})?.url) ||
    stringish((imageDataAttr || {})?.url) ||
    undefined;

  if (!PrefaceTitle || !Slug) return null;
  const TagLabel = firstTagLabel(b);
  const TagLabels = allTagLabels(b);
  const out: OverviewBlog = {
    id,
    PrefaceTitle,
    Date: DateVal,
    Slug,
    ...(url ? { PrefaceImage: { url } } : {}),
    ...(TagLabel ? { TagLabel } : {}),
    ...(TagLabels.length ? { TagLabels } : {}),
  };
  return out;
};

const stringish = (v: unknown): string | undefined =>
  typeof v === "string" && v ? v : undefined;

// Stable ID when numeric id is missing: hash Slug or PrefaceTitle
const stableIdFrom = (b: Record<string, unknown>): number => {
  const attr = (b?.attributes as Record<string, unknown>) || {};
  const base =
    stringish(b?.Slug) ||
    stringish(attr?.Slug) ||
    stringish(b?.PrefaceTitle) ||
    stringish(attr?.PrefaceTitle) ||
    "fallback";
  let h = 5381;
  for (let i = 0; i < base.length; i++) {
    h = (h * 33) ^ base.charCodeAt(i);
  }
  return Math.abs(h >>> 0);
};

// Try to get a human label for the first tag (prefer `tag`/`name` over slug)
const firstTagLabel = (b: Record<string, unknown>): string | undefined => {
  const candidates: unknown[] = [];
  if (Array.isArray(b?.tags)) candidates.push(...((b.tags as unknown[]) || []));
  if (Array.isArray(b?.Tags)) candidates.push(...((b.Tags as unknown[]) || []));
  const tagsData = (b?.tags as Record<string, unknown> | undefined)?.data;
  const TagsData = (b?.Tags as Record<string, unknown> | undefined)?.data;
  if (Array.isArray(tagsData)) candidates.push(...(tagsData as unknown[]));
  if (Array.isArray(TagsData)) candidates.push(...(TagsData as unknown[]));
  const attr = (b?.attributes as Record<string, unknown>) || {};
  const attrTagsData = (attr?.tags as Record<string, unknown> | undefined)?.data;
  const attrTagsUpperData = (attr?.Tags as Record<string, unknown> | undefined)?.data;
  if (Array.isArray(attrTagsData)) candidates.push(...(attrTagsData as unknown[]));
  if (Array.isArray(attrTagsUpperData)) candidates.push(...(attrTagsUpperData as unknown[]));
  for (const t of candidates) {
    const obj = (t || {}) as Record<string, unknown>;
    const attr = (obj.attributes as Record<string, unknown>) || {};
    const label =
      stringish(obj.tag) ||
      stringish(obj.Tag) ||
      stringish(obj.name) ||
      stringish(obj.Name) ||
      stringish(attr.tag) ||
      stringish(attr.Tag) ||
      stringish(attr.name) ||
      stringish(attr.Name);
    if (label) return label;
  }
  return undefined;
};

// Collect all readable tag labels (unique, preserve order)
const allTagLabels = (b: Record<string, unknown>): string[] => {
  const candidates: unknown[] = [];
  if (Array.isArray(b?.tags)) candidates.push(...((b.tags as unknown[]) || []));
  const tagsData = (b?.tags as Record<string, unknown> | undefined)?.data;
  if (Array.isArray(tagsData)) candidates.push(...(tagsData as unknown[]));
  const attr = (b?.attributes as Record<string, unknown>) || {};
  const attrTagsData = (attr?.tags as Record<string, unknown> | undefined)?.data;
  if (Array.isArray(attrTagsData)) candidates.push(...(attrTagsData as unknown[]));
  const out: string[] = [];
  const push = (s?: string) => {
    const v = (s || "").trim();
    if (!v) return;
    if (!out.includes(v)) out.push(v);
  };
  for (const t of candidates) {
    const obj = (t || {}) as Record<string, unknown>;
    const a = (obj.attributes as Record<string, unknown>) || {};
    push(stringish(obj.tag) || stringish(a.tag));
    push(stringish(obj.name) || stringish(a.name));
  }
  return out;
};
