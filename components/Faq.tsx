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
  /** Données côté Carriers */
  carrier?: FaqData | null;
  /** Données côté Forwarders & Shippers */
  freight?: FaqData | null;
}

/**
 * Wrapper : si les deux props sont fournies, on affiche le toggle intégré.
 * Sinon, on affiche la FAQ simple.
 */
export default function Faq({ carrier, freight }: FaqProps) {
  const toList = (data?: FaqData | null) =>
    data?.FAQ?.Accordion?.map((a) => ({
      id: a.id,
      question: a.Question,
      answer: a.Answer,
    })) ?? [];

  if (carrier && freight) {
    return (
      <SectionFaq
        groups={{
          carrier: {
            title: carrier.FAQ.Title,
            subtitle: carrier.FAQ.Subtitle,
            faqs: toList(carrier),
          },
          freight: {
            title: freight.FAQ.Title,
            subtitle: freight.FAQ.Subtitle,
            faqs: toList(freight),
          },
        }}
        initialAudience="carrier"
      />
    );
  }

  const single = carrier ?? freight ?? null;
  if (!single) return null;

  return (
    <SectionFaq
      title={single.FAQ.Title}
      subtitle={single.FAQ.Subtitle}
      faqs={toList(single)}
    />
  );
}
