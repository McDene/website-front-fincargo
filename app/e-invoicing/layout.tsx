import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Electronic invoicing solutions tailored for freight and logistics; streamline e‑invoices with Fincargo.",
  fr: "Facturation électronique adaptée au fret et à la logistique ; simplifiez vos e‑factures avec Fincargo.",
  de: "Elektronische Rechnungsstellung für Fracht und Logistik – vereinfachen Sie e‑Rechnungen mit Fincargo.",
  es: "Facturación electrónica para carga y logística; agilice sus e‑facturas con Fincargo.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  return {
    title: "E‑Invoicing",
    description,
    openGraph: { description },
    alternates: { canonical: "/e-invoicing" },
  };
}

export default function EInvoicingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
