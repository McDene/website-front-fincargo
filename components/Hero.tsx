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
  videoOverride?: string;
}

export default function Hero({ heroData, region = 'global', videoOverride }: HeroProps) {
  const videoUrl = videoOverride ?? [
    "/videos/Moving Vessel.mp4",
    "/videos/fincargo_freight_forwader_1.mp4",
  ];

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
