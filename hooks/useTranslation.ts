"use client";
import { useContext, useCallback } from "react";
import { LanguageContext } from "@/context/LanguageContext";

export const useTranslation = () => {
  const { translations, language } = useContext(LanguageContext);

  const t = useCallback(
    (key: string) => {
      const v = translations[key];
      return typeof v === "string" ? v : key;
    },
    [translations]
  );

  const tl = useCallback(
    (key: string): string[] => {
      const v = translations[key];
      return Array.isArray(v) ? [...v] : typeof v === "string" ? [v] : [];
    },
    [translations]
  );

  const tns = useCallback((ns: string) => (k: string) => t(`${ns}.${k}`), [t]);
  const tlns = useCallback(
    (ns: string) => (k: string) => tl(`${ns}.${k}`),
    [tl]
  );

  return { t, tl, tns, tlns, language };
};
