import Header from "@/components/Header/Secondary";
import BlogListWithFilters from "@/components/Blog/BlogListWithFilters";
import { Suspense } from "react";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import Link from "next/link";

export const revalidate = 3600;

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = ((await (searchParams || Promise.resolve({}))) || {}) as Record<
    string,
    string | string[] | undefined
  >;
  const pageParam = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const tagParam = Array.isArray(sp.tag) ? sp.tag[0] : sp.tag;
  const page = Math.max(1, Number(pageParam || 1));

  const queryParts = [
    "sort=Date:desc",
    "pagination[pageSize]=6",
    `pagination[page]=${page}`,
    "populate[PrefaceImage][fields][0]=url",
    "populate[PrefaceImage][fields][1]=alternativeText",
    "populate[tags][fields][0]=tag",
    "populate[tags][fields][1]=slug",
  ];
  if (tagParam) {
    // Filter by tag slug
    queryParts.push(`filters[tags][slug][$eq]=${encodeURIComponent(String(tagParam))}`);
  }
  const blogURL = `/api/blogs?${queryParts.join("&")}`;

  const [blogRes, tagsRes] = await Promise.all([
    fetchAPI(blogURL, "en"),
    fetchAPI("/api/tags", "en"),
  ]);
  const blogData = Array.isArray(blogRes?.data) ? blogRes.data : [];
  const tags = Array.isArray(tagsRes?.data) ? tagsRes.data : [];
  const meta = (blogRes?.meta as { pagination?: { page?: number; pageCount?: number; total?: number } }) || {};
  const pageCount = Number(meta?.pagination?.pageCount || 1);

  return (
    <>
      <Header />
      <SectionHeroSmall />
      {blogData.length > 0 ? (
        <Suspense fallback={<div className="text-center py-8">Loading…</div>}>
          <BlogListWithFilters items={blogData} tags={tags} />
        </Suspense>
      ) : (
        <p className="text-center">No articles found.</p>
      )}
      <PaginationControls current={page} pageCount={pageCount} tag={typeof tagParam === "string" ? tagParam : undefined} />
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Blog",
  description:
    "Insights and news about freight finance, factoring, and logistics.",
  alternates: {
    canonical: "/blog",
    languages: (() => {
      const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const basePath = "/blog";
      return {
        "x-default": `${SITE_URL}${basePath}`,
        en: `${SITE_URL}${basePath}`,
        fr: `${SITE_URL}/fr${basePath}`,
        es: `${SITE_URL}/es${basePath}`,
        de: `${SITE_URL}/de${basePath}`,
      } as const;
    })(),
  },
} as const;

function PaginationControls({
  current,
  pageCount,
  tag,
}: {
  current: number;
  pageCount: number;
  tag?: string;
}) {
  if (pageCount <= 1) return null;
  const prev = current > 1 ? current - 1 : null;
  const next = current < pageCount ? current + 1 : null;
  const qs = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", String(p));
    if (tag) params.set("tag", tag);
    return `?${params.toString()}`;
  };
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 flex items-center justify-center gap-3">
      <Link
        href={prev ? qs(prev) : "#"}
        aria-disabled={!prev}
        className={`px-3 py-1.5 rounded-md ring-1 ${
          prev
            ? "ring-slate-300 text-slate-800 hover:bg-slate-50"
            : "ring-slate-200 text-slate-400 cursor-not-allowed"
        }`}
      >
        Previous
      </Link>
      <span className="text-sm text-slate-600">
        Page {current} / {pageCount}
      </span>
      <Link
        href={next ? qs(next) : "#"}
        aria-disabled={!next}
        className={`px-3 py-1.5 rounded-md ring-1 ${
          next
            ? "ring-slate-300 text-slate-800 hover:bg-slate-50"
            : "ring-slate-200 text-slate-400 cursor-not-allowed"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
