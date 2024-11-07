"use client";

import SectionFaq from "@/components/Common/SectionFaq";

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

interface FaqProps {
  faqData: FaqData | null;
}

export default function Faq({ faqData }: FaqProps) {
  if (!faqData || !faqData.FAQ || !Array.isArray(faqData.FAQ.Accordion)) {
    return null;
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
