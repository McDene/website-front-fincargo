"use client";

import SectionHero from "@/components/Common/SectionHero";
import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/utils";
import SkeletonLoader from "@/components/SkeletonLoader";

interface HeroData {
  Title: string;
  Paragraph: string;
  ButtonText: string;
  Image: {
    url: string;
  };
}

export default function HeroC() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHeroData = async () => {
      try {
        const response = await fetchAPI("/api/hero?populate=Image");
        if (response && response.data) {
          setHeroData(response.data.attributes);
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
  const imageUrl = heroData ? `${baseUrl}${heroData.Image.url}` : "";

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!heroData) {
    return <div>No hero data available.</div>;
  }

  return (
    <SectionHero
      title={heroData.Title}
      paragraph={heroData.Paragraph}
      buttonText={heroData.ButtonText}
      imageUrl={imageUrl}
      imageAlt="Image de logistique"
    />
  );
}