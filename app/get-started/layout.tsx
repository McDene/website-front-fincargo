import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Get started with Fincargo: talk to our team and discover how to streamline invoice-to-cash and financial workflows.",
  fr: "Commencez avec Fincargo : échangez avec notre équipe et simplifiez vos processus d'Invoice‑to‑Cash et financiers.",
  de: "Starten Sie mit Fincargo: Sprechen Sie mit unserem Team und optimieren Sie Ihre Invoice‑to‑Cash‑ und Finanzabläufe.",
  es: "Empiece con Fincargo: hable con nuestro equipo y optimice sus procesos de invoice‑to‑cash y financieros.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/get-started";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "Get Started",
    description,
    openGraph: { description },
    alternates: { canonical: "/get-started", languages },
  };
}

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
