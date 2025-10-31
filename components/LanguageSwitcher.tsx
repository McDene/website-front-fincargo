"use client";

import { useContext, useEffect, useRef, useState } from "react";
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
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleLanguageChange = (lang: LanguageCore) => {
    switchLanguage(lang); // ✅ typé
    // (Optionnel) si tu veux mémoriser le locale Strapi côté client
    try {
      const sel = LANGUAGES.find((l) => l.code === lang);
      if (sel) localStorage.setItem("strapiLocale", sel.strapi);
    } catch {}
    setIsOpen(false);
  };

  // Fermer au clic extérieur
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const flagCode = (code: LanguageCore) =>
    ({ en: "gb", es: "es", fr: "fr", de: "de" } as const)[code];

  return (
    <div ref={wrapperRef} className="hidden relative lg:inline-block text-left">
      <button
        onClick={() => setIsOpen((s) => !s)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-slate-800 transition ring-1 ring-slate-200/80 bg-white/80 supports-[backdrop-filter]:backdrop-blur hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60`}
      >
        <img
          src={`https://hatscripts.github.io/circle-flags/flags/${flagCode(language)}.svg`}
          alt={language}
          className="h-4 w-4 rounded-full"
          loading="lazy"
        />
        {LANGUAGES.find((l) => l.code === language)?.label}
        <svg
          className={`w-4 h-4 ml-1 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
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
        <div
          className="absolute right-0 mt-2 min-w-[8rem] rounded-xl bg-white/90 supports-[backdrop-filter]:backdrop-blur shadow-lg ring-1 ring-slate-200/80 p-1.5 origin-top-right animate-in fade-in zoom-in-95"
          role="listbox"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-sm text-slate-800 hover:bg-slate-100 transition ${
                language === lang.code ? "font-semibold bg-slate-100" : ""
              }`}
              role="option"
              aria-selected={language === lang.code}
            >
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${flagCode(lang.code)}.svg`}
                alt={lang.label}
                className="h-4 w-4 rounded-full"
                loading="lazy"
              />
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
