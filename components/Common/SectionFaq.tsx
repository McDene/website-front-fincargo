"use client";

import React, { useState, useEffect, useRef } from "react";

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
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const currentContentRef = contentRef.current;

    if (currentContentRef) {
      observer.observe(currentContentRef);
    }

    return () => {
      if (currentContentRef) {
        observer.unobserve(currentContentRef);
      }
    };
  }, []);

  return (
    <section id="faqs" className="pt-20 pb-28 md:py-28 bg-white px-6">
      <div
        ref={contentRef}
        className={`max-w-5xl mx-auto transition-transform duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <h4 className="text-lightBlue text-lg sm:text-2xl text-center mb-4">
          {subtitle}
        </h4>
        <h2 className="text-5xl md:text-8xl font-bold text-center text-darkBlue mb-10 md:mb-20 uppercase tracking-wide">
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
                className="w-full text-left px-4 py-4 flex justify-between items-center text-lg md:text-3xl font-semibold text-darkBlue hover:text-blue-950 hover:bg-blue-50 transition duration-300"
              >
                <span>{faq.question}</span>
                <span
                  className={`flex items-center justify-center w-12 h-12 ${
                    activeIndex === index ? "text-gray-900" : "text-gray-400"
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
                <p className="text-gray-600 text-base md:text-xl leading-relaxed">
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
