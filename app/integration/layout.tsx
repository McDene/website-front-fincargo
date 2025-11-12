import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Integrate Fincargo's capabilities via API to streamline invoice‑to‑cash workflows.",
  fr: "Intégrez les capacités de Fincargo via API pour fluidifier l'Invoice‑to‑Cash.",
  de: "Integrieren Sie Fincargos Funktionen per API, um Invoice‑to‑Cash‑Prozesse zu vereinfachen.",
  es: "Integre las capacidades de Fincargo mediante API para optimizar el proceso invoice‑to‑cash.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  return {
    title: "API Integration",
    description,
    openGraph: { description },
    alternates: { canonical: "/integration" },
  };
}

export default function IntegrationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
