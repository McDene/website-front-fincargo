"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import MenuButton from "./MenuButton";
// import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Menu items avec des chemins absolus (href)
  const menuItems = [
    { name: "Carriers", href: "/" },
    { name: "Freight Forwarders", href: "/freight-forwarders" },
  ];

  // Sticky Navbar
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 90) {
      setSticky(true);
    } else {
      setSticky(false);
    }

    if (currentScrollY > lastScrollY) {
      setVisible(false);
    } else {
      setVisible(true);
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
              <button
                className={`px-4 py-2 rounded-3xl border-2 transition duration-300 ${
                  sticky
                    ? "border-blue-950 bg-blue-950 text-white hover:bg-blue-900 hover:border-blue-900"
                    : "border-blue-950 bg-blue-950 text-white hover:bg-blue-900 hover:border-blue-900"
                } `}
              >
                Register
              </button>
              <button
                className={`px-4 py-2 rounded-3xl border-2 transition duration-300 ${
                  sticky
                    ? "border-blue-950 text-blue-950 hover:bg-gray-150"
                    : "border-blue-950 text-blue-950 hover:bg-gray-100"
                }`}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {/* <MobileMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        menuItems={menuItems}
        pathname={pathname}
      /> */}
    </>
  );
}
