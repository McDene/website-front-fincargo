"use client";

import SectionHero from "@/components/Common/SectionHero";
import SectionHeroMobile from "@/components/Common/SectionHeroMobile"; // Importe la version mobile
import { useState, useEffect } from "react";

export default function HeroFF() {
  const [isMobile, setIsMobile] = useState(false);

  // Détecte la taille de l'écran pour rendre le bon composant
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Vérifie la taille de l'écran au chargement
    handleResize();

    // Ajoute un event listener pour vérifier la taille de l'écran lorsqu'il est redimensionné
    window.addEventListener("resize", handleResize);

    // Cleanup pour retirer l'event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Affichage conditionnel en fonction de la taille de l'écran */}
      {isMobile ? (
        <SectionHeroMobile
          title="Pay faster and help your subcontractors"
          paragraph="Enable fast payments to your subcontractors without affecting your own cash flow. Strengthen carrier loyalty and ensure more stable, efficient operations."
          buttonText="Get started"
          imageUrl="/images/truck_fincargo_freightforwarder.jpg"
          imageAlt="Image de logistique"
        />
      ) : (
        <SectionHero
          title="Pay faster and help your subcontractors"
          paragraph="Enable fast payments to your subcontractors without affecting your own cash flow. Strengthen carrier loyalty and ensure more stable, efficient operations."
          buttonText="Get started"
          imageUrl="/images/truck_fincargo_freightforwarder.jpg"
          imageAlt="Image de logistique"
        />
      )}
    </>
  );
}
