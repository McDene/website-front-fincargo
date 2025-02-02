"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface LanguageContextProps {
  language: string;
  switchLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  switchLanguage: () => {},
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
    console.log("Changement de langue vers :", lang);
    localStorage.setItem("language", lang);
    setLanguage(lang);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
