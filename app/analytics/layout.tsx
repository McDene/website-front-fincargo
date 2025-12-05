import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Analytics and visibility into invoice‑to‑cash and freight finance performance with Fincargo.",
  fr: "Analytique et visibilité sur la performance Invoice‑to‑Cash et le financement du fret avec Fincargo.",
  de: "Analysen und Transparenz zu Invoice‑to‑Cash und Frachtfinanzierungs‑Performance mit Fincargo.",
  es: "Analítica y visibilidad sobre el rendimiento de invoice‑to‑cash y la financiación del transporte con Fincargo.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/analytics";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "Analytics",
    description,
    openGraph: { description },
    alternates: { canonical: "/analytics", languages },
  };
}

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
