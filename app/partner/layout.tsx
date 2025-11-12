import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Explore Fincargo partnerships and how we collaborate across the freight ecosystem.",
  fr: "Découvrez les partenariats de Fincargo et notre collaboration dans l'écosystème du fret.",
  de: "Entdecken Sie Fincargos Partnerschaften und unsere Zusammenarbeit im Fracht‑Ökosystem.",
  es: "Explore las alianzas de Fincargo y nuestra colaboración en el ecosistema del transporte.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  return {
    title: "Partners",
    description,
    openGraph: { description },
    alternates: { canonical: "/partner" },
  };
}

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
