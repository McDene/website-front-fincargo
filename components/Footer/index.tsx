"use client";
import Image from "next/image";
import Link from "next/link";

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
            <p className="mt-4 text-gray-400">
              Rue de L&rsquo;Industrie 23
              <br />
              1950 Sion
              <br />
              Switzerland
            </p>
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
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                scroll={false}
                className="hover:text-gray-400"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/confidentiality-security-notice"
                scroll={false}
                className="hover:text-gray-400"
              >
                Confidentialitity & secutiity
              </Link>
            </li>
            <br />
            <li>
              <Link
                href="/legal-notice"
                scroll={false}
                className="hover:text-gray-400"
              >
                Legal notice
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                scroll={false}
                className="hover:text-gray-400"
              >
                Cookies policy
              </Link>
            </li>
            <li>
              <Link
                href="/sustainability"
                scroll={false}
                className="hover:text-gray-400"
              >
                Sustainability
              </Link>
            </li>
            <li>
              <Link
                href="/partener"
                scroll={false}
                className="hover:text-gray-400"
              >
                Parteners
              </Link>
            </li>
            <li>
              <Link
                href="/investor"
                scroll={false}
                className="hover:text-gray-400"
              >
                Investors
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-gray-400">
                Career
              </Link>
            </li>
            {/* <li>
              <Link href="/contact" className="hover:text-blue-900">
                Blog
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Colonne 3: Carriers + Liens */}
        <div>
          <h4 className="text-lg font-bold text-blue-200 mb-4 uppercase">
            Carriers
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/#" scroll={false} className="hover:text-gray-400">
                Get started
              </Link>
            </li>
            <li>
              <Link href="/#" scroll={false} className="hover:text-gray-400">
                Log-in
              </Link>
            </li>
            <li>
              <Link href="/#" scroll={false} className="hover:text-gray-400">
                Explore freight forwarding partners
              </Link>
            </li>
            <li>
              <Link
                href="/carrier-protection-policy"
                scroll={false}
                className="hover:text-gray-400"
              >
                Carriers protection policy
              </Link>
            </li>
            <li>
              <Link
                href="/#faqs"
                scroll={false}
                className="hover:text-gray-400"
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
              <Link href="/#" scroll={false} className="hover:text-gray-400">
                Get started
              </Link>
            </li>
            <li>
              <Link href="/#" scroll={false} className="hover:text-gray-400">
                Log-in
              </Link>
            </li>
            <li>
              <Link href="/#" scroll={false} className="hover:text-gray-400">
                Pay carrier early
              </Link>
            </li>
            <li>
              <Link href="/#" scroll={false} className="hover:text-gray-400">
                API Intergration
              </Link>
            </li>
            <li>
              <Link
                href="/freight-forwarders/#faqs"
                scroll={false}
                className="hover:text-gray-400"
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
