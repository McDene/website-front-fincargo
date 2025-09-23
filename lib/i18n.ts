export type LanguageCore = "en" | "fr" | "es" | "de";
export type StrapiLocale = "en" | "fr" | "es-ES" | "de";
// Accept either UI codes (en, fr, es, de) or Strapi codes (including es-ES)
export type UILocale = LanguageCore | StrapiLocale;

// Normalize any Spanish variant to the Strapi-required es-ES; pass through others
export const toStrapiLocale = (lang: UILocale): StrapiLocale =>
  lang === "es" || lang === "es-ES" ? "es-ES" : (lang as StrapiLocale);
