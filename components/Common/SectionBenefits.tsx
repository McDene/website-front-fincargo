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

  // const getGridRows = (benefits: Benefit[]) => {
  //   const rows = [];
  //   let i = 0;

  //   while (i < benefits.length) {
  //     rows.push(benefits.slice(i, i + 3));
  //     i += 3;
  //   }

  //   return rows;
  // };

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

  // const rows = getGridRows(benefits);

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

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="relative bg-white hover:bg-gray-100 rounded-3xl p-6 shadow-lg min-h-[370px] flex flex-col justify-start transition-all duration-500 group overflow-hidden cursor-pointer"
            >
              <h3 className="text-4xl md:text-5xl text-darkBlue font-bold mb-2 transition-all duration-500 group-hover:text-2xl group-hover:mb-1">
                {benefit.title}
              </h3>

              {benefit.subtitle && (
                <h3 className="text-xl md:text-2xl text-gray-800 mb-2 transition-all duration-500 group-hover:text-lg group-hover:mb-1">
                  {benefit.subtitle}
                </h3>
              )}
              <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                <p className="text-gray-600 text-sm mt-2">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
