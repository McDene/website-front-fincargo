"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
// import { useTranslation } from "@/hooks/useTranslation";

interface Blog {
  id: number;
  PrefaceTitle: string;
  Date: string;
  Slug: string;
  PrefaceImage?: {
    url: string;
  };
}

interface BlogOverviewProps {
  blogData: Blog[];
}

export default function BlogOverview({ blogData }: BlogOverviewProps) {
  //   const { t } = useTranslation();

  return (
    <section className={cn("py-24 xl:py-32 lg:py-38 md:py-38 bg-white px-4")}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold uppercase pb-4">Blog</h1>
          <h4 className="text-gray-600 text-lg">
            Innovations, trends, and insights to shape the future of finance and
            leasing technology.
          </h4>
        </div>

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
                  </div>
                )}

                {/* Contenu de la carte positionné en bas */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <h2 className="text-2xl  mb-2">{article.PrefaceTitle}</h2>
                  <p className="text-sm opacity-90">
                    {new Date(article.Date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
