export type LanguageCore = "en" | "fr" | "es" | "de";
export type StrapiLocale = "en" | "fr" | "es-ES" | "de";

export const toStrapiLocale = (lang: LanguageCore): StrapiLocale =>
  lang === "es" ? "es-ES" : lang;
