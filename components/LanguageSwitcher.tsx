"use client";

import { useContext, useState } from "react";
import { LanguageContext } from "@/context/LanguageContext";

/** Langues supportées par ton Context */
export type LanguageCore = "en" | "fr" | "es" | "de";
/** Locales attendues côté Strapi */
export type StrapiLocale = "en" | "fr" | "es-ES" | "de";

/** Helper à utiliser partout pour convertir la langue UI en locale Strapi */
export const toStrapiLocale = (lang: LanguageCore): StrapiLocale =>
  lang === "es" ? "es-ES" : lang;

const LANGUAGES: ReadonlyArray<{
  code: LanguageCore; // ce qui va dans switchLanguage
  strapi: StrapiLocale; // ce qui va dans fetchAPI / Strapi
  label: string;
}> = [
  { code: "en", strapi: "en", label: "EN" },
  { code: "es", strapi: "es-ES", label: "ES" }, // ← Strapi veut es-ES
  { code: "fr", strapi: "fr", label: "FR" },
  { code: "de", strapi: "de", label: "DE" },
];

export default function LanguageSwitcher() {
  const { language, switchLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: LanguageCore) => {
    switchLanguage(lang); // ✅ typé
    // (Optionnel) si tu veux mémoriser le locale Strapi côté client
    try {
      const sel = LANGUAGES.find((l) => l.code === lang);
      if (sel) localStorage.setItem("strapiLocale", sel.strapi);
    } catch {}
    setIsOpen(false);
  };

  return (
    <div className="hidden relative lg:inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-2 py-2 text-gray-800 transition focus:outline-none"
      >
        {LANGUAGES.find((l) => l.code === language)?.label}
        <svg
          className="w-4 h-4 ml-2 transition-transform transform"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-16 bg-gray-100 rounded-lg shadow-lg">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center justify-center w-full px-2 py-2 rounded-lg text-gray-800 hover:bg-gray-100 transition ${
                language === lang.code ? "font-semibold bg-gray-100" : ""
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
