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
  return {
    title: "Analytics",
    description,
    openGraph: { description },
    alternates: { canonical: "/analytics" },
  };
}

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
