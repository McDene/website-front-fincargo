"use client";

import { useEffect, useState } from "react";
import SectionFaq from "@/components/Common/SectionFaq";
import { fetchAPI } from "@/lib/utils"; // Import de la fonction fetchAPI

// Définir une interface pour les éléments de FAQ
interface FAQ {
  id: number;
  Title: string;
  Answer: string;
}

// Définir une interface pour la FAQ formatée
interface FormattedFAQ {
  id: number;
  question: string;
  answer: string;
}

export default function CarrierFaqs() {
  const [faqs, setFaqs] = useState<FormattedFAQ[]>([]); // Utilisation de useState avec un tableau typé
  const [loading, setLoading] = useState(true); // Utilisation d'un état pour le chargement

  useEffect(() => {
    // Fonction pour récupérer les FAQs depuis Strapi
    const getFAQs = async () => {
      try {
        const data = await fetchAPI("/api/faq-carriers"); // Récupère les FAQs de Strapi via fetchAPI

        if (data && data.data) {
          // Utilisation de l'interface FAQ pour typifier les éléments
          const formattedFAQs = data.data.map((item: FAQ) => ({
            id: item.id,
            question: item.Title, // Utilise le champ `Title` comme question
            answer: item.Answer, // Utilise le champ `Answer` comme réponse
          }));
          setFaqs(formattedFAQs); // Mise à jour de l'état avec les FAQs formatées
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    getFAQs(); // Appel API au montage du composant
  }, []);

  // Si les données sont en cours de chargement
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si aucune FAQ n'a été trouvée
  if (faqs.length === 0) {
    return <div>No FAQs available.</div>;
  }

  // Afficher les FAQs avec le composant FaqComponent
  return <SectionFaq title="Carriers FAQS" faqs={faqs} />;
}
