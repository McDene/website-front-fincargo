"use client";

import React, { useState, useEffect, useRef } from "react";

interface Benefit {
  id: number;
  title: string;
  subtitle: string | null;
  description: string;
}

interface SectionBenefitsProps {
  title: string;
  subtitle: string;
  benefits: Benefit[];
}

export default function SectionBenefits({
  title,
  subtitle,
  benefits,
}: SectionBenefitsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const getGridRows = (benefits: Benefit[]) => {
    const rows = [];
    let i = 0;

    while (i < benefits.length) {
      rows.push(benefits.slice(i, i + 3));
      i += 3;
    }

    return rows;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentContentRef = contentRef.current;
    if (currentContentRef) observer.observe(currentContentRef);

    return () => {
      if (currentContentRef) observer.unobserve(currentContentRef);
    };
  }, []);

  const rows = getGridRows(benefits);

  return (
    <section
      id="benefit"
      className="relative py-20 md:py-28 bg-gray-300 px-4 overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 h-full w-1/3 hidden md:block bg-no-repeat bg-cover opacity-10"
        style={{ backgroundImage: `url('/logo/logo_fincargo_blue.svg')` }}
      />
      <div
        ref={contentRef}
        className={`max-w-7xl mx-auto relative z-10 transition-transform duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <h2 className="text-6xl md:text-8xl font-bold text-darkBlue mb-3 uppercase tracking-wide">
          {title}
        </h2>
        <h3 className="text-2xl md:text-4xl text-lightBlue mb-10 md:mb-20">
          {subtitle}
        </h3>

        <div className="space-y-6">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-6 grid-cols-1 lg:grid-cols-12"
            >
              {row.map((benefit, index) => (
                <div
                  key={benefit.id}
                  className={`relative bg-white hover:bg-gray-100 rounded-3xl p-6 shadow-lg min-h-[250px] max-h-[250px] flex flex-col justify-start  transition-all duration-500 group overflow-hidden cursor-pointer ${
                    rowIndex % 2 === 0
                      ? "lg:col-span-4"
                      : index === 1
                      ? "lg:col-span-6"
                      : "lg:col-span-3"
                  }`}
                >
                  <h3 className="text-5xl text-gray-800 font-bold mb-2 transition-all duration-500 group-hover:text-3xl">
                    {benefit.title}
                  </h3>
                  {benefit.subtitle && (
                    <p className="text-xl text-gray-600 mb-2 transition-all duration-500 group-hover:text-base">
                      {benefit.subtitle}
                    </p>
                  )}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-500 ease-in-out">
                    <p className="text-gray-600 text-sm mt-2">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
