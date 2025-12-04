import type { Metadata } from "next";
import { detectLangFromHeaders } from "@/lib/seo";
import { Prompt, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { LanguageProvider } from "@/context/LanguageContext";
import ClientWrapper from "@/components/ClientWrapper";

const prompt = Prompt({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-arimo",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const GLOBAL_DESCRIPTIONS: Record<"en"|"fr"|"es"|"de", string> = {
  en: "INVOICE-TO-CASH FOR THE TRANSPORT INDUSTRY",
  fr: "INVOICE‑TO‑CASH POUR L’INDUSTRIE DU TRANSPORT",
  es: "INVOICE‑TO‑CASH PARA LA INDUSTRIA DEL TRANSPORTE",
  de: "INVOICE‑TO‑CASH FÜR DIE TRANSPORTBRANCHE",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await detectLangFromHeaders();
  const description = GLOBAL_DESCRIPTIONS[lang] || GLOBAL_DESCRIPTIONS.en;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "AI-Powered Invoice Financing for Road Freight Carriers",
      template: "%s | Fincargo",
    },
    description,
    icons: {
      icon: "/favicon.png",
    },
    openGraph: {
      title: "AI-Powered Invoice Financing for Road Freight Carriers",
      description,
      url: SITE_URL,
      siteName: "Fincargo",
      locale: "en_US",
      images: [
        {
          url: `${SITE_URL}/logo/logo-fincargo.png`,
          width: 1200,
          height: 630,
          alt: "Fincargo AI-driven freight financing",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Fincargo - AI-powered Freight Financing",
      description,
      images: [`${SITE_URL}/meta/twitter-image.jpg`],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337"} />
      </head>
      <body
        className={`${prompt.variable} ${inter.variable} antialiased bg-white`}
      >
        <Providers>
          <LanguageProvider>
            <main>{children}</main>
          </LanguageProvider>
        </Providers>

        <ClientWrapper />
      </body>
    </html>
  );
}
