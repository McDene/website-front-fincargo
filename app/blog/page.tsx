import Header from "@/components/Header/Main";
import BlogOverview from "@/components/Blog/BlogOverview";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

export const revalidate = 3600;

export default async function BlogPage() {
  const blogRes = await fetchAPI("/api/blogs?[populate]=PrefaceImage", "en");
  const blogData = Array.isArray(blogRes?.data) ? blogRes.data : [];

  return (
    <>
      <Header />
      <SectionHeroSmall />
      {blogData.length > 0 ? (
        <BlogOverview blogData={blogData} />
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
