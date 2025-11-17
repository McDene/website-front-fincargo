"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import ReactMarkdown from "react-markdown";

interface TextSection {
  id: number | string;
  Title: string;
  Paragraph: string;
}
interface GalleryImage {
  id: number | string;
  url: string;
  alternativeText?: string;
}
interface PartnerImage {
  url?: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width?: number; height?: number }>;
}

interface PartnerData {
  MultipleText: TextSection[];
  Gallery: GalleryImage[];
  image?: PartnerImage | null;
  ImgeUrl?: {
    id: number | string;
    url?: string;
    image?: PartnerImage | null;
  }[];
}

export default function Partner({ partnerData }: { partnerData: PartnerData }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
  const { t } = useTranslation();

  // Animations
  const easeOutExpo = [0.22, 1, 0.36, 1] as const;
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, when: "beforeChildren" },
    },
  };
  const fadeSlide = (dir: "left" | "right" = "left"): Variants => ({
    hidden: { opacity: 0, x: dir === "left" ? -32 : 32 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: easeOutExpo },
    },
  });
  const growBar: Variants = {
    hidden: { opacity: 0, scaleY: 0, transformOrigin: "top" },
    show: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 0.6, ease: easeOutExpo, delay: 0.05 },
    },
  };

  const normalizeUrl = (url?: string) =>
    url && url.startsWith("http") ? url : url ? `${API_URL}${url}` : "";

  const pickBestImageUrl = (img?: PartnerImage | null): string => {
    if (!img) return "";
    const large = img.formats?.large?.url;
    const medium = img.formats?.medium?.url;
    return normalizeUrl(large || medium || img.url);
  };

  const isDirectImageUrl = (url?: string) =>
    !!url &&
    /\.(avif|webp|png|jpe?g|gif|svg)(\?.*)?$/i.test(url.split("?")[0] || "");

  const pickFromImgeUrlItem = (item?: {
    url?: string;
    image?: PartnerImage | null;
  }): string => {
    if (!item) return "";
    const img = pickBestImageUrl(item.image);
    if (img) return img;
    if (isDirectImageUrl(item.url)) return item.url as string;
    return "";
  };

  const hostFromUrl = (u?: string) => {
    try {
      return u ? new URL(u).hostname : "";
    } catch {
      return "";
    }
  };
  // old carousel data removed

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-100 via-white to-white px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {!!(partnerData.ImgeUrl && partnerData.ImgeUrl.length) && (
          <section className="pb-16 md:pb-24" aria-labelledby="partners-title">
            <div className="text-center mb-8 md:mb-10">
              <h2
                id="partners-title"
                className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-darkBlue"
              >
                {t("our_partners")}
              </h2>
              <div className="mt-4 mx-auto h-1.5 w-32 rounded-full bg-gradient-to-r from-black via-darkBlue to-lightBlue" />
            </div>

            <div className="grid grid-cols-2 gap-6 md:gap-8 items-stretch">
              {partnerData.ImgeUrl.map((item) => {
                const href = item.url || "#";
                const src = pickFromImgeUrlItem(item);
                if (!src) return null;
                const alt =
                  item.image?.alternativeText || hostFromUrl(href) || "Partner";
                return (
                  <a
                    key={String(item.id)}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl bg-white p-4 ring-1 ring-slate-200 hover:ring-lightBlue transition duration-200 transform-gpu hover:scale-[1.03] hover:shadow-md opacity-95 hover:opacity-100"
                    aria-label={`Visit ${alt}`}
                  >
                    <div className="relative h-24 md:h-28 w-full">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition duration-200"
                        sizes="(min-width: 1024px) 560px, 50vw"
                        draggable={false}
                      />
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}
        {(() => {
          const texts = partnerData.MultipleText || [];
          const first = texts[0];
          const second = texts[1];
          return (
            <>
              {first && (
                <motion.section
                  aria-labelledby={`partner-${first.id}`}
                  className="pb-16 md:pb-24 mt-6 rounded-3xl overflow-hidden bg-gradient-to-b from-darkBlue to-black px-6 md:px-8"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.45 }}
                  variants={container}
                >
                  <div className="max-w-5xl mx-auto py-12 md:py-16">
                    <motion.h2
                      id={`partner-${first.id}`}
                      className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white text-center"
                      variants={fadeSlide("left")}
                    >
                      {first.Title}
                    </motion.h2>
                    <motion.div
                      className="mt-3 mx-auto h-1.5 w-28 rounded-full bg-gradient-to-r from-white via-lightBlue to-darkBlue"
                      variants={growBar}
                      aria-hidden
                    />
                    {partnerData.image && (
                      <motion.div
                        className="mt-10"
                        variants={fadeSlide("right")}
                      >
                        <div className="relative w-full aspect-[21/9] md:aspect-[16/7] overflow-hidden rounded-2xl ring-1 ring-white/10">
                          <Image
                            src={pickBestImageUrl(partnerData.image)}
                            alt={
                              partnerData.image?.alternativeText ||
                              partnerData.image?.url?.split("/").pop() ||
                              "Partner image"
                            }
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority={false}
                          />
                        </div>
                      </motion.div>
                    )}
                    <motion.div className="mt-10" variants={fadeSlide("left")}>
                      <ReactMarkdown
                        components={{
                          p: (props) => (
                            <p
                              className="text-lg md:text-2xl leading-relaxed text-white/90 mb-4"
                              {...props}
                            />
                          ),
                          ul: (props) => (
                            <ul
                              className="list-disc pl-6 space-y-1 text-lg text-white/90"
                              {...props}
                            />
                          ),
                          li: (props) => (
                            <li className="leading-7" {...props} />
                          ),
                          a: (props) => (
                            <a
                              className="underline decoration-dotted text-cyan-300 hover:text-white"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {first.Paragraph}
                      </ReactMarkdown>
                    </motion.div>
                  </div>
                </motion.section>
              )}
              {second && (
                <motion.section
                  aria-labelledby={`partner-${second.id}`}
                  className="pb-16 md:pb-24"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.45 }}
                  variants={container}
                >
                  <div className="max-w-5xl mx-auto">
                    <motion.h2
                      id={`partner-${second.id}`}
                      className="text-4xl md:text-6xl font-extrabold uppercase tracking-tigh pt-12 md:pt-16 text-darkBlue text-center"
                      variants={fadeSlide("left")}
                    >
                      {second.Title}
                    </motion.h2>
                    <motion.div
                      className="mt-3 mx-auto h-1.5 w-28 rounded-full bg-gradient-to-r from-darkBlue to-black"
                      variants={growBar}
                      aria-hidden
                    />
                    <motion.div className="mt-8" variants={fadeSlide("right")}>
                      <ReactMarkdown
                        components={{
                          p: (props) => (
                            <p
                              className="text-lg md:text-2xl leading-relaxed text-slate-800 mb-4"
                              {...props}
                            />
                          ),
                          ul: (props) => (
                            <ul
                              className="list-disc pl-6 space-y-1 text-lg text-slate-800"
                              {...props}
                            />
                          ),
                          li: (props) => (
                            <li className="leading-7" {...props} />
                          ),
                          a: (props) => (
                            <a
                              className="underline decoration-dotted text-blue-700 hover:text-blue-800"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {second.Paragraph}
                      </ReactMarkdown>
                    </motion.div>
                  </div>
                </motion.section>
              )}
            </>
          );
        })()}
      </div>

      {/* ancienne grille (remplacée par la section en tête) supprimée */}
    </section>
  );
}
