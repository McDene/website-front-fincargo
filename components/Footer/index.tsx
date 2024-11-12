"use client";
import Image from "next/image";
import Link from "next/link";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <footer className="pt-32 xl:pt-32 lg:pt-38 md:pt-24 sm:pt-20 pb-10 bg-darkBlue text-gray-50 px-8">
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
            <p className="mt-4 text-gray-400">
              Rue de L&rsquo;industrie 23
              <br />
              1950 Sion
              <br />
              Switzerland
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <XIcon className="w-6 h-6 text-gray-400" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <LinkedInIcon className="w-6 h-6 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Label Image at the Bottom */}
          <div className="mt-8">
            <Image
              src="/images/swiss-made-software.svg"
              alt="Swiss Made Software Label"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        {/* Colonne 2: Company + Liens */}
        <div>
          <h4 className="text-lg font-bold text-blue-200 mb-4 uppercase">
            Company
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/confidentiality-security-notice"
                className="hover:text-gray-400"
              >
                Confidentialitity & secutiity
              </Link>
            </li>
            <br />
            <li>
              <Link href="/legal-notice" className="hover:text-gray-400">
                Legal notice
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-gray-400">
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
          <h4 className="text-lg font-bold text-blue-200 mb-4 uppercase">
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
              <Link
                href="/carrier-protection-policy"
                className="hover:text-blue-900"
              >
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
          <h4 className="text-lg font-bold text-blue-200 mb-4 uppercase">
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
        {/* <div>
          <h4 className="text-lg font-bold text-blue-200 mb-4 uppercase">
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
        </div> */}
      </div>
      <div className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Fincargo. All rights reserved.
      </div>
    </footer>
  );
}
