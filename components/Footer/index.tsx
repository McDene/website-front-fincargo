"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer className="pt-32 xl:pt-32 lg:pt-38 md:pt-24 sm:pt-20 pb-10 bg-gradient-to-b from-darkBlue to-black text-gray-50 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="flex flex-col justify-between h-full">
          {/* Logo and Address */}
          <div>
            <Image
              src="/logo/logo_fincargo_white.svg"
              alt="Fincargo Logo"
              width={150}
              height={40}
            />
            <p className="my-5 text-gray-400">
              Rue de L&rsquo;Industrie 23
              <br />
              1950 Sion
              <br />
              Switzerland
            </p>
            <a
              href="https://www.swissmadesoftware.org/home.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent({
                  action: "click_footer_link",
                  category: "Footer",
                  label: "Swiss Made Software",
                })
              }
            >
              <Image
                src="/logo/swiss-made-software.svg"
                alt="Swiss Made Software Logo"
                width={200}
                height={40}
              />
            </a>
          </div>
        </div>

        {/* Colonne 2: Company + Liens */}
        <div>
          <h4 className="text-lg font-bold text-blue-200 mb-4 uppercase">
            Company
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "About Us",
                  })
                }
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Contact",
                  })
                }
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/confidentiality-security-notice"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Confidentiality & Security",
                  })
                }
              >
                Confidentiality & Security
              </Link>
            </li>
            <li>
              <Link
                href="/legal-notice"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Legal Notice",
                  })
                }
              >
                Legal Notice
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Cookies Policy",
                  })
                }
              >
                Cookies Policy
              </Link>
            </li>
            <li>
              <Link
                href="/sustainability"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Sustainability",
                  })
                }
              >
                Sustainability
              </Link>
            </li>
            <li>
              <Link
                href="/partner"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Partners",
                  })
                }
              >
                Partners
              </Link>
            </li>
            <li>
              <Link
                href="/investor"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Investors",
                  })
                }
              >
                Investors
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Careers",
                  })
                }
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3: Carriers + Liens */}
        <div>
          <h4 className="text-lg font-bold text-blue-200 mb-4 uppercase">
            Carriers
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/#"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Get Started - Carriers",
                  })
                }
              >
                Get Started
              </Link>
            </li>
            <li>
              <Link
                href="https://frontend-fincargo-180162974123.europe-west6.run.app/login"
                scroll={false}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Log In - Carriers",
                  })
                }
              >
                Log-in
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Explore Freight Forwarding Partners",
                  })
                }
              >
                Explore Freight Forwarding Partners
              </Link>
            </li>
            <li>
              <Link
                href="/carrier-protection-policy"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Carriers Protection Policy",
                  })
                }
              >
                Carriers Protection Policy
              </Link>
            </li>
            <li>
              <Link
                href="/#faqs"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "FAQ - Carriers",
                  })
                }
              >
                FAQ&lsquo;s
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 4: Freight Forwarders + Liens */}
        <div>
          <h4 className="text-lg font-bold text-blue-200 mb-4 uppercase">
            Freight Forwarders
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/#"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Get Started - Freight Forwarders",
                  })
                }
              >
                Get Started
              </Link>
            </li>
            <li>
              <Link
                href="https://frontend-fincargo-180162974123.europe-west6.run.app/login"
                scroll={false}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Log In - Freight Forwarders",
                  })
                }
              >
                Log-in
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "Pay Carrier Early",
                  })
                }
              >
                Pay Carrier Early
              </Link>
            </li>
            <li>
              <Link
                href="/api"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "API Integration",
                  })
                }
              >
                API Integration
              </Link>
            </li>
            <li>
              <Link
                href="/freight-forwarders/#faqs"
                scroll={false}
                className="hover:text-gray-400"
                onClick={() =>
                  trackEvent({
                    action: "click_footer_link",
                    category: "Footer",
                    label: "FAQ - Freight Forwarders",
                  })
                }
              >
                FAQ&lsquo;s
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Fincargo. All rights reserved.
      </div>
    </footer>
  );
}
