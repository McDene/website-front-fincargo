"use client";

import SectionBenefits from "@/components/Common/SectionBenefits";

interface Card {
  id: number;
  Title: string;
  Content: string;
  Image: {
    url: string;
  };
}

interface Benefit {
  Title: string;
  Subtitle: string;
  Card: Card[];
}

interface BenefitData {
  id: number;
  Benefit: Benefit;
}

interface BenefitProps {
  benefitData: BenefitData | null;
}

const formatBenefitData = (benefitData: BenefitData | null) => {
  if (!benefitData || !Array.isArray(benefitData.Benefit.Card)) {
    return [];
  }

  return benefitData.Benefit.Card.map((card) => ({
    id: card.id,
    image:
      card.Image && card.Image.url
        ? card.Image.url.startsWith("http")
          ? card.Image.url
          : `${process.env.NEXT_PUBLIC_API_URL}${card.Image.url}`
        : "/images/truck_fincargo_carrier.jpeg",
    title: card.Title,
    description: card.Content,
  }));
};

export default function Benefit({ benefitData }: BenefitProps) {
  if (!benefitData || !Array.isArray(benefitData.Benefit.Card)) {
    return null;
  }

  const formattedBenefits = formatBenefitData(benefitData);

  return (
    <SectionBenefits
      title={benefitData.Benefit.Title}
      subtitle={benefitData.Benefit.Subtitle}
      benefits={formattedBenefits}
    />
  );
}
