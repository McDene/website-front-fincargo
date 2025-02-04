"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import TRANSLATIONS from "@/lib/translations";

interface LanguageContextProps {
  language: string;
  switchLanguage: (lang: string) => void;
  translations: Record<string, string>;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  switchLanguage: () => {},
  translations: TRANSLATIONS["en"],
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const switchLanguage = (lang: string) => {
    localStorage.setItem("language", lang);
    setLanguage(lang);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 200);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        switchLanguage,
        translations: TRANSLATIONS[language] || TRANSLATIONS["es"],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
