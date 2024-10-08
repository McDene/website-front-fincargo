"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header({ initialClientType, setClientType }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clientType, setClientTypeState] = useState(
    initialClientType || "Carrier"
  );

  useEffect(() => {
    // S'assure que le clientType est bien initialisé
    setClientType(clientType);
  }, [clientType, setClientType]);

  // Menus pour chaque type de client avec des ancres (#) au lieu de href
  const carrierMenu = [
    { name: "Prérequis", anchor: "#prerequis" },
    { name: "Qu’est-ce que Fincargo", anchor: "#fincargo" },
    { name: "Aide", anchor: "#aide" },
  ];

  const freightforwarderMenu = [
    { name: "Prérequis", anchor: "#prerequis" },
    { name: "Contact", anchor: "#contact" },
  ];

  const menuItems =
    clientType === "Carrier" ? carrierMenu : freightforwarderMenu;

  return (
    <header className="bg-blue-950 shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-9">
          {/* Mobile : Logo, hamburger, et Login à gauche */}
          <div className="flex items-center justify-between w-full md:hidden">
            {/* Logo à gauche */}
            <Link href="/">
              <Image
                src="/logo/logo_fincargo_white.svg"
                alt="Fincargo Logo"
                width={150}
                height={40}
              />
            </Link>

            <div className="flex items-center space-x-4">
              {/* Login visible en mobile */}
              <Button className="text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md border border-blue-600">
                Login
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {menuOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Premier niveau : Liens pour Carrier et Freight Forwarder */}
          <div className="hidden md:flex space-x-4">
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                clientType === "Carrier" ? "text-blue-600" : "text-gray-500"
              }`}
              onClick={() => setClientTypeState("Carrier")}
            >
              Carrier
            </button>
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                clientType === "Freightforwarder"
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setClientTypeState("Freightforwarder")}
            >
              Freight Forwarder
            </button>
          </div>
        </div>

        {/* Deuxième niveau : Menu dynamique (pour desktop) */}
        <div className="hidden md:flex justify-between items-center py-4 border-t border-gray-200">
          {/* Logo pour desktop */}
          <div className="hidden md:block flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo/logo_fincargo_white.svg"
                alt="Fincargo Logo"
                width={150}
                height={40}
              />
            </Link>
          </div>

          {/* Navigation dynamique avec ancres */}
          <div className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.anchor}
                className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* À droite : Register et Login */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">
              Register
            </Button>
            <Button className="text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md border border-blue-600">
              Login
            </Button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col justify-center items-center space-y-4">
            {/* Tabs pour Carrier et Freight Forwarder */}
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded-lg text-lg font-medium ${
                  clientType === "Carrier"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setClientTypeState("Carrier")}
              >
                Carrier
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-lg font-medium ${
                  clientType === "Freightforwarder"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setClientTypeState("Freightforwarder")}
              >
                Freight Forwarder
              </button>
            </div>

            {/* Items du menu avec ancres pour mobile */}
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.anchor}
                className="text-gray-800 text-xl font-medium"
              >
                {item.name}
              </a>
            ))}

            {/* Boutons Register et Login */}
            <Button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-full max-w-xs">
              Register
            </Button>
            <Button className="text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md w-full max-w-xs border border-blue-600">
              Login
            </Button>

            {/* Bouton pour fermer le menu */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-md focus:outline-none"
            >
              <XMarkIcon className="block h-8 w-8 text-gray-800" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
