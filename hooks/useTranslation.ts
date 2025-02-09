import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";

export const useTranslation = () => {
  const { translations, language } = useContext(LanguageContext);
  return { t: (key: string) => translations[key], language };
};
