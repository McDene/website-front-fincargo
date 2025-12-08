"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SUPPORTED_UI_LOCALES,
  type LanguageCore,
  detectClientRegion,
} from "@/lib/i18n";
import type { Region } from "@/lib/i18n";
import { Linkedin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { trackEvent } from "@/lib/analytics";

interface FooterLink {
  labelKey: string | "Blog"; // allows raw labels like "Blog"
  href: string;
  trackLabel: string;
}

interface FooterSection {
  titleKey: string; // i18n key for the section title
  links: FooterLink[];
}

export default function Footer() {
  const { t } = useTranslation();
  const year = useMemo(() => new Date().getFullYear(), []);
  const pathname = usePathname();

  const currentLocale = (() => {
    const parts = (pathname || "/").split("/");
    const first = parts[1];
    return (SUPPORTED_UI_LOCALES as readonly string[]).includes(first)
      ? (first as LanguageCore)
      : undefined;
  })();

  const localizeHref = (href: string) => {
    // external URLs unchanged
    if (/^https?:\/\//i.test(href)) return href;
    // already localized or no current locale or EN (default path has no prefix)
    if (!currentLocale || currentLocale === "en") return href;
    if (href.startsWith(`/${currentLocale}`)) return href;
    // prepend current locale
    if (href === "/") return `/${currentLocale}`;
    return `/${currentLocale}${href}`;
  };

  // Centralized config so it’s easier to maintain / reorder
  const sections: FooterSection[] = [
    {
      titleKey: "company",
      links: [
        { href: "/about", labelKey: "about_us", trackLabel: "About Us" },
        { href: "/contact", labelKey: "contact", trackLabel: "Contact" },
        {
          href: "/confidentiality-security-notice",
          labelKey: "Confidentiality",
          trackLabel: "Confidentiality & Security",
        },
        {
          href: "/legal-notice",
          labelKey: "legal_notice",
          trackLabel: "Legal Notice",
        },
        { href: "/cookies", labelKey: "cookies", trackLabel: "Cookies Policy" },
        {
          href: "/sustainability",
          labelKey: "sustainability",
          trackLabel: "Sustainability",
        },
        { href: "/partner", labelKey: "partners", trackLabel: "Partners" },
        { href: "/investor", labelKey: "investors", trackLabel: "Investors" },
        { href: "/careers", labelKey: "careers", trackLabel: "Careers" },
        { href: "/blog", labelKey: "Blog", trackLabel: "Blog" },
      ],
    },
    {
      titleKey: "carriers",
      links: [
        {
          href: "/get-started",
          labelKey: "get_started",
          trackLabel: "Get Started - Carriers",
        },
        // {
        //   href: "/explore-freight-forwarders-partners",
        //   labelKey: "explore_freight_forwarders_partners",
        //   trackLabel: "Explore Freight Forwarding Partners",
        // },
        {
          href: "/carrier-protection-policy",
          labelKey: "carriers_protection_policy",
          trackLabel: "Carriers Protection Policy",
        },
        {
          href: "/?aud=carrier#faqs",
          labelKey: "faq",
          trackLabel: "FAQ - Carriers",
        },
      ],
    },
    {
      titleKey: "freight_forwarders",
      links: [
        {
          href: "/get-started",
          labelKey: "get_started",
          trackLabel: "Get Started - Freight Forwarders",
        },
        // {
        //   href: "/#",
        //   labelKey: "pay_carrier_early",
        //   trackLabel: "Pay Carrier Early",
        // },
        {
          href: "/api",
          labelKey: "api_integration",
          trackLabel: "API Integration",
        },
        { href: "/?aud=freight#faqs", labelKey: "faq", trackLabel: "FAQ" },
      ],
    },
  ];

  // Hydration-safe region detection to avoid SSR/CSR mismatch
  const [region, setRegion] = useState<Region>("global");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setRegion(detectClientRegion());
  }, []);

  const externalOverride = (href: string): string | null => {
    if (region === "be") {
      if (href === "/careers") return "https://www.fincargo.ai/careers";
      if (href === "/blog") return "https://www.fincargo.ai/blog";
    }
    return null;
  };

  const handleTrack = (label: string) => () =>
    trackEvent({ action: "click_footer_link", category: "Footer", label });

  const onInternalClick =
    (label: string, href: string) => (e: React.MouseEvent) => {
      handleTrack(label)();
      const override = externalOverride(href);
      if (override) {
        e.preventDefault();
        window.location.assign(override);
        return;
      }
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

  const isExternal = (href: string) => /^https?:\/\//i.test(href);

  return (
    <footer className="relative pt-28 md:pt-32 pb-10 bg-gradient-to-b from-darkBlue to-black text-gray-100">
      {/* subtle top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/10 via-white/20 to-white/10" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Logo + Addresses */}
        <div className="flex flex-col gap-6">
          <div>
            <Image
              src="/logo/logo_fincargo_white.svg"
              alt="Fincargo Logo"
              width={180}
              height={44}
              priority={false}
              className="mb-5"
            />

            {/* Organization + addresses with schema.org microdata */}
            <div itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Fincargo" />

              <p className="font-semibold">Fincargo SA</p>
              <address
                className="not-italic text-gray-300"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <span itemProp="streetAddress">Rue de L’Industrie 23</span>
                <br />
                <span>
                  <span itemProp="postalCode">1950</span>{" "}
                  <span itemProp="addressLocality">Sion</span>
                </span>
                <br />
                <span itemProp="addressCountry">Switzerland</span>
              </address>

              <p className="mt-5 font-semibold">Fincargo Iberia SL</p>
              <address
                className="not-italic text-gray-300"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <span itemProp="streetAddress">Avenida Diagonal, 598</span>
                <br />
                <span>
                  <span itemProp="postalCode">08021</span>{" "}
                  <span itemProp="addressLocality">Barcelona</span>
                </span>
                <br />
                <span itemProp="addressCountry">Spain</span>
              </address>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="https://www.swissmadesoftware.org/home.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleTrack("Swiss Made Software")}
              data-analytics-action="click_outbound_link"
              data-analytics-category="Footer"
              data-analytics-label="Swiss Made Software"
              className="inline-flex max-w-[180px] opacity-90 hover:opacity-100 transition"
            >
              <Image
                src="/logo/swiss-made-software.svg"
                alt="Swiss Made Software Logo"
                width={160}
                height={32}
              />
            </a>

            {mounted && region === "be" && (
              <a
                href="https://peppol.org/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTrack("Peppol")}
                data-analytics-action="click_outbound_link"
                data-analytics-category="Footer"
                data-analytics-label="Peppol"
                className="inline-flex max-w-[140px] opacity-90 hover:opacity-100 transition"
                aria-label="Peppol"
                title="Peppol"
              >
                <Image
                  src="/images/peppol_logo.webp"
                  alt="Peppol logo"
                  width={120}
                  height={48}
                />
              </a>
            )}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/fincargo/posts/?feedView=all"
              aria-label="LinkedIn"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleTrack("LinkedIn")}
              data-analytics-action="click_outbound_link"
              data-analytics-category="Social"
              data-analytics-label="LinkedIn"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition"
            >
              <Linkedin className="h-5 w-5 text-white" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Link sections */}
        {sections.map((section) => (
          <nav
            key={section.titleKey}
            aria-labelledby={`footer-${section.titleKey}`}
          >
            <h2
              id={`footer-${section.titleKey}`}
              className="text-sm font-bold text-blue-200 mb-4 md:mb-6 uppercase tracking-wide"
            >
              {t(section.titleKey)}
            </h2>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.trackLabel}>
                  {isExternal(link.href) ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleTrack(link.trackLabel)}
                      className="hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
                    >
                      {typeof link.labelKey === "string"
                        ? t(link.labelKey as string)
                        : link.labelKey}
                    </a>
                  ) : (
                    <Link
                      href={localizeHref(link.href)}
                      prefetch={false}
                      onClick={onInternalClick(link.trackLabel, link.href)}
                      className="hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
                    >
                      {typeof link.labelKey === "string"
                        ? t(link.labelKey as string)
                        : link.labelKey}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar as a 3-column grid; switch in the last column */}
      <div className="mt-10 mx-auto w-full max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 items-center">
        {/* First column left intentionally empty for balance on desktop */}
        <div className="hidden md:block" />

        {/* On mobile show switch above copyright; on desktop place it in col 3 right-aligned */}
        {mounted && (
          <div className="mb-8 justify-self-center md:mb-0 md:col-start-3 ">
            <a
              href={
                region === "be"
                  ? "https://www.fincargo.ai"
                  : "https://be.fincargo.ai"
              }
              onClick={handleTrack("Region Switch")}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white ring-1 ring-white/15 shadow-sm hover:bg-white/15 transition"
              aria-label={
                region === "be"
                  ? t("region.switch_global")
                  : t("region.switch_be")
              }
              title={
                region === "be"
                  ? t("region.switch_global")
                  : t("region.switch_be")
              }
            >
              {region !== "be" ? (
                <FlagBE className="h-3.5 w-5" />
              ) : (
                <IconGlobe className="h-4 w-4" />
              )}
              <span>
                {region === "be"
                  ? t("region.switch_global")
                  : t("region.switch_be")}
              </span>
            </a>
          </div>
        )}

        {/* Middle column: copyright centered (col 2 on desktop) */}
        <div className="text-center text-gray-400 text-sm md:justify-self-center md:col-start-2">
          &copy; {year} Fincargo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// Inline flags (Belgium / EU)
function FlagBE({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden>
      <rect width="1" height="2" x="0" fill="#000000" />
      <rect width="1" height="2" x="1" fill="#FFD90C" />
      <rect width="1" height="2" x="2" fill="#EF3340" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15.3 15.3 0 0 1 0 18a15.3 15.3 0 0 1 0-18z" />
    </svg>
  );
}
