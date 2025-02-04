"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import MenuButton from "./MenuButton";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LanguageSwitcherMobile from "@/components/LanguageSwitcherMobile";

export default function Header() {
  const t = useTranslation();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const clientType =
    pathname === "/freight-forwarders"
      ? "Freightforwarder"
      : pathname === "/liquidity-providers"
      ? "LiquidityProvider"
      : "Carrier";

  const carrierMenu = [
    { name: t("features"), anchor: "../#feature" },
    { name: t("benefits"), anchor: "../#benefit" },
    { name: t("invite_your_subcontractors"), anchor: "../#invite" },
    { name: t("faq"), anchor: "../#faqs" },
  ];

  const freightforwarderMenu = [
    { name: t("features"), anchor: "#feature" },
    { name: t("benefits"), anchor: "#benefit" },
    { name: t("invite_your_subcontractors"), anchor: "#invite" },
    { name: t("faq"), anchor: "#faqs" },
  ];

  const liquidityprovidersMenu = [
    { name: "Why", anchor: "#whatisfincargo" },
    { name: "Benefits", anchor: "#prerequis" },
    { name: "How it works", anchor: "#prerequis" },
    { name: "Invite your subcontractors", anchor: "#prerequis" },
  ];

  const menuItems =
    clientType === "Freightforwarder"
      ? freightforwarderMenu
      : clientType === "LiquidityProvider"
      ? liquidityprovidersMenu
      : carrierMenu;

  const SCROLL_THRESHOLD = 5;

  // Sticky Navbar
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 90) {
      setSticky(true);
    } else {
      setSticky(false);
    }

    if (Math.abs(currentScrollY - lastScrollY) > SCROLL_THRESHOLD) {
      setVisible(currentScrollY < lastScrollY);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-transform duration-500 ease-in-out ${
          sticky
            ? "bg-gray-50 bg-opacity-80  backdrop-blur-sm"
            : "bg-transparent"
        } 
  ${visible ? "translate-y-0" : "lg:-translate-y-full"}`}
      >
        <div className="max-w-7xl mx-auto px-0 sm:px-5 lg:px-8">
          {/* First level */}
          <div className="flex pt-5 px-5 sm:px-0 justify-between items-center h-20 lg:h-8">
            {/* Logo for Mobile */}
            <div className="block lg:hidden flex-shrink-0">
              <Link href="/">
                <Image
                  src={"/logo/logo_fincargo_blue.svg"}
                  alt="Fincargo Logo"
                  width={150}
                  height={40}
                />
              </Link>
            </div>
            {/* Menu Button for Mobile */}
            <div className="flex lg:hidden ">
              <div className="pr-4">
                <LanguageSwitcherMobile />
              </div>

              <MenuButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
            </div>

            {/* Carriers/Freight Forwarders Navigation for Desktop */}
            <div className="hidden lg:block space-x-4">
              <Link
                href="/"
                className={`px-2 py-1 text-sm rounded-3xl ${
                  pathname === "/"
                    ? "bg-blue-200 text-blue-950"
                    : `${
                        sticky ? "text-blue-950" : "text-white"
                      } hover:bg-blue-100 hover:text-blue-950`
                } transition duration-300 ease-in-out`}
              >
                {t("for_carriers")}
              </Link>
              <Link
                href="/freight-forwarders"
                className={`px-2 py-1 text-sm rounded-3xl ${
                  pathname === "/freight-forwarders"
                    ? "bg-blue-200  text-blue-950"
                    : `${
                        sticky ? "text-blue-950" : "text-white"
                      } hover:bg-blue-100 hover:text-blue-950`
                } transition duration-300 ease-in-out`}
              >
                {t("for_freight_forwarders")}
              </Link>
            </div>
            <LanguageSwitcher />
          </div>

          {/* Second Level (Desktop): Logo, Navigation, Register/Login */}
          <div className="hidden lg:flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src={"/logo/logo_fincargo_blue.svg"}
                  alt="Fincargo Logo"
                  width={150}
                  height={40}
                />
              </Link>
            </div>
            {/* Menu anchor (NavLinks component) */}
            <div className="flex justify-center space-x-6">
              <NavLinks
                menuItems={menuItems}
                sticky={sticky}
                pathname={pathname}
              />
            </div>
            {/* Register and Login buttons for Desktop */}
            <div className="flex space-x-4">
              <a
                href="https://frontend-fincargo-180162974123.europe-west6.run.app/register"
                target="_blank"
              >
                <button
                  className={`px-4 py-2 rounded-3xl border-2 transition duration-300 ${
                    sticky
                      ? "border-darkBlue bg-darkBlue text-white hover:bg-lightBlue hover:border-lightBlue "
                      : "border-white bg-white text-blue-950 hover:bg-gray-200 hover:border-gray-200"
                  } `}
                >
                  {t("register")}
                </button>
              </a>

              <a
                target="_blank"
                href="https://frontend-fincargo-180162974123.europe-west6.run.app/login"
              >
                <button
                  className={`px-4 py-2 rounded-3xl transition duration-300 ${
                    sticky
                      ? "border-blue-400 text-darkBlue hover:bg-gray-100"
                      : "border-white text-white hover:text-blue-950"
                  }`}
                >
                  {t("login")}
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        menuItems={menuItems}
        pathname={pathname}
      />
    </>
  );
}
