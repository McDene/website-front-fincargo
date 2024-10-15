"use client";

import SectionHero from "@/components/Common/SectionHero";
import SectionHeroMobile from "@/components/Common/SectionHeroMobile";
// import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/utils"; // Import de la fonction fetchAPI depuis utils.ts

// Définir l'interface pour les données du Hero
interface HeroData {
  Title: string;
  Paragraph: string;
  Button: string;
  Image: {
    url: string;
  };
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Récupérer les données de l'API Strapi via utils.ts
    const getHeroData = async () => {
      const data = await fetchAPI("/api/hero?populate=Image"); // Appel de l'API avec la fonction fetchAPI
      if (data && data.data) {
        console.log("Hero data in state:", data.data); // Valider la structure
        setHeroData(data.data); // Mettre à jour l'état avec les données
      }
    };

    getHeroData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // if (!heroData) {
  //   return <Loading />;
  // }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Gérer le cas où heroData est encore null pour éviter les erreurs
  const imageUrl = heroData ? `${baseUrl}${heroData.Image.url}` : "";
  console.log("Image URL:", imageUrl);

  return (
    <>
      {isMobile
        ? heroData && (
            <SectionHeroMobile
              title={heroData.Title}
              paragraph={heroData.Paragraph}
              buttonText={heroData.Button}
              imageUrl={imageUrl} // Utilisation de l'URL complète de l'image
              imageAlt="Image de logistique"
            />
          )
        : heroData && (
            <SectionHero
              title={heroData.Title}
              paragraph={heroData.Paragraph}
              buttonText={heroData.Button}
              imageUrl={imageUrl} // Utilisation de l'URL complète de l'image
              imageAlt="Image de logistique"
            />
          )}
    </>
  );
}
