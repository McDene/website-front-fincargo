import Header from "@/components/Header/Secondary";
import BlogListWithFilters from "@/components/Blog/BlogListWithFilters";
import { Suspense } from "react";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

export const revalidate = 3600;

export default async function BlogPage() {
  const [blogRes, tagsRes] = await Promise.all([
    fetchAPI(
      "/api/blogs?populate[PrefaceImage][fields][0]=url&populate[PrefaceImage][fields][1]=alternativeText&populate[tags][fields][0]=tag&populate[tags][fields][1]=slug&sort=Date:desc",
      "en"
    ),
    fetchAPI("/api/tags", "en"),
  ]);
  const blogData = Array.isArray(blogRes?.data) ? blogRes.data : [];
  const tags = Array.isArray(tagsRes?.data) ? tagsRes.data : [];

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
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Blog",
  description:
    "Insights and news about freight finance, factoring, and logistics.",
  alternates: { canonical: "/blog" },
};
