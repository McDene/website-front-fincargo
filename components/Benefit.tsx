"use client";

import SectionBenefits from "@/components/Common/SectionBenefits";

interface ContentItem {
  type: string;
  children: Array<{ text: string; type: string }>;
}

interface Card {
  id: number;
  Title: string;
  Content: ContentItem[];
}

interface Benefit {
  Title: string;
  Subtitle: string;
  Benefit: Card[];
}

interface BenefitData {
  id: number;
  Benefit: Benefit;
}

interface BenefitProps {
  benefitData: BenefitData | null;
}

const formatBenefitData = (benefitData: BenefitData | null) => {
  if (!benefitData || !Array.isArray(benefitData.Benefit.Benefit)) {
    return [];
  }

  return benefitData.Benefit.Benefit.map((card) => ({
    id: card.id,
    title: card.Title || "Default Title", // Provide a default title if Title is missing
    description: card.Content
      ? card.Content.map((content) =>
          content.children.map((child) => child.text).join(" ")
        ).join(" ")
      : "No content available", // Provide default content if Content is missing
  }));
};

export default function Benefit({ benefitData }: BenefitProps) {
  if (!benefitData || !Array.isArray(benefitData.Benefit.Benefit)) {
    console.warn("Benefit data is missing or incorrectly formatted.");
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
