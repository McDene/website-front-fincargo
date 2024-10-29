"use client";

import SectionHero from "@/components/Common/SectionHero";
import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/utils";
import SkeletonLoader from "@/components/SkeletonLoader";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHeroData = async () => {
      try {
        const response = await fetchAPI(
          "/api/hero-videos?filters[Page][$eq]=FreightForwarders&populate[Hero][populate]=Video"
        );
        if (response && response.data && response.data.length > 0) {
          setHeroData(response.data[0].Hero);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    getHeroData();
  }, []);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const videoUrl =
    heroData && heroData.Video && heroData.Video.url
      ? `${baseUrl}${heroData.Video.url}`
      : "";

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
        videoUrl={videoUrl}
        imageAlt="Image de logistique"
      />
    </>
  );
}
