"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [visible, setVisible] = useState(true); // Header visibility
  const [lastScrollY, setLastScrollY] = useState(0);

  const clientType =
    pathname === "/freight-forwarders" ? "Freightforwarder" : "Carrier";

  const carrierMenu = [
    { name: "What is Fincargo", anchor: "#whatisfincargo" },
    { name: "Benefits", anchor: "#fincargo" },
    { name: "How to use", anchor: "#aide" },
    { name: "Parteners", anchor: "#aide" },
    { name: "FAQ's", anchor: "#aide" },
  ];

  const freightforwarderMenu = [
    { name: "Whats is Fincargo", anchor: "#whatisfincargo" },
    { name: "Benefits", anchor: "#prerequis" },
    { name: "How it woorks", anchor: "#prerequis" },
    { name: "Invite your subcontractors", anchor: "#prerequis" },
  ];

  const menuItems =
    clientType === "Carrier" ? carrierMenu : freightforwarderMenu;

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
  }, [lastScrollY]); // Dépendance de lastScrollY

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Inclure handleScroll dans les dépendances

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-transform duration-500 ease-in-out ${
        sticky
          ? "bg-gray-50 bg-opacity-80 shadow backdrop-blur-sm"
          : "bg-transparent"
      } ${visible ? "translate-y-0" : "-translate-y-full"}`} // Hide when scrolling down
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First level */}
        <div className="flex justify-between items-center h-16 md:h-8 ">
          {/* Open/Close button for mobile menu */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <XMarkIcon className="w-8 h-8 text-white" />
              ) : (
                <Bars3Icon className="w-8 h-8 text-white" />
              )}
            </button>
          </div>
          <div className="block md:hidden flex-shrink-0">
            <Link href="/">
              <Image
                src={
                  sticky
                    ? "/logo/logo_fincargo_blue.svg"
                    : "/logo/logo_fincargo_white.svg"
                }
                alt="Fincargo Logo"
                width={150}
                height={40}
              />
            </Link>
          </div>
          <div className="hidden md:block space-x-4">
            <Link
              href="/"
              className={`px-1 py-2 text-sm ${
                pathname === "/"
                  ? "border-b-2 border-blue-400 text-blue-950"
                  : ""
              } ${sticky ? "text-blue-950" : "text-white"}`}
            >
              For carriers
            </Link>
            <Link
              href="/freight-forwarders"
              className={`px-1 py-2 text-sm ${
                pathname === "/freight-forwarders"
                  ? "border-b-2 border-blue-400"
                  : ""
              } ${sticky ? "text-blue-950" : "text-white"}`}
            >
              Freight Forwarders
            </Link>
          </div>

          {/*Login button mobile mode */}
          <div className="md:hidden space-x-4">
            <button
              className={`px-4 py-2 rounded-xl hover:bg-blue-900 border-2 ${
                sticky ? "border-blue-950 text-blue-950" : "border-white"
              } text-white`}
            >
              Login
            </button>
          </div>
        </div>

        {/* Logo Desktop - second level */}
        <div className="hidden md:flex justify-between items-center py-4 ">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={
                  sticky
                    ? "/logo/logo_fincargo_blue.svg"
                    : "/logo/logo_fincargo_blue.svg"
                }
                alt="Fincargo Logo"
                width={150}
                height={40}
              />
            </Link>
          </div>

          {/* Menu anchor */}
          <div className="flex justify-center space-x-6 scroll-smooth">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.anchor}
                className={`font-semibold text-lg transition duration-300 hover:text-blue-950 ${
                  sticky ? "text-blue-950" : "text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Button Register and login desktop mode */}
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-3xl border-2 transition duration-300 ${
                sticky
                  ? "border-blue-400 bg-blue-400 text-white hover:bg-gray-200 hover:border-gray-200 hover:text-blue-950"
                  : "border-white bg-white text-blue-950 hover:bg-gray-200 hover:border-gray-200"
              } `}
            >
              Register
            </button>
            <button
              className={`px-4 py-2 rounded-3xl transition duration-300  ${
                sticky
                  ? "border-blue-400 text-blue-400 hover:bg-gray-100"
                  : "border-white text-white hover:text-blue-950 "
              } `}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile full screen */}
      {menuOpen && (
        <div className="fixed inset-0 bg-blue-950 z-50 flex flex-col items-center place-content-around text-center">
          {/* Close button */}
          <div className="absolute top-5 left-5">
            <button onClick={() => setMenuOpen(false)}>
              <XMarkIcon className="w-8 h-8 text-white" />
            </button>
          </div>

          <div className="flex space-x-4 py-5 text-xl min-h-[100px]">
            <Link
              href="/"
              className={`px-1 py-2 text-white font-bold transition-all duration-300 ease-in-out ${
                pathname === "/"
                  ? "border-b-2 border-blue-400"
                  : "border-b-2 border-transparent"
              }`}
            >
              For carriers
            </Link>

            <Link
              href="/freight-forwarders"
              className={`px-1 py-2 text-white font-bold transition-all duration-300 ease-in-out ${
                pathname === "/freight-forwarders"
                  ? "border-b-2 border-blue-400"
                  : "border-b-2 border-transparent"
              }`}
            >
              Freight Forwarders
            </Link>
          </div>

          {/* Dynamic menu for mobile */}
          <div className="flex flex-col space-y-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.anchor}
                className="text-white text-xl font-semibold hover:text-gray-300"
                onClick={() => setMenuOpen(false)} // Close the menu when clicking on a link
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Register and Login buttons mobile mode */}
          <div className="flex flex-col space-y-4">
            <button className="border-2 bg-neutral-50 border-white px-4 py-2 rounded-xl hover:bg-neutral-200">
              Register
            </button>
            <button className="text-white border-2 border-white px-4 py-2 rounded-xl hover:bg-blue-900">
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
