import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Financial services for road freight carriers and forwarders: factoring, early payments, and invoice financing.",
  fr: "Services financiers pour transporteurs et transitaires : affacturage, paiements anticipés et financement de factures.",
  de: "Finanzdienstleistungen für Transporteure und Spediteure: Factoring, vorzeitige Zahlungen und Rechnungsfinanzierung.",
  es: "Servicios financieros para transportistas y transitarios: factoring, pagos anticipados y financiación de facturas.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const basePath = "/financial-services";
  const languages = {
    "x-default": `${SITE_URL}${basePath}`,
    en: `${SITE_URL}${basePath}`,
    fr: `${SITE_URL}/fr${basePath}`,
    es: `${SITE_URL}/es${basePath}`,
    de: `${SITE_URL}/de${basePath}`,
  } as const;
  return {
    title: "Financial Services",
    description,
    openGraph: { description },
    alternates: { canonical: "/financial-services", languages },
  };
}

export default function FinancialServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
