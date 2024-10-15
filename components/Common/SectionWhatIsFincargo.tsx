"use client";

import { useState, useEffect, useRef } from "react";

interface SectionWhatIsFincargoProps {
  title: string;
  paragraph: string;
}

export default function SectionWhatIsFincargo({
  title,
  paragraph,
}: SectionWhatIsFincargoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Arrêter d'observer une fois visible
        }
      },
      { threshold: 0.2 }
    );

    // Capturer la référence actuelle avant de l'utiliser
    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      // Utiliser la référence capturée pour nettoyer l'observation
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  return (
    <section
      id="whatisfincargo"
      ref={sectionRef}
      className="py-36 xl:py-36 lg:py-32 md:py-28 sm:py-24 bg-white px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Effet flottant pour le titre */}
        <h2
          className={`text-3xl md:text-6xl font-bold text-blue-400 uppercase text-center mb-8 transform transition-all duration-1000 ease-in-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {title}
        </h2>

        {/* Effet flottant pour le paragraphe */}
        <p
          className={`text-lg text-gray-700 text-center leading-8 max-w-3xl mx-auto transform transition-all duration-1000 ease-in-out delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {paragraph}
        </p>
      </div>
    </section>
  );
}
