import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Fincargo's commitment to sustainability and ESG in freight finance.",
  fr: "L'engagement de Fincargo en matière de durabilité et d'ESG dans le financement du fret.",
  de: "Fincargos Engagement für Nachhaltigkeit und ESG in der Frachtfinanzierung.",
  es: "El compromiso de Fincargo con la sostenibilidad y el ESG en la financiación del transporte.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/sustainability";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "Sustainability",
    description,
    openGraph: { description },
    alternates: { canonical: "/sustainability", languages },
  };
}

export default function SustainabilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
