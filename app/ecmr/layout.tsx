import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Electronic consignment note (eCMR) enablement and workflow guidance for transport.",
  fr: "Mise en œuvre eCMR (lettre de voiture électronique) et bonnes pratiques pour le transport.",
  de: "eCMR (elektronischer Frachtbrief) Einführung und Workflow‑Leitfaden für den Transport.",
  es: "Implementación de eCMR (carta de porte electrónica) y guía de flujos para el transporte.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/ecmr";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "eCMR",
    description,
    openGraph: { description },
    alternates: { canonical: "/ecmr", languages },
  };
}

export default function ECMRLayout({ children }: { children: React.ReactNode }) {
  return children;
}
