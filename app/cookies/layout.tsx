import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Read how Fincargo uses cookies and similar technologies.",
  fr: "Découvrez comment Fincargo utilise les cookies et technologies similaires.",
  de: "Erfahren Sie, wie Fincargo Cookies und ähnliche Technologien verwendet.",
  es: "Lea cómo Fincargo utiliza cookies y tecnologías similares.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/cookies";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "Cookies Policy",
    description,
    openGraph: { description },
    alternates: { canonical: "/cookies", languages },
  };
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
