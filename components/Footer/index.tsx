"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { useMemo } from "react";
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
          href: "https://platform.fincargo.ai/login",
          labelKey: "get_started",
          trackLabel: "Get Started - Carriers",
        },
        {
          href: "https://platform.fincargo.ai/login",
          labelKey: "login",
          trackLabel: "Log In - Carriers",
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
          href: "https://platform.fincargo.ai/login",
          labelKey: "get_started",
          trackLabel: "Get Started - Freight Forwarders",
        },
        {
          href: "https://platform.fincargo.ai/login",
          labelKey: "login",
          trackLabel: "Log In - Freight Forwarders",
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

  const handleTrack = (label: string) => () =>
    trackEvent({ action: "click_footer_link", category: "Footer", label });

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

          <a
            href="https://www.swissmadesoftware.org/home.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTrack("Swiss Made Software")}
            className="inline-flex max-w-[200px] opacity-90 hover:opacity-100 transition"
          >
            <Image
              src="/logo/swiss-made-software.svg"
              alt="Swiss Made Software Logo"
              width={200}
              height={40}
            />
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/fincargo/posts/?feedView=all"
              aria-label="LinkedIn"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleTrack("LinkedIn")}
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
                      href={link.href}
                      prefetch={false}
                      scroll={false}
                      onClick={handleTrack(link.trackLabel)}
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

      <div className="mt-12 text-center text-gray-400 text-sm">
        &copy; {year} Fincargo. All rights reserved.
      </div>
    </footer>
  );
}
