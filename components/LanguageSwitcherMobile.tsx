"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { usePathname, useRouter } from "next/navigation";
import { SUPPORTED_UI_LOCALES, type LanguageCore, detectClientRegion } from "@/lib/i18n";
import { getRegionConfig } from "@/lib/region-config";

type Language = LanguageCore;

const LANGUAGES: ReadonlyArray<{ code: Language; label: string }> = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" }, // ← remplace "es-ES" par "es"
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
];

export default function LanguageSwitcherMobile() {
  const { language, switchLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const withLocalePath = (currentPath: string, lang: LanguageCore) => {
    const parts = (currentPath || "/").split("/");
    const first = parts[1];
    if (SUPPORTED_UI_LOCALES.includes(first as LanguageCore)) {
      parts.splice(1, 1);
    }
    const rest = parts.join("/") || "/";
    if (lang === "en") return rest.startsWith("/") ? rest : `/${rest}`;
    const base = rest.startsWith("/") ? rest : `/${rest}`;
    return `/${lang}${base === "/" ? "" : base}`;
  };

  const handleLanguageChange = (lang: Language) => {
    switchLanguage(lang);
    const target = withLocalePath(pathname || "/", lang);
    router.push(target);
    setIsOpen(false);
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const flagCode = (code: Language) =>
    ({ en: "gb", es: "es", fr: "fr", de: "de", nl: "nl" } as const)[code];

  // Restreindre les langues disponibles selon la région
  const region = detectClientRegion();
  const allowed = new Set(getRegionConfig(region).allowedLanguages);
  const options = LANGUAGES.filter((l) => allowed.has(l.code));

  return (
    <div ref={wrapperRef} className="relative inline-block text-left">
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen((s) => !s)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-slate-800 transition ring-1 ring-slate-200/80 bg-white/80 supports-[backdrop-filter]:backdrop-blur hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
      >
        <img
          src={`https://hatscripts.github.io/circle-flags/flags/${flagCode(language)}.svg`}
          alt={language}
          className="h-4 w-4 rounded-full"
          loading="lazy"
          decoding="async"
        />
        {options.find((l) => l.code === language)?.label || language.toUpperCase()}
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

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 min-w-[8rem] rounded-xl bg-white/90 supports-[backdrop-filter]:backdrop-blur shadow-lg ring-1 ring-slate-200/80 p-1.5 origin-top-right"
          role="listbox"
        >
          {options.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)} // ✅ typé
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
                decoding="async"
              />
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
