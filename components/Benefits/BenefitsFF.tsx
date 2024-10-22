"use client";

import { useEffect, useState } from "react";
import SectionBenefits from "@/components/Common/SectionBenefits";
import { fetchAPI } from "@/lib/utils";

interface StrapiBenefit {
  id: number;
  Title: string;
  Paragraph: string;
  Image: {
    url: string;
  };
}

interface Benefit {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface SectionTitle {
  title: string;
  subtitle: string;
}

export default function BenefitsC() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [sectionTitle, setSectionTitle] = useState<SectionTitle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBenefits = async () => {
      try {
        const data = await fetchAPI("/api/benefit-ffs?populate=Image");
        const sectionTitleResponse = await fetchAPI("/api/benefits-section-ff");

        if (data && data.data) {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL;
          const formattedBenefits = data.data.map((item: StrapiBenefit) => ({
            id: item.id,
            image: `${baseUrl}${item.Image.url}`,
            title: item.Title,
            description: item.Paragraph,
          }));
          setBenefits(formattedBenefits);
        }

        if (sectionTitleResponse && sectionTitleResponse.data) {
          setSectionTitle({
            title: sectionTitleResponse.data.Title,
            subtitle: sectionTitleResponse.data.Subtitle,
          });
        }
      } catch (error) {
        console.error("Error fetching benefits:", error);
      } finally {
        setLoading(false);
      }
    };

    getBenefits();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (benefits.length === 0) {
    return <div>No benefits available.</div>;
  }

  return (
    <SectionBenefits
      title={sectionTitle?.title || ""}
      subtitle={sectionTitle?.subtitle || ""}
      benefits={benefits}
    />
  );
}
