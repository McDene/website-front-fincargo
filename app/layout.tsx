import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "AI-Powered Invoice Financing for Road Freight Carriers",
  description:
    "Fincargo streamlines cash flow for road freight carriers with AI-powered invoice financing and automated debt recovery.",
  openGraph: {
    title: "AI-Powered Invoice Financing for Road Freight Carriers",
    description:
      "Fincargo streamlines cash flow for road freight carriers with AI-powered invoice financing and automated debt recovery.",
    url: "https://www.fincargo.ai",
    siteName: "Fincargo",
    images: [
      {
        url: "https://www.fincargo.ai/logo/logo-fincargo.png",
        width: 1200,
        height: 630,
        alt: "Fincargo AI-driven freight forwarding",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fincargo - AI-powered Freight Forwarding",
    description:
      "Fincargo leverages AI to improve efficiency in freight forwarding. Join us today!",
    images: ["https://www.fincargo.ai/meta/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${prompt.variable} ${inter.variable} antialiased bg-white`}
      >
        <Providers>
          <LanguageProvider key={Math.random()}>
            <main>{children}</main>
          </LanguageProvider>
        </Providers>

        {/* ✅ Déplacement de la récupération des cookies dans un composant client */}
        <ClientWrapper />
      </body>
    </html>
  );
}
