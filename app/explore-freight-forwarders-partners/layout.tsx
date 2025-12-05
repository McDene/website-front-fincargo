import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Explore solutions for freight forwarders and ecosystem partners with Fincargo.",
  fr: "Découvrez les solutions Fincargo pour les transitaires et partenaires de l'écosystème.",
  de: "Lösungen für Spediteure und Ökosystem‑Partner mit Fincargo entdecken.",
  es: "Explore soluciones para transitarios y socios del ecosistema con Fincargo.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/explore-freight-forwarders-partners";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "Freight Forwarders & Partners",
    description,
    openGraph: { description },
    alternates: { canonical: "/explore-freight-forwarders-partners", languages },
  };
}

export default function ExploreFFPLayout({ children }: { children: React.ReactNode }) {
  return children;
}
