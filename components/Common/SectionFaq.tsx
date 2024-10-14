"use client";

import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqProps {
  title: string;
  faqs: FAQItem[];
}

export default function SectionFaq({ title, faqs }: FaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Gérer l'ouverture/fermeture de l'accordéon
  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Fermer si déjà ouvert
    } else {
      setActiveIndex(index); // Ouvrir la nouvelle section
    }
  };

  return (
    <section className="py-32 xl:py-32 lg:py-38 md:py-24 sm:py-20 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <h4 className="text-gray-500 text-xl pb-8 text-center">
          Need some help ?
        </h4>
        <h2 className="text-7xl font-bold text-center text-blue-400 uppercase mb-10 tracking-wide">
          {title}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border-b-2 border-gray-300">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-4 py-4 flex justify-between items-center text-xl font-bold text-gray-900"
              >
                <span>{faq.question}</span>
                {/* Bouton "+" ou "-" avec background-color et border-radius */}
                <span
                  className={`flex items-center justify-center w-8 h-8 ${
                    activeIndex === index
                      ? "bg-blue-300 text-white"
                      : "bg-blue-400 text-white"
                  } rounded-full transition-all duration-200`}
                >
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="px-4 py-2 text-gray-700">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
