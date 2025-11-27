export type LanguageCore = "en" | "fr" | "es" | "de" | "nl";
// Keep StrapiLocale wide to allow regional variants returned at runtime
export type StrapiLocale = string;
// Accept either UI codes (en, fr, es, de) or Strapi codes (including es-ES)
export type UILocale = LanguageCore | StrapiLocale;

// Normalize any Spanish variant to the Strapi-required es-ES; pass through others
export const toStrapiLocale = (lang: UILocale): StrapiLocale =>
  lang === "es" || lang === "es-ES" ? "es-ES" : (lang as StrapiLocale);

export type Region = "global" | "be";

export const detectServerRegion = async (): Promise<Region> => {
  try {
    const { headers } = await import("next/headers");
    const h = await headers();
    // Normalize host and strip port if present (e.g. be.localhost:3000 → be.localhost)
    const rawHost = (h.get("host") || "").toLowerCase();
    const host = rawHost.split(":")[0];
    if (
      host === "be.fincargo.ai" ||
      host.endsWith(".be.fincargo.ai") ||
      host.endsWith("fincargo.be") ||
      host === "be.localhost" ||
      host.endsWith(".be.localhost")
    ) {
      return "be";
    }
  } catch {}
  return "global";
};

export const detectClientRegion = (): Region => {
  try {
    const host = typeof window !== "undefined" ? window.location.hostname.toLowerCase() : "";
    if (
      host === "be.fincargo.ai" ||
      host.endsWith(".be.fincargo.ai") ||
      host.endsWith("fincargo.be") ||
      host === "be.localhost" ||
      host.endsWith(".be.localhost")
    ) {
      return "be";
    }
  } catch {}
  return "global";
};

export const SUPPORTED_UI_LOCALES: readonly LanguageCore[] = [
  "en",
  "fr",
  "es",
  "de",
] as const;

export const isSupportedUiLocale = (v: unknown): v is LanguageCore =>
  typeof v === "string" && (SUPPORTED_UI_LOCALES as readonly string[]).includes(v);

// Server-side: best-effort detection (cookie NEXT_LOCALE -> Accept-Language -> default)
export const detectServerUiLocale = async (): Promise<LanguageCore> => {
  try {
    const { cookies, headers } = await import("next/headers");
    const ck = await cookies();
    const cookie = ck.get("NEXT_LOCALE")?.value;
    if (isSupportedUiLocale(cookie)) return cookie;
    const hdrs = await headers();
    const al = (hdrs.get("accept-language") || "").toLowerCase();
    for (const lc of SUPPORTED_UI_LOCALES) {
      if (al.includes(lc) || (lc === "es" && al.includes("es-es"))) return lc;
    }
    return "en";
  } catch {
    return "en";
  }
};
