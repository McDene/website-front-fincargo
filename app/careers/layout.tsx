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
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/careers";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "Careers",
    description,
    openGraph: { description },
    alternates: { canonical: "/careers", languages },
  };
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
