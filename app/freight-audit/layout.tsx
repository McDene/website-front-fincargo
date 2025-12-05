import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Freight audit and cost control insights to improve billing accuracy.",
  fr: "Freight audit et maîtrise des coûts pour améliorer la justesse de facturation.",
  de: "Frachtprüfung und Kostenkontrolle zur Verbesserung der Rechnungsgenauigkeit.",
  es: "Auditoría de fletes y control de costos para mejorar la precisión de facturación.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/freight-audit";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "Freight Audit",
    description,
    openGraph: { description },
    alternates: { canonical: "/freight-audit", languages },
  };
}

export default function FreightAuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
