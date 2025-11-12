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
  return {
    title: "Financial Services",
    description,
    openGraph: { description },
    alternates: { canonical: "/financial-services" },
  };
}

export default function FinancialServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
