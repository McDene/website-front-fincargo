// Server component page (SSR)
// Fetch hero data côté serveur pour éviter les 404 côté client
import Header from "@/components/Header/Main";
import HeroImage from "@/components/HeroImage";
import SectionInvoicing from "@/components/Common/SectionInvoicing";
import SectionFactoringBE from "@/components/Common/SectionFactoringBE";
import Footer from "@/components/Footer";
import BlogTeasers, { type BlogTeaserItem } from "@/components/Common/BlogTeasers";
import { fetchAPI } from "@/lib/utils";
import { detectServerUiLocale, detectServerRegion, toStrapiLocale } from "@/lib/i18n";
export const revalidate = 3600;

export default async function EInvoicingPage() {
  const ui = await detectServerUiLocale();
  const region = await detectServerRegion();
  const locale = toStrapiLocale(ui);

  const heroResponse = await fetchAPI(
    "/api/hero-images?filters[Page][$eq]=Invoicing&populate[Hero][populate]=Image",
    locale
  );
  const heroData = heroResponse?.data?.[0]?.Hero || null;

  // Fetch last 3 VAT-tagged blogs (English only)
  // Try robust VAT fetch with fallbacks (slug eqi, tag eqi, then latest)
  const buildItems = (data: unknown): BlogTeaserItem[] => {
    const arr = ((): unknown[] => {
      if (!data || typeof data !== 'object') return [];
      const rec = data as Record<string, unknown>;
      const d = rec.data as unknown;
      return Array.isArray(d) ? d : [];
    })();
    return arr
      .map((raw): BlogTeaserItem | null => {
          if (!raw || typeof raw !== "object") return null;
          const rec = raw as Record<string, unknown>;
          const title = typeof rec.Title === "string" ? rec.Title : "";
          const slug = typeof rec.Slug === "string" ? rec.Slug : "";
          const date = typeof rec.Date === "string" ? rec.Date : undefined;
          const pi = rec.PrefaceImage as Record<string, unknown> | undefined;
          const url = pi && typeof pi.url === "string" ? pi.url : undefined;
          const imageUrl = url
            ? url.startsWith("http")
              ? url
              : `${process.env.NEXT_PUBLIC_API_URL || ""}${url}`
            : undefined;
          if (!title || !slug) return null;
          return { title, slug, date, imageUrl };
      })
      .filter((x): x is BlogTeaserItem => !!x);
  };

  // 1) slug eqi=vat
  let vatItems: BlogTeaserItem[] = buildItems(
    await fetchAPI(
      "/api/blogs?filters[tags][slug][$eqi]=vat&sort=Date:desc&pagination[pageSize]=3&populate[PrefaceImage]=*&locale=en",
      "en"
    )
  );

  // 2) fallback tag text eqi=VAT
  if (vatItems.length === 0) {
    vatItems = buildItems(
      await fetchAPI(
        "/api/blogs?filters[tags][tag][$eqi]=VAT&sort=Date:desc&pagination[pageSize]=3&populate[PrefaceImage]=*&locale=en",
        "en"
      )
    );
  }

  // 3) latest 3 (no tag filter)
  if (vatItems.length === 0) {
    vatItems = buildItems(
      await fetchAPI(
        "/api/blogs?sort=Date:desc&pagination[pageSize]=3&populate[PrefaceImage]=*&locale=en",
        "en"
      )
    );
  }

  return (
    <>
      <Header />
      {heroData && <HeroImage heroImageData={heroData} />}
      {/* Contenu régionalisé BE (e‑invoicing Belgique) — sans image */}
      <SectionFactoringBE region={region} language={ui} />
      {/* Contenu générique (E‑Invoicing) si autre région */}
      {region !== "be" && <SectionInvoicing />}
      {/* Last 3 VAT articles */}
      {vatItems.length > 0 && (
        <BlogTeasers
          items={vatItems}
          heading={ui === "fr" ? "DERNIERS ARTICLES VAT" : "LATEST VAT ARTICLES"}
        />
      )}
      <Footer />
    </>
  );
}
