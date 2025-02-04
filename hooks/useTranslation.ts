import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";

export const useTranslation = () => {
  const { translations } = useContext(LanguageContext);
  return (key: string) => translations[key];
};
