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
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/investor";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "Investors",
    description,
    openGraph: { description },
    alternates: { canonical: "/investor", languages },
  };
}

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
