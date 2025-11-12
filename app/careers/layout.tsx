import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Discover open positions at Fincargo and join our mission in freight finance.",
  fr: "Découvrez nos offres et rejoignez la mission de Fincargo dans la finance du fret.",
  de: "Entdecken Sie offene Stellen bei Fincargo und werden Sie Teil unserer Mission in der Frachtfinanzierung.",
  es: "Descubra vacantes en Fincargo y únase a nuestra misión en la financiación del transporte.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  return {
    title: "Careers",
    description,
    openGraph: { description },
    alternates: { canonical: "/careers" },
  };
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
