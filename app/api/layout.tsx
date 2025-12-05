import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "API integration with Fincargo to streamline invoice‑to‑cash and transport finance workflows.",
  fr: "Intégration API avec Fincargo pour fluidifier l'Invoice‑to‑Cash et les flux financiers du transport.",
  de: "API‑Integration mit Fincargo zur Optimierung von Invoice‑to‑Cash und Transportfinanzierungs‑Workflows.",
  es: "Integración API con Fincargo para optimizar invoice‑to‑cash y los flujos financieros del transporte.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/api";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "API",
    description,
    openGraph: { description },
    alternates: { canonical: "/api", languages },
  };
}

export default function ApiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
