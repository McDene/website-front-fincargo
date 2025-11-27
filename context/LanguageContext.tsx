"use client";
import React, { createContext, useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import TRANSLATIONS from "@/lib/index";

interface LanguageContextProps {
  language: "en" | "fr" | "es" | "de" | "nl";
  switchLanguage: (lang: LanguageContextProps["language"]) => void;
  translations: Record<string, string | readonly string[]>;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  switchLanguage: () => {},
  translations: TRANSLATIONS.en,
});

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [language, setLanguage] =
    useState<LanguageContextProps["language"]>("en");

  useEffect(() => {
    // 1) If server set NEXT_LOCALE (via middleware), honor it on first load
    const cookieLang = getCookie("NEXT_LOCALE");
    if (cookieLang === "en" || cookieLang === "fr" || cookieLang === "es" || cookieLang === "de" || cookieLang === "nl") {
      setLanguage(cookieLang);
      // keep localStorage in sync for later navigations
      try { localStorage.setItem("language", cookieLang); } catch {}
      return;
    }

    // 2) Fallback to saved local preference
    const saved = typeof window !== "undefined" ? localStorage.getItem("language") : null;
    if (saved === "en" || saved === "fr" || saved === "es" || saved === "de" || saved === "nl") {
      setLanguage(saved);
      // also write cookie so SSR fetch uses it on next navigation
      try { setCookie("NEXT_LOCALE", saved, { path: "/" }); } catch {}
    }
  }, []);

  const switchLanguage = (lang: LanguageContextProps["language"]) => {
    try { localStorage.setItem("language", lang); } catch {}
    try { setCookie("NEXT_LOCALE", lang, { path: "/" }); } catch {}
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        switchLanguage,
        translations:
          TRANSLATIONS[language] &&
          Object.keys(TRANSLATIONS[language] as Record<string, unknown>).length > 0
            ? TRANSLATIONS[language]
            : TRANSLATIONS.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
