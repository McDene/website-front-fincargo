import type { MetadataRoute } from "next";
import { fetchAPI } from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

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
    fetchAPI("/api/blogs?pagination[pageSize]=200&fields=Slug", "en"),
    fetchAPI("/api/careers?pagination[pageSize]=200&fields=Slug", "en"),
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

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...staticPaths.map((path): Entry => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    ...blogSlugs.map((slug): Entry => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...careerSlugs.map((slug): Entry => ({
      url: `${BASE_URL}/careers/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
  ];

  return entries;
}
