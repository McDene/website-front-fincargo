"use client";

import SectionFaq from "@/components/Common/SectionFaq";
import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/utils";

interface Accordion {
  id: number;
  Question: string;
  Answer: string;
}

interface FaqData {
  id: number;
  FAQ: {
    Title: string;
    Subtitle: string;
    Accordion: Accordion[];
  };
}

export default function FaqFF() {
  const [faqData, setFaqData] = useState<FaqData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFaqData = async () => {
      try {
        const response = await fetchAPI(
          "/api/faqs?filters[Page][$eq]=FreightForwarder&populate[FAQ][populate]=Accordion"
        );

        if (response && response.data && response.data.length > 0) {
          setFaqData(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    getFaqData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!faqData || !faqData.FAQ || !Array.isArray(faqData.FAQ.Accordion)) {
    return <div>No data available</div>;
  }

  const formattedFaqs = faqData.FAQ.Accordion.map((accordion) => ({
    id: accordion.id,
    question: accordion.Question,
    answer: accordion.Answer,
  }));

  return (
    <SectionFaq
      title={faqData.FAQ.Title}
      subtitle={faqData.FAQ.Subtitle}
      faqs={formattedFaqs}
    />
  );
}
