import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Learn about Fincargo's mission and team building AI-powered invoice-to-cash for road freight.",
  fr: "Découvrez la mission de Fincargo et son équipe qui développe une solution d'Invoice‑to‑Cash pilotée par l'IA pour le transport routier.",
  de: "Erfahren Sie mehr über Fincargos Mission und das Team, das KI‑gestützte Invoice‑to‑Cash‑Lösungen für den Straßengüterverkehr entwickelt.",
  es: "Conozca la misión de Fincargo y el equipo que construye una solución de invoice‑to‑cash impulsada por IA para el transporte por carretera.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/about";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "About Us",
    description,
    openGraph: { description },
    alternates: { canonical: "/about", languages },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
