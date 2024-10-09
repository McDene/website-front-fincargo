"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();

  const clientType =
    pathname === "/freight-forwarders" ? "Freightforwarder" : "Carrier";

  // Menus pour chaque type de client avec des ancres (#) au lieu de href
  const carrierMenu = [
    { name: "What is Fincargo", anchor: "#prerequis" },
    { name: "Benefits", anchor: "#fincargo" },
    { name: "How to use", anchor: "#aide" },
    { name: "Parteners", anchor: "#aide" },
    { name: "FAQ's", anchor: "#aide" },
  ];

  const freightforwarderMenu = [
    { name: "Whats is Fincargo", anchor: "#contact" },
    { name: "Benefits", anchor: "#prerequis" },
    { name: "How it woorks", anchor: "#prerequis" },
    { name: "Invite your subcontractors", anchor: "#prerequis" },
  ];

  const menuItems =
    clientType === "Carrier" ? carrierMenu : freightforwarderMenu;

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 90) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  return (
    <header
      className={`top-0 z-40 w-full items-center ${
        sticky
          ? "fixed z-[9999] bg-blue-950 !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
          : "absolute bg-transparent"
      }`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* First level  */}
        <div className="flex justify-between items-center h-8 ">
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`px-1 py-2 text-white text-sm ${
                pathname === "/"
                  ? "font-bold bg-blue-400 rounded-bl-xl rounded-br-xl"
                  : ""
              }`}
            >
              For carriers
            </Link>
            <Link
              href="/freight-forwarders"
              className={`px-1 py-2 text-white text-sm ${
                pathname === "/freight-forwarders"
                  ? "font-bold bg-blue-400 rounded-bl-xl rounded-br-xl"
                  : ""
              }`}
            >
              Freight Forwarders
            </Link>
          </div>
        </div>

        {/* Second level */}
        <div className="flex justify-between items-center py-4 ">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo/logo_fincargo_white.svg"
                alt="Fincargo Logo"
                width={150}
                height={40}
              />
            </Link>
          </div>

          {/* Menu anchor*/}
          <div className="flex justify-center space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.anchor}
                className="text-white font-semibold hover:text-gray-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Button Register and login */}
          <div className="flex space-x-4">
            <button className=" border-2 bg-neutral-50 border-white px-4 py-2 rounded-xl hover:bg-neutral-200">
              Register
            </button>
            <button className="text-white  border-2 border-white  px-4 py-2 rounded-xl hover:bg-blue-900">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
