import type { Metadata } from "next";
import { detectLangFromHeaders, type MetaLang } from "@/lib/seo";

const DESCRIPTIONS: Record<MetaLang, string> = {
  en: "Learn how Fincargo protects data confidentiality and security across its platform.",
  fr: "Découvrez comment Fincargo protège la confidentialité et la sécurité des données sur sa plateforme.",
  de: "Erfahren Sie, wie Fincargo Vertraulichkeit und Sicherheit von Daten auf seiner Plattform schützt.",
  es: "Conozca cómo Fincargo protege la confidencialidad y seguridad de los datos en su plataforma.",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = DESCRIPTIONS[lang] || DESCRIPTIONS.en;
  return {
    title: "Confidentiality & Security",
    description,
    openGraph: { description },
    alternates: { canonical: "/confidentiality-security-notice" },
  };
}

export default function ConfidentialityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
