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

export default function SectionHeroMobile({
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
    <section className="relative bg-blue-950 py-10 px-4 overflow-hidden">
      {/* Image centrée */}
      <div
        className={`relative w-full transition-all py-10 duration-1000 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          layout="responsive"
          width={1920}
          height={1080}
          className="rounded-lg w-full h-auto"
        />
      </div>

      {/* Contenu (titre, paragraphe, bouton) chevauchant légèrement l'image */}
      <div
        className={`relative z-20 mx-auto transform transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 -translate-y-8" : "opacity-0 translate-y-5"
        } -mt-10 max-w-md bg-blue-200 shadow-lg border-transparent rounded-lg p-6`}
        style={{ maxWidth: "90%" }}
      >
        <h1 className="text-3xl font-bold text-blue-950 mb-4 ">{title}</h1>
        <p className="text-gray-700 text-base mb-6">{paragraph}</p>
        <div className="flex justify-center">
          <button className="bg-transparent text-blue-900 px-4 py-2 border-2 border-blue-900 rounded-lg font-semibold hover:bg-blue-700 hover:text-white transition duration-300">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
