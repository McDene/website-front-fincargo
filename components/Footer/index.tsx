"use client";
import Image from "next/image";
import Link from "next/link";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <footer className="pt-32 xl:pt-32 lg:pt-38 md:pt-24 sm:pt-20 pb-10 bg-gray-300 text-gray-900 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Colonne 1: Logo + Adresse + Réseaux sociaux */}
        <div>
          <Image
            src="/logo/logo_fincargo_blue.svg"
            alt="Fincargo Logo"
            width={150}
            height={40}
          />
          <p className="mt-4">
            Rue de L&rsquo;industrie 23
            <br />
            1950 Sion
            <br />
            Switzerland
          </p>
          <div className="flex space-x-4 mt-6">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon className="w-6 h-6 text-gray-900 hover:text-blue-400" />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className=" text-gray-900 hover:text-blue-400" />
            </a>
          </div>
        </div>

        {/* Colonne 2: Company + Liens */}
        <div>
          <h4 className="text-lg font-bold text-blue-900 mb-4 uppercase">
            Company
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-blue-900">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-900">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/confidentiality-security-notice"
                className="hover:text-blue-900"
              >
                Confidentialitity & secutiity
              </Link>
            </li>
            <br />
            <li>
              <Link href="/legal-notice" className="hover:text-blue-900">
                Legal notice
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-blue-900">
                Cookies policy
              </Link>
            </li>
            <li>
              <Link href="/sustainability" className="hover:text-blue-900">
                Sustainability
              </Link>
            </li>
            <li>
              <Link href="/partener" className="hover:text-blue-900">
                Parteners
              </Link>
            </li>
            <li>
              <Link href="/investor" className="hover:text-blue-900">
                Investors
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-blue-900">
                Career
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-900">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3: Carriers + Liens */}
        <div>
          <h4 className="text-lg font-bold text-blue-900 mb-4 uppercase">
            Carriers
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/carriers/how-it-works"
                className="hover:text-blue-900"
              >
                Get started
              </Link>
            </li>
            <li>
              <Link href="/carriers/benefits" className="hover:text-blue-900">
                Customer service
              </Link>
            </li>
            <li>
              <Link href="/carriers/faq" className="hover:text-blue-900">
                Log-in
              </Link>
            </li>
            <li>
              <Link href="/carriers/contact" className="hover:text-blue-900">
                Explore freight forwarding partners
              </Link>
            </li>
            <li>
              <Link href="/carriers/contact" className="hover:text-blue-900">
                Carriers protection policy
              </Link>
            </li>
            <li>
              <Link href="/carriers/contact" className="hover:text-blue-900">
                FAQ&lsquo;s
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 4: Freight Forwarders + Liens */}
        <div>
          <h4 className="text-lg font-bold text-blue-900 mb-4 uppercase">
            Freight Forwarders
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/freight-forwarders/solutions"
                className="hover:text-blue-900"
              >
                Get started
              </Link>
            </li>
            <li>
              <Link
                href="/freight-forwarders/benefits"
                className="hover:text-blue-900"
              >
                Forwarders support
              </Link>
            </li>
            <li>
              <Link
                href="/freight-forwarders/resources"
                className="hover:text-blue-900"
              >
                Log-in
              </Link>
            </li>
            <li>
              <Link
                href="/freight-forwarders/contact"
                className="hover:text-blue-900"
              >
                Pay carrier early
              </Link>
            </li>
            <li>
              <Link
                href="/freight-forwarders/contact"
                className="hover:text-blue-900"
              >
                API Intergration
              </Link>
            </li>
            <li>
              <Link
                href="/freight-forwarders/contact"
                className="hover:text-blue-900"
              >
                FAQ&lsquo;s
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 5: Liquidity Providers + Liens */}
        <div>
          <h4 className="text-lg font-bold text-blue-900 mb-4 uppercase">
            Liquidity Providers
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/liquidity-providers" className="hover:text-blue-900">
                Get started
              </Link>
            </li>
            <li>
              <Link
                href="/liquidity-providers/how-it-works"
                className="hover:text-blue-900"
              >
                Why invest with Fincargo
              </Link>
            </li>
            <li>
              <Link
                href="/liquidity-providers/faq"
                className="hover:text-blue-900"
              >
                Log-in
              </Link>
            </li>
            <li>
              <Link
                href="/liquidity-providers/contact"
                className="hover:text-blue-900"
              >
                API Integration
              </Link>
            </li>
            <li>
              <Link
                href="/liquidity-providers/contact"
                className="hover:text-blue-900"
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
