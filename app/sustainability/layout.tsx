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
  return {
    title: "Sustainability",
    description,
    openGraph: { description },
    alternates: { canonical: "/sustainability" },
  };
}

export default function SustainabilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
