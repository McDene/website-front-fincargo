"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import MenuButton from "./MenuButton";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuItems = [
    { name: t("for_carriers"), href: "/" },
    { name: t("for_freight_forwarders"), href: "/freight-forwarders" },
  ];

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
            : "bg-gray-50 bg-opacity-80"
        } 
  ${visible ? "translate-y-0" : "md:-translate-y-full"}`}
      >
        <div className="max-w-7xl mx-auto px-0 sm:px-5 md:px-8">
          <div className="flex px-5 sm:px-0 justify-between items-center h-20 md:h-2">
            <div className="block md:hidden flex-shrink-0">
              <Link href="/">
                <Image
                  src={"/logo/logo_fincargo_blue.svg"}
                  alt="Fincargo Logo"
                  width={150}
                  height={40}
                />
              </Link>
            </div>
            <MenuButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
          </div>

          <div className="hidden md:flex justify-between items-center py-4">
            <div className="flex-shrink-0 pb-3">
              <Link href="/">
                <Image
                  src={"/logo/logo_fincargo_blue.svg"}
                  alt="Fincargo Logo"
                  width={150}
                  height={40}
                />
              </Link>
            </div>

            <div className="flex justify-center space-x-6">
              <NavLinks
                menuItems={menuItems}
                sticky={sticky}
                pathname={pathname}
              />
            </div>

            <div className="flex space-x-4">
              <a href="https://app.fincargo.ai/register" target="_blank">
                <button
                  className={`px-4 py-2 rounded-3xl border-2 transition duration-300 ${
                    sticky
                      ? "border-blue-950 bg-blue-950 text-white hover:bg-blue-900 hover:border-blue-900"
                      : "border-blue-950 bg-blue-950 text-white hover:bg-blue-900 hover:border-blue-900"
                  } `}
                >
                  {t("register")}
                </button>
              </a>
              <a target="_blank" href="https://app.fincargo.ai/login">
                <button
                  className={`px-4 py-2 rounded-3xl border-2 transition duration-300 ${
                    sticky
                      ? "border-blue-950 text-blue-950 hover:bg-gray-150"
                      : "border-blue-950 text-blue-950 hover:bg-gray-100"
                  }`}
                >
                  {t("login")}
                </button>
              </a>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </>
  );
}
