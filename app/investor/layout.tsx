import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Investor relations and information about Fincargo's vision and performance.",
  fr: "Relations investisseurs et informations sur la vision et les performances de Fincargo.",
  de: "Investor‑Relations und Informationen zu Fincargos Vision und Leistung.",
  es: "Relación con inversores e información sobre la visión y el desempeño de Fincargo.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  return {
    title: "Investors",
    description,
    openGraph: { description },
    alternates: { canonical: "/investor" },
  };
}

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
