"use client";

import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqProps {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
}

export default function SectionFaq({ title, subtitle, faqs }: FaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 bg-white px-6">
      <div className="max-w-5xl mx-auto">
        <h4 className="text-lightBlue text-lg sm:text-xl text-center font-semibold mb-4">
          {subtitle}
        </h4>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-darkBlue mb-10 uppercase tracking-wide">
          {title}
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="rounded-3xl transition-all duration-300 bg-white overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center text-lg md:text-xl font-semibold text-darkBlue hover:text-blue-950 hover:bg-blue-50 transition duration-300"
              >
                <span>{faq.question}</span>
                <span
                  className={`flex items-center justify-center w-8 h-8 ${
                    activeIndex === index
                      ? "bg-blue-400 text-white"
                      : "bg-blue-300 text-white"
                  } rounded-full transition-all duration-300 transform ${
                    activeIndex === index ? "rotate-45" : ""
                  }`}
                >
                  {activeIndex === index ? "+" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-screen py-4 px-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
