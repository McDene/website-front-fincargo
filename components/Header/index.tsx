"use client"; // Assure-toi que cette ligne est présente pour marquer le composant comme un Client Component

import Link from "next/link";
import { usePathname } from "next/navigation"; // Importe usePathname pour obtenir la route active

export default function Header() {
  const pathname = usePathname(); // Obtenir la route active

  // Déterminer le type de client en fonction de l'URL
  const clientType =
    pathname === "/freight-forwarders" ? "Freightforwarder" : "Carrier";

  // Menus pour chaque type de client avec des ancres (#) au lieu de href
  const carrierMenu = [
    { name: "Prérequis", anchor: "#prerequis" },
    { name: "Qu’est-ce que Fincargo", anchor: "#fincargo" },
    { name: "Aide", anchor: "#aide" },
  ];

  const freightforwarderMenu = [
    { name: "Contact", anchor: "#contact" },
    { name: "Prérequis", anchor: "#prerequis" },
  ];

  const menuItems =
    clientType === "Carrier" ? carrierMenu : freightforwarderMenu;

  return (
    <header className="bg-blue-950 shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Premier niveau : Liens vers Carrier et Freight Forwarder */}
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 text-white ${
                pathname === "/" ? "font-bold" : ""
              }`}
            >
              Carrier
            </Link>
            <Link
              href="/freight-forwarders"
              className={`px-3 py-2 text-white ${
                pathname === "/freight-forwarders" ? "font-bold" : ""
              }`}
            >
              Freight Forwarder
            </Link>
          </div>
        </div>

        {/* Deuxième niveau : Menu dynamique basé sur le clientType */}
        <div className="flex justify-center space-x-6 py-4 ">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.anchor}
              className="text-white hover:text-gray-300"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
