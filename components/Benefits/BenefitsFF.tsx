"use client";

import { useEffect, useState } from "react";
import SectionBenefits from "@/components/Common/SectionBenefits"; // Le composant commun
import { fetchAPI } from "@/lib/utils"; // Import de la fonction fetchAPI pour appeler Strapi

interface StrapiBenefit {
  id: number;
  Title: string;
  Paragraph: string;
  Image: {
    url: string;
  };
}

interface Benefit {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface SectionTitle {
  title: string;
  subtitle: string;
}

export default function BenefitsC() {
  const [benefits, setBenefits] = useState<Benefit[]>([]); // Utilisation de useState pour stocker les bénéfices
  const [sectionTitle, setSectionTitle] = useState<SectionTitle | null>(null);
  const [loading, setLoading] = useState(true); // Gestion du chargement

  useEffect(() => {
    // Fonction pour récupérer les données depuis Strapi
    const getBenefits = async () => {
      try {
        const data = await fetchAPI("/api/benefit-ffs?populate=Image");

        const sectionTitleResponse = await fetchAPI("/api/benefits-section-ff");

        if (data && data.data) {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL; // Base URL pour Strapi

          // Formatter les bénéfices
          const formattedBenefits = data.data.map((item: StrapiBenefit) => ({
            id: item.id,
            image: `${baseUrl}${item.Image.url}`, // Ajouter le domaine de base
            title: item.Title,
            description: item.Paragraph,
          }));
          setBenefits(formattedBenefits); // Mise à jour de l'état avec les bénéfices formatés
        }

        if (sectionTitleResponse && sectionTitleResponse.data) {
          setSectionTitle({
            title: sectionTitleResponse.data.Title,
            subtitle: sectionTitleResponse.data.Subtitle,
          });
        }
      } catch (error) {
        console.error("Error fetching benefits:", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    getBenefits(); // Appel de l'API au montage du composant
  }, []);

  // Si les données sont en cours de chargement
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si aucune donnée n'est trouvée
  if (benefits.length === 0) {
    return <div>No benefits available.</div>;
  }

  // Affichage du composant SectionBenefits avec les données récupérées
  return (
    <SectionBenefits
      title={sectionTitle?.title || ""}
      subtitle={sectionTitle?.subtitle || ""}
      benefits={benefits}
    />
  );
}
