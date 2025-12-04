import type { MetadataRoute } from "next";
import { fetchAPI } from "@/lib/utils";

const ENV_BASE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const WWW_BASE = "https://www.fincargo.ai";

// Cache the sitemap for 1 hour to avoid hitting Strapi on every request
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Detect requested host to serve domain-aware URLs (BE subdomain)
  let BASE_URL = ENV_BASE;
  let region: "global" | "be" = "global";
  try {
    const { headers } = await import("next/headers");
    const h = await headers();
    const host = (h.get("host") || "").toLowerCase();
    if (
      host === "be.fincargo.ai" ||
      host.endsWith(".be.fincargo.ai") ||
      host === "be.localhost" ||
      host.endsWith(".be.localhost")
    ) {
      BASE_URL = "https://be.fincargo.ai";
      region = "be";
    }
  } catch {}

  const now = new Date();
  // Supported locale prefixes by region (used for <xhtml:link> alternates)
  const regionLocales = region === "be" ? (['fr', 'en'] as const) : (['en', 'fr', 'es', 'de'] as const);

  // Static routes (non-dynamic pages)
  const staticPaths = [
    "/about",
    "/analytics",
    "/api",
    "/blog",
    "/careers",
    "/carrier-protection-policy",
    "/confidentiality-security-notice",
    "/contact",
    "/cookies",
    "/e-invoicing",
    "/ecmr",
    "/explore-freight-forwarders-partners",
    "/financial-services",
    "/freight-audit",
    "/freight-forwarders",
    "/get-started",
    "/integration",
    "/investor",
    "/legal-notice",
    "/partner",
    "/sustainability",
    "/tms",
  ];

  // Fetch dynamic slugs from Strapi via existing helper
  // We use English as a canonical source for slugs (UI is not path-prefixed)
  const [blogsRes, careersRes] = await Promise.all([
    // Force locale=en to avoid regional mapping (blogs/careers canonical slugs)
    fetchAPI("/api/blogs?pagination[pageSize]=200&fields=Slug&locale=en", "en"),
    fetchAPI("/api/careers?pagination[pageSize]=200&fields=Slug&locale=en", "en"),
  ]);

  type HasSlug = { Slug?: string };

  const blogSlugs: string[] = Array.isArray(blogsRes?.data)
    ? (blogsRes.data as HasSlug[])
        .map((b) => b?.Slug)
        .filter((s: unknown): s is string => typeof s === "string" && s.length > 0)
    : [];

  const careerSlugs: string[] = Array.isArray(careersRes?.data)
    ? (careersRes.data as HasSlug[])
        .map((c) => c?.Slug)
        .filter((s: unknown): s is string => typeof s === "string" && s.length > 0)
    : [];

  type Entry = MetadataRoute.Sitemap[number];

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...staticPaths.map((path): Entry => ({
      // Blog and Careers are hosted on www; keep them in this sitemap with absolute URLs
      url:
        path === "/blog" || path === "/careers"
          ? `${WWW_BASE}${path}`
          : `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    ...blogSlugs.map((slug): Entry => ({
      url: `${WWW_BASE}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...careerSlugs.map((slug): Entry => ({
      url: `${WWW_BASE}/careers/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
  ];

  // Add language alternates on same-domain entries to emit <xhtml:link>
  const withAlternates: MetadataRoute.Sitemap = baseEntries.map((entry) => {
    if (!entry.url.startsWith(BASE_URL)) return entry; // external (www) entries: keep as-is
    try {
      const u = new URL(entry.url);
      const pathname = u.pathname;
      const map: Record<string, string> = {};
      for (const lc of regionLocales) {
        const isHome = pathname === "/";
        const isDefault = region === "global" ? lc === "en" : lc === "fr";
        const localizedPath = isHome
          ? (isDefault ? "/" : `/${lc}`)
          : (isDefault ? pathname : `/${lc}${pathname}`);
        map[lc] = `${BASE_URL}${localizedPath}`;
      }
      return {
        ...entry,
        alternates: {
          languages: map,
        },
      } as MetadataRoute.Sitemap[number];
    } catch {
      return entry;
    }
  });

  return withAlternates;
}
