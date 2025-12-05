import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Solutions for freight forwarders: finance, integrations, and operational visibility.",
  fr: "Solutions pour transitaires : finance, intégrations et visibilité opérationnelle.",
  de: "Lösungen für Spediteure: Finanzierung, Integrationen und operative Transparenz.",
  es: "Soluciones para transitarios: finanzas, integraciones y visibilidad operativa.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/freight-forwarders";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "Freight Forwarders",
    description,
    openGraph: { description },
    alternates: { canonical: "/freight-forwarders", languages },
  };
}

export default function FreightForwardersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
