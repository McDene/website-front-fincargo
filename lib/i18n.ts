export type LanguageCore = "en" | "fr" | "es" | "de";
export type StrapiLocale = "en" | "fr" | "es-ES" | "de";
// Accept either UI codes (en, fr, es, de) or Strapi codes (including es-ES)
export type UILocale = LanguageCore | StrapiLocale;

// Normalize any Spanish variant to the Strapi-required es-ES; pass through others
export const toStrapiLocale = (lang: UILocale): StrapiLocale =>
  lang === "es" || lang === "es-ES" ? "es-ES" : (lang as StrapiLocale);

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
