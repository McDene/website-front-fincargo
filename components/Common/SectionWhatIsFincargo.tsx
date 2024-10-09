"use client";

import { useState, useEffect, useRef } from "react";

interface SectionWhatIsFincargoProps {
  title: string;
  paragraph: string;
}

export default function SectionWhatIsFincargo({
  title,
  paragraph,
}: SectionWhatIsFincargoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="whatisfincargo"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-100 px-4"
    >
      <div
        className={`max-w-7xl mx-auto transform transition-all duration-1000 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-4xl font-bold text-blue-950 text-center mb-8">
          {title}
        </h2>

        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
          {paragraph}
        </p>
      </div>
    </section>
  );
}
