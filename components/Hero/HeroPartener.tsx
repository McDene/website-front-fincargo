"use client";

import SectionHeroImage from "@/components/Common/SectionHeroImage";
import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/utils";
import SkeletonLoader from "@/components/SkeletonLoader";

interface Image {
  id: number;
  url: string;
}

interface HeroData {
  Title: string;
  SecondeTitle: string;
  Paragraph: string;
  ButtonText: string;
  ButtonLink: string | null;
  Image: Image;
}

export default function HeroPartener() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHeroData = async () => {
      try {
        const response = await fetchAPI(
          "/api/hero-images?filters[Page][$eq]=Partener&populate[Hero][populate]=Image"
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
  const imageUrl =
    heroData && heroData.Image && heroData.Image.url
      ? `${baseUrl}${heroData.Image.url}`
      : "";

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!heroData) {
    return <div>No hero data available.</div>;
  }

  return (
    <SectionHeroImage
      title={heroData.Title}
      subtitle={heroData.SecondeTitle}
      paragraph={heroData.Paragraph}
      buttonText={heroData.ButtonText}
      buttonLink={heroData.ButtonLink}
      imageUrl={imageUrl}
      imageAlt="Image de logistique"
    />
  );
}
