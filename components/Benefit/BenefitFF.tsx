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

interface Benefit {
  Title: string;
  Subtitle: string;
  Card: Card[];
}

interface BenefitData {
  id: number;
  Benefit: Benefit;
}

const formatBenefitData = (benefitData: BenefitData | null) => {
  if (!benefitData || !Array.isArray(benefitData.Benefit.Card)) {
    return [];
  }

  return benefitData.Benefit.Card.map((card) => ({
    id: card.id,
    image: card.Image.url.startsWith("http")
      ? card.Image.url
      : `${process.env.NEXT_PUBLIC_API_URL}${card.Image.url}`,
    title: card.Title,
    description: card.Content,
  }));
};

export default function BenefitsC() {
  const [benefitData, setBenefitData] = useState<BenefitData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBenefitData = async () => {
      try {
        const response = await fetchAPI(
          "/api/benefits?filters[Page][$eq]=FreightForwarders&populate[Benefit][populate][Card][populate]=Image"
        );

        if (response && response.data && response.data.length > 0) {
          setBenefitData(response.data[0]);
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

  if (!benefitData || !Array.isArray(benefitData.Benefit.Card)) {
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
