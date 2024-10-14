"use client";

import { useEffect, useState } from "react";
import SectionFaq from "@/components/Common/SectionFaq";
import { fetchAPI } from "@/lib/utils"; // Import de la fonction fetchAPI

export default function CarrierFaqs() {
  const [faqs, setFaqs] = useState([]); // Utilisation de useState pour stocker les FAQs
  const [loading, setLoading] = useState(true); // Utilisation d'un état pour le chargement

  useEffect(() => {
    // Fonction pour récupérer les FAQs depuis Strapi
    const getFAQs = async () => {
      try {
        const data = await fetchAPI("/api/faq-freight-forwarders"); // Récupère les FAQs de Strapi via fetchAPI
        //console.log("API response data:", data);

        if (data && data.data) {
          // Strapi retourne les données sous `data`
          const formattedFAQs = data.data.map((item: any) => ({
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
  return <SectionFaq title="Freight Forwarders FAQS" faqs={faqs} />;
}
