import SectionHero from "@/components/Common/SectionHero";

interface HeroData {
  Title: string;
  Paragraph: string;
  ButtonText: string;
  ButtonLink: string;
  Video: {
    url: string;
  };
}

import type { Region } from "@/lib/i18n";

interface HeroProps {
  heroData: HeroData | null;
  region?: Region;
}

export default function Hero({ heroData, region = 'global' }: HeroProps) {
  const videoUrl = heroData?.Video?.url?.startsWith("http")
    ? heroData.Video.url
    : `${process.env.NEXT_PUBLIC_API_URL || ""}${heroData?.Video?.url || ""}`;

  if (!heroData) {
    return null;
  }

  return (
    <SectionHero
      title={heroData.Title}
      paragraph={heroData.Paragraph}
      buttonLink={heroData.ButtonLink}
      buttonText={heroData.ButtonText}
      videoUrl={videoUrl}
      imageAlt="Image de logistique"
      region={region}
    />
  );
}
