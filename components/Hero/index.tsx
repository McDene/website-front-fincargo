"use client";

import SectionHero from "@/components/Common/SectionHero";
import SectionHeroMobile from "@/components/Common/SectionHeroMobile";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import axios from "axios";

// Fonction pour interroger l'API Strapi
const fetchHeroData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await axios.get(`${apiUrl}/api/hero?populate=Image`);
    // console.log("Hero data fetched with axios", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching hero data with axiso", error);
    return null;
  }
};

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [heroData, setHeroData] = useState(null);

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

    // Récupérer les données de l'API Strapi via Axios
    const getHeroData = async () => {
      const data = await fetchHeroData();
      if (data && data.data) {
        //console.log("Hero data in state:", data.data); // Valider la structure
        setHeroData(data.data); // Mettre à jour l'état avec les données
      }
    };

    getHeroData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!heroData) {
    return <Loading />;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageUrl = baseUrl + heroData.Image.url;

  //console.log("Hero data", imageUrl);

  return (
    <>
      {isMobile ? (
        <SectionHeroMobile
          title={heroData.Title}
          paragraph={heroData.Paragraph}
          buttonText={heroData.Button}
          imageUrl={imageUrl} // Utilisation de l'URL complète de l'image
          imageAlt="Image de logistique"
        />
      ) : (
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
