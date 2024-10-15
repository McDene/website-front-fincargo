import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface MobileMenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
  menuItems: { name: string; anchor: string }[];
  pathname: string;
}

export default function MobileMenu({
  menuOpen,
  toggleMenu,
  menuItems,
  pathname,
}: MobileMenuProps) {
  // Bloquer le scroll lorsque le menu est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // Désactiver le scroll
    } else {
      document.body.style.overflow = ""; // Réactiver le scroll
    }

    // Nettoyer lors du démontage du composant
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    menuOpen && (
      <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col items-center justify-between text-center h-screen">
        {/* Header avec logo et bouton de fermeture */}
        <div className="w-full flex justify-between items-center px-5 pt-5">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo/logo_fincargo_blue.svg"
                alt="Fincargo Logo"
                width={150}
                height={40}
              />
            </Link>
          </div>

          {/* Bouton de fermeture */}
          <button onClick={toggleMenu}>
            <XMarkIcon className="w-8 h-8 text-black" />
          </button>
        </div>

        {/* Liens */}
        <div className="flex space-x-4 py-5 text-xl">
          <Link
            href="/"
            className={`px-4 py-2 text-gray-700 font-bold transition-all duration-300 ease-in-out rounded-3xl ${
              pathname === "/" ? "bg-blue-100 " : "hover:bg-gray-100"
            }`}
          >
            For carriers
          </Link>

          <Link
            href="/freight-forwarders"
            className={`px-4 py-2 text-gray-700 font-bold transition-all duration-300 ease-in-out rounded-3xl ${
              pathname === "/freight-forwarders"
                ? "bg-blue-100 "
                : "hover:bg-gray-100"
            }`}
          >
            Freight Forwarders
          </Link>
        </div>

        {/* Menu dynamique */}
        <div className="flex flex-col space-y-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.anchor}
              className="text-gray-700 text-xl  hover:text-gray-300"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Boutons Register et Login */}
        <div className="flex space-x-4 pb-8">
          <button className="text-white bg-gray-900 px-4 py-2 rounded-3xl hover:bg-gray-800">
            Register
          </button>
          <button className="text-gray-900 bg-gray-200 px-4 py-2 rounded-3xl hover:bg-gray-100">
            Login
          </button>
        </div>
      </div>
    )
  );
}
