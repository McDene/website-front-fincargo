"use client";

import SectionHero from "@/components/Common/SectionHero";
import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/utils"; // Import de la fonction fetchAPI depuis utils.ts
import SkeletonLoader from "@/components/SkeletonLoader";

// Définir l'interface pour les données du Hero
interface HeroData {
  Title: string;
  Paragraph: string;
  Button: string;
  Video: {
    url: string;
  };
}

export default function HeroFF() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true); // Gestion du chargement

  useEffect(() => {
    // Récupérer les données de l'API Strapi via utils.ts
    const getHeroData = async () => {
      try {
        const data = await fetchAPI("/api/hero-ff?populate=Video"); // Appel de l'API avec la fonction fetchAPI
        if (data && data.data) {
          setHeroData(data.data); // Mettre à jour l'état avec les données
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    getHeroData(); // Appeler l'API au montage
  }, []);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Gérer le cas où heroData est encore null pour éviter les erreurs
  const imageUrl = heroData ? `${baseUrl}${heroData.Video.url}` : "";

  // Affichage du chargement si les données ne sont pas encore disponibles
  if (loading) {
    return <SkeletonLoader />;
  }

  // Gérer le cas où heroData est null
  if (!heroData) {
    return <div>No hero data available.</div>;
  }

  return (
    <>
      <SectionHero
        title={heroData.Title}
        paragraph={heroData.Paragraph}
        buttonText={heroData.Button}
        imageUrl={imageUrl} // Utilisation de l'URL complète de l'image
        imageAlt="Image de logistique"
      />
    </>
  );
}
