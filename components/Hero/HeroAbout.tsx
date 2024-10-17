"use client";

import SectionHeroImage from "@/components/Common/SectionHeroImage";
import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/utils";
import SkeletonLoader from "@/components/SkeletonLoader";

// Définir l'interface pour les données du Hero
interface HeroData {
  Title: string;
  Paragraph: string;
  Button: string;
  Image: {
    url: string;
  };
}

export default function HeroAbout() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true); // Gestion du chargement

  useEffect(() => {
    // Récupérer les données de l'API Strapi via utils.ts
    const getHeroData = async () => {
      try {
        const data = await fetchAPI("/api/hero?populate=Image"); // Appel de l'API avec la fonction fetchAPI
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

  //const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Gérer le cas où heroData est encore null pour éviter les erreurs
  //const imageUrl = heroData ? `${baseUrl}${heroData.Image.url}` : "";

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
      <SectionHeroImage
        title="Some additional information"
        subtitle="About."
        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien"
        buttonText={heroData.Button}
        imageUrl="/images/truck_fincargo_freightforwarder.jpg"
        imageAlt="Image de logistique"
      />
    </>
  );
}
