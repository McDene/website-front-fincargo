import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Transport Management System (TMS) integrations and best practices.",
  fr: "Intégrations TMS (Transport Management System) et bonnes pratiques.",
  de: "TMS‑Integrationen (Transport Management System) und Best Practices.",
  es: "Integraciones TMS (Transport Management System) y buenas prácticas.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/tms";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "TMS Integrations",
    description,
    openGraph: { description },
    alternates: { canonical: "/tms", languages },
  };
}

export default function TmsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
