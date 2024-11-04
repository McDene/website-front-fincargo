"use client";

import SectionHeroImage from "@/components/Common/SectionHeroImage";

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

interface HeroAboutProps {
  heroData: HeroData | null;
}

export default function HeroAbout({ heroData }: HeroAboutProps) {
  if (!heroData) return null;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageUrl = heroData.Image.url.startsWith("http")
    ? heroData.Image.url
    : `${baseUrl}${heroData.Image.url}`;

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
