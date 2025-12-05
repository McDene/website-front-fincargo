import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Understand Fincargo's carriers protection policy and how we safeguard transport partners.",
  fr: "Comprenez la politique de protection des transporteurs de Fincargo et comment nous protégeons nos partenaires.",
  de: "Verstehen Sie Fincargos Schutzrichtlinie für Transporteure und wie wir Partner absichern.",
  es: "Conozca la política de protección de transportistas de Fincargo y cómo protegemos a nuestros socios.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/carrier-protection-policy";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "Carriers Protection Policy",
    description,
    openGraph: { description },
    alternates: { canonical: "/carrier-protection-policy", languages },
  };
}

export default function CarrierProtectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
