"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid"; // Remplacez par vos icônes préférées d'Heroicons

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
            123 Transport Avenue,
            <br />
            City, State, ZIP
          </p>
          <div className="flex space-x-4 mt-6">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChevronRightIcon className="w-6 h-6 text-white hover:text-blue-400" />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white hover:text-blue-400" />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRightIcon className="w-6 h-6 text-white hover:text-blue-400" />
            </a>
          </div>
        </div>

        {/* Colonne 2: Company + Liens */}
        <div>
          <h4 className="text-lg font-bold text-blue-400 mb-4 uppercase">
            Company
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-blue-400">
                Our Team
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-blue-400">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3: Carriers + Liens */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Carriers</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/carriers/how-it-works"
                className="hover:text-blue-400"
              >
                How it works
              </Link>
            </li>
            <li>
              <Link href="/carriers/benefits" className="hover:text-blue-400">
                Benefits
              </Link>
            </li>
            <li>
              <Link href="/carriers/faq" className="hover:text-blue-400">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/carriers/contact" className="hover:text-blue-400">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 4: Freight Forwarders + Liens */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">
            Freight Forwarders
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/freight-forwarders/solutions"
                className="hover:text-blue-400"
              >
                Solutions
              </Link>
            </li>
            <li>
              <Link
                href="/freight-forwarders/benefits"
                className="hover:text-blue-400"
              >
                Benefits
              </Link>
            </li>
            <li>
              <Link
                href="/freight-forwarders/resources"
                className="hover:text-blue-400"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                href="/freight-forwarders/contact"
                className="hover:text-blue-400"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 5: Liquidity Providers + Liens */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">
            Liquidity Providers
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/liquidity-providers/partnerships"
                className="hover:text-blue-400"
              >
                Partnerships
              </Link>
            </li>
            <li>
              <Link
                href="/liquidity-providers/how-it-works"
                className="hover:text-blue-400"
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                href="/liquidity-providers/faq"
                className="hover:text-blue-400"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/liquidity-providers/contact"
                className="hover:text-blue-400"
              >
                Contact Us
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
