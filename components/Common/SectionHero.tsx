"use client";

import { useState, useEffect, useRef } from "react";
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
  const titleRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Utiliser l'API IntersectionObserver pour déclencher l'animation lors du scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2, // L'élément doit être au moins à 20% visible avant de déclencher l'animation
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (textRef.current) observer.observe(textRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
      if (buttonRef.current) observer.unobserve(buttonRef.current);
    };
  }, []);

  return (
    <section className="relative flex items-start min-h-screen py-20 px-8 overflow-hidden">
      {/* Vidéo en arrière-plan */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="images/fincargo_hero_carriers.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay bleu transparent */}
      <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-30 z-0"></div>

      {/* Contenu principal qui commence sous le header */}
      <div className="flex flex-col max-w-7xl justify-center m-auto mt-[120px] w-full">
        {/* Titre avec effet flottant */}
        <div
          ref={titleRef}
          className={`relative z-10 flex justify-start px-4 sm:px-6 lg:px-8 transition-transform duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="max-w-7xl mb-10">
            <h1 className="text-8xl uppercase font-bold text-start text-white">
              {title}
            </h1>
          </div>
        </div>

        {/* Texte et bouton alignés à gauche avec effet flottant */}
        <div
          ref={textRef}
          className={`relative z-10 flex justify-start px-4 sm:px-6 lg:px-8 transition-transform duration-1000 ease-out delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="max-w-xl mb-10">
            <p className="text-xl text-white font-medium mb-6 leading-8">
              {paragraph}
            </p>
          </div>
        </div>

        {/* Bouton avec effet flottant */}
        <div
          ref={buttonRef}
          className={`relative z-10 flex justify-start px-4 sm:px-6 lg:px-8 transition-transform duration-1000 ease-out delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <button className="bg-blue-400 text-white px-6 py-3 border-2 border-blue-400 rounded-3xl font-semibold hover:bg-blue-500 hover:border-blue-500 transition duration-300">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
