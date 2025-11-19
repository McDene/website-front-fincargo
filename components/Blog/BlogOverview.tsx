"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
// import { useTranslation } from "@/hooks/useTranslation";

interface Blog {
  id: number;
  PrefaceTitle: string;
  Date: string;
  Slug: string;
  PrefaceImage?: {
    url: string;
  };
  TagLabel?: string;
  TagLabels?: string[];
}

interface BlogOverviewProps {
  blogData: Blog[];
  filters?: ReactNode; // optional: chips/filters rendered under the title
}

export default function BlogOverview({ blogData, filters }: BlogOverviewProps) {
  const formatDate = (s: string): string => {
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  return (
    <section className={cn("py-24 xl:py-32 lg:py-38 md:py-38 bg-white px-4")}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-5xl font-semibold uppercase pb-4">Blog</h1>
          <h4 className="text-gray-600 text-lg">
            Innovations, trends, and insights to shape the future of finance and
            leasing technology.
          </h4>
        </div>
        {filters && (
          <div className="mb-10 flex flex-wrap gap-2 justify-center">{filters}</div>
        )}

        {/* Grid des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.Slug}`}
              className="group"
            >
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105  relative">
                {/* Image avec overlay */}
                {article.PrefaceImage?.url && (
                  <div className="relative w-full h-[30rem]">
                    <Image
                      src={article.PrefaceImage.url}
                      alt={article.PrefaceTitle}
                      layout="fill"
                      objectFit="cover"
                      className="transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                      unoptimized
                    />
                    {/* Overlay dégradé de transparent à bleu */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-darkBlue opacity-100"></div>
                    {(article.TagLabels?.length || article.TagLabel) && (
                      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                        {(article.TagLabels && article.TagLabels.length > 0
                          ? article.TagLabels
                          : [article.TagLabel!]
                        )
                          .slice(0, 3)
                          .map((tg, i) => (
                            <span
                              key={`${article.id}-tag-${i}`}
                              className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-slate-800 ring-1 ring-white/50"
                            >
                              {tg}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Contenu de la carte positionné en bas */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <h2 className="text-2xl  mb-2">{article.PrefaceTitle}</h2>
                  <p className="text-sm opacity-90">{formatDate(article.Date)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
