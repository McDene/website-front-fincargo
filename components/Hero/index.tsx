"use client";

import SectionHero from "@/components/Common/SectionHero";
import SectionHeroMobile from "@/components/Common/SectionHeroMobile"; // Importe la version mobile
import { useState, useEffect } from "react";

export default function Hero() {
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
          title="Secure your Fast Payment"
          paragraph="If you have an established relationship with Freight Forwarders in Fincargo’s network, we expedite the payment of your invoices. If your Freight Forwarder is not yet part of Fincargo’s network, you can invite them to join our platform."
          buttonText="Get started"
          imageUrl="/images/truck_fincargo_carrier.jpeg"
          imageAlt="Image de logistique"
        />
      ) : (
        <SectionHero
          title="Secure your Fast Payment"
          paragraph="If you have an established relationship with Freight Forwarders in Fincargo’s network, we expedite the payment of your invoices. If your Freight Forwarder is not yet part of Fincargo’s network, you can invite them to join our platform."
          buttonText="Get started"
          imageUrl="/images/truck_fincargo_carrier.jpeg"
          imageAlt="Image de logistique"
        />
      )}
    </>
  );
}
