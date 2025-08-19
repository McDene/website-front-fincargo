"use client";
import React, { createContext, useState, useEffect } from "react";
import TRANSLATIONS from "@/lib/index";

interface LanguageContextProps {
  language: "en" | "fr" | "es" | "de";
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
    const saved = localStorage.getItem("language");
    if (saved === "en" || saved === "fr" || saved === "es" || saved === "de") {
      setLanguage(saved);
    }
  }, []);

  const switchLanguage = (lang: LanguageContextProps["language"]) => {
    localStorage.setItem("language", lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        switchLanguage,
        translations: TRANSLATIONS[language] || TRANSLATIONS.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
