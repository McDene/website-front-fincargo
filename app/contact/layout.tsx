import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Get in touch with the Fincargo team for product, partnership, or support inquiries.",
  fr: "Contactez l'équipe Fincargo pour toute question produit, partenariat ou support.",
  de: "Kontaktieren Sie das Fincargo‑Team für Produkt‑, Partnerschafts‑ oder Supportanfragen.",
  es: "Póngase en contacto con el equipo de Fincargo para consultas de producto, asociación o soporte.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  return {
    title: "Contact Us",
    description,
    openGraph: { description },
    alternates: { canonical: "/contact" },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
