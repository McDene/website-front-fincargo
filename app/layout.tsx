import type { Metadata } from "next";
import { detectLangFromHeaders } from "@/lib/seo";
import { Prompt, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { LanguageProvider } from "@/context/LanguageContext";
import ClientWrapper from "@/components/ClientWrapper";
import RegionSwitchBanner from "./_components/RegionSwitchBanner";
import Script from "next/script";

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
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-VGSWFSGPXZ";

const GLOBAL_DESCRIPTIONS: Record<"en" | "fr" | "es" | "de", string> = {
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
      default: "Invoice Financing for Road Freight Carriers",
      template: "%s | Fincargo",
    },
    description,
    icons: {
      icon: [
        { url: "/favicon.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon.png", type: "image/png", sizes: "16x16" },
      ],
      shortcut: "/favicon.png",
    },
    openGraph: {
      title: "Invoice Financing for Road Freight Carriers",
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
      title: "Fincargo",
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
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337"}
        />
        {/* Explicit favicon fallback links for broader browser support */}
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="16x16" />
      {/* Consent Mode defaults (set before GTM) */}
        <Script id="gtm-consent-defaults" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'granted',
            'security_storage': 'granted',
            'wait_for_update': 500
          });
        `}</Script>
        {/* Google tag (gtag.js) — direct GA as requested. Keep Consent defaults above. */}
        <Script
          id="ga4-src"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="beforeInteractive"
        />
        <Script id="ga4-init" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          // Expose ID for SPA tracking fallback
          window.GA_MEASUREMENT_ID = '${GA_MEASUREMENT_ID}';
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}</Script>
        {/* Google Tag Manager – placed high in head */}
        <Script id="gtm-base" strategy="beforeInteractive">{`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PM954XL3');
        `}</Script>
      </head>
      <body
        className={`${prompt.variable} ${inter.variable} antialiased bg-white`}
      >
        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fincargo",
              url: SITE_URL,
              logo: `${SITE_URL}/logo/logo-fincargo.png`,
              sameAs: [
                "https://www.linkedin.com/company/fincargo/",
              ],
            }),
          }}
        />
        {/* JSON-LD WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Fincargo",
              url: SITE_URL,
              inLanguage: "en",
            }),
          }}
        />
        {/* Google Tag Manager (noscript) – as close to opening body as possible */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PM954XL3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>
          <LanguageProvider>
            <main>{children}</main>
          </LanguageProvider>
        </Providers>
        {/* Suggest BE site for Belgian visitors on global domain (non-blocking, client-only) */}
        <RegionSwitchBanner />
        <ClientWrapper />
      </body>
    </html>
  );
}
