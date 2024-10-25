"use client";

import { useEffect, useState } from "react";
import SectionBenefits from "@/components/Common/SectionBenefits";
import { fetchAPI } from "@/lib/utils";

interface Card {
  id: number;
  Title: string;
  Content: string;
  Image: {
    url: string;
  };
}

interface BenefitData {
  id: number;
  Benefit: {
    Title: string;
    Subtitle: string;
    Card: Card[];
  };
}

const formatBenefitData = (benefitData: BenefitData | null) => {
  if (
    !benefitData ||
    !benefitData.Benefit ||
    !Array.isArray(benefitData.Benefit.Card)
  ) {
    return [];
  }

  return benefitData.Benefit.Card.map((card) => ({
    id: card.id,
    image: `${process.env.NEXT_PUBLIC_API_URL}${card.Image.url}`,
    title: card.Title,
    description: card.Content,
  }));
};

export default function BenefitsLP() {
  const [benefitData, setBenefitData] = useState<BenefitData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBenefitData = async () => {
      try {
        const data = await fetchAPI(
          "/api/benefit-lp?populate[Benefit][populate][Card][populate]=Image"
        );
        if (data && data.data) {
          setBenefitData(data.data);
        }
      } catch (error) {
        console.error("Error fetching benefits:", error);
      } finally {
        setLoading(false);
      }
    };

    getBenefitData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (
    !benefitData ||
    !benefitData.Benefit ||
    !Array.isArray(benefitData.Benefit.Card)
  ) {
    return <div>No data available</div>;
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
