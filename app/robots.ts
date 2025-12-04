import type { MetadataRoute } from "next";

const ENV_BASE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function robots(): Promise<MetadataRoute.Robots> {
  let BASE_URL = ENV_BASE;
  try {
    // Domain-aware host so the robots points to the correct sitemap
    const { headers } = await import("next/headers");
    const h = await headers();
    const host = h.get("host")?.toLowerCase();
    if (
      host === "be.fincargo.ai" ||
      host?.endsWith(".be.fincargo.ai") ||
      host === "be.localhost" ||
      host?.endsWith(".be.localhost")
    ) {
      BASE_URL = "https://be.fincargo.ai";
    }
  } catch {}

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Internal APIs and non-indexable paths (if any evolve later)
          "/internal-api/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
