import SectionHero from "@/components/Common/SectionHero";

interface HeroData {
  Title: string;
  Paragraph: string;
  ButtonText: string;
  Video: {
    url: string;
  };
}

interface HeroProps {
  heroData: HeroData | null;
}

export default function Hero({ heroData }: HeroProps) {
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
      buttonText={heroData.ButtonText}
      videoUrl={videoUrl}
      imageAlt="Image de logistique"
    />
  );
}
