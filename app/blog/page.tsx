import Header from "@/components/Header/Secondary";
import BlogOverview from "@/components/Blog/BlogOverview";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { detectServerUiLocale, toStrapiLocale } from "@/lib/i18n";

export const revalidate = 3600;

export default async function BlogPage() {
  const uiLocale = await detectServerUiLocale();
  const blogRes = await fetchAPI(
    "/api/blogs?[populate]=PrefaceImage",
    toStrapiLocale(uiLocale)
  );
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
