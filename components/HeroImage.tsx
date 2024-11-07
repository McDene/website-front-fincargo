"use client";

import SectionHeroImage from "@/components/Common/SectionHeroImage";

interface HeroImageData {
  Title: string;
  SecondeTitle: string;
  Paragraph: string;
  ButtonText: string;
  ButtonLink?: string | null;
  Image: {
    url: string;
  };
}

interface HeroImageProps {
  heroImageData: HeroImageData;
}

export default function HeroImage({ heroImageData }: HeroImageProps) {
  const imageUrl = heroImageData?.Image?.url?.startsWith("http")
    ? heroImageData.Image.url
    : `${process.env.NEXT_PUBLIC_API_URL || ""}${
        heroImageData?.Image?.url || ""
      }`;

  return (
    <SectionHeroImage
      title={heroImageData.Title}
      subtitle={heroImageData.SecondeTitle}
      paragraph={heroImageData.Paragraph}
      buttonText={heroImageData.ButtonText}
      buttonLink={heroImageData.ButtonLink}
      imageUrl={imageUrl}
      imageAlt="Image de logistique"
    />
  );
}
