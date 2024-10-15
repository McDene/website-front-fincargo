"use client";

import { useState, useEffect, useRef } from "react";

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

    // Capture les références actuelles
    const currentTitleRef = titleRef.current;
    const currentTextRef = textRef.current;
    const currentButtonRef = buttonRef.current;

    if (currentTitleRef) observer.observe(currentTitleRef);
    if (currentTextRef) observer.observe(currentTextRef);
    if (currentButtonRef) observer.observe(currentButtonRef);

    return () => {
      // Utiliser les références capturées dans la fonction de nettoyage
      if (currentTitleRef) observer.unobserve(currentTitleRef);
      if (currentTextRef) observer.unobserve(currentTextRef);
      if (currentButtonRef) observer.unobserve(currentButtonRef);
    };
  }, []);

  return (
    <section className="relative flex items-start min-h-screen py-32 xl:py-32 lg:py-38 md:py-24 sm:py-20 px-8 overflow-hidden">
      {/* Vidéo en arrière-plan */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={imageUrl}
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
            <h1 className="text-4xl md:text-8xl uppercase font-bold text-start text-white">
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
            <p className="text-lg md:text-xl text-white font-medium mb-6 leading-8">
              {paragraph}
            </p>
          </div>
        </div>

        {/* Bouton avec effet flottant */}
        <div
          className={`relative z-10 flex justify-start px-4 sm:px-6 lg:px-8 transition-transform duration-1000 ease-out delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <button
            ref={buttonRef} // Assignez le ref directement au bouton
            className="bg-blue-400 text-white px-6 py-3 border-2 border-blue-400 rounded-3xl font-semibold hover:bg-blue-500 hover:border-blue-500 transition duration-300"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
