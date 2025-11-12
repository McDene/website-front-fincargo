import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Legal notice and company information for Fincargo.",
  fr: "Mentions légales et informations sur l'entreprise Fincargo.",
  de: "Impressum und Unternehmensinformationen zu Fincargo.",
  es: "Aviso legal e información de la empresa Fincargo.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  return {
    title: "Legal Notice",
    description,
    openGraph: { description },
    alternates: { canonical: "/legal-notice" },
  };
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
