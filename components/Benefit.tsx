"use client";

import SectionBenefits from "@/components/Common/SectionBenefits";

interface ContentItem {
  type: string;
  children: Array<{ text: string; type: string }>;
}

interface Card {
  id: number;
  Title: string;
  Subtitle: string;
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

export default function Benefit({ benefitData }: BenefitProps) {
  if (!benefitData || !Array.isArray(benefitData.Benefit.Benefit)) {
    return null;
  }

  const formattedBenefits = benefitData.Benefit.Benefit.map((card) => ({
    id: card.id,
    title: card.Title,
    subtitle: card.Subtitle,
    description: card.Content.map((content) =>
      content.children.map((child) => child.text).join(" ")
    ).join(" "),
  }));

  return (
    <SectionBenefits
      title={benefitData.Benefit.Title}
      subtitle={benefitData.Benefit.Subtitle}
      benefits={formattedBenefits}
    />
  );
}
