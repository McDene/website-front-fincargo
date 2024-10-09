"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SectionHeroProps {
  title: string;
  paragraph: string;
  buttonText: string;
  imageUrl: string;
  imageAlt: string;
}

export default function SectionHero({
  title,
  paragraph,
  buttonText,
  imageUrl,
  imageAlt,
}: SectionHeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Déclenche l'animation lors du chargement
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex justify-end items-center h-lvh bg-blue-950 py-20 px-8 overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto py-20">
        {/* Section image à droite */}
        <div
          className={`relative flex justify-end transform transition-all duration-1000 ease-in-out ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={820}
            height={600}
            className="rounded-xl shadow-md"
          />
        </div>

        {/* Section texte à gauche qui chevauche l'image */}
        <div
          className={`absolute bg-blue-200 shadow-lg border-transparent rounded-xl p-6 max-w-lg z-20 transform transition-all duration-1000 ease-in-out ${
            isVisible
              ? "-translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          } -translate-y-80 translate-x-10`}
        >
          <h1 className="text-6xl font-bold text-blue-950 mb-4">{title}</h1>
          <p className="text-gray-700 text-lg mb-6">{paragraph}</p>
          <button className="bg-transparent text-blue-900 px-4 py-2 border-2 border-blue-900 rounded-xl font-semibold hover:bg-blue-700 hover:text-white transition duration-300">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
