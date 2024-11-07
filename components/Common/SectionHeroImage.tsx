"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface SectionHeroImageProps {
  title: string;
  subtitle: string;
  paragraph: string;
  buttonText: string;
  buttonLink?: string | null;
  imageUrl: string;
  imageAlt: string;
}

export default function SectionHeroImage({
  title,
  subtitle,
  paragraph,
  buttonText,
  buttonLink,
  imageUrl,
  imageAlt,
}: SectionHeroImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

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
    if (currentContentRef) observer.observe(currentContentRef);

    return () => {
      if (currentContentRef) observer.unobserve(currentContentRef);
    };
  }, []);

  return (
    <section className="relative flex items-start min-h-screen py-32 xl:py-32 lg:py-38 md:py-24 sm:py-20 overflow-hidden">
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={1920}
        height={1080}
        unoptimized
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-blue-800 opacity-30 z-0"></div>
      <div
        className="flex flex-col max-w-7xl justify-center m-auto mt-[40px] w-full"
        ref={contentRef}
      >
        <div
          className={`relative z-10 flex justify-start px-4 sm:px-6 lg:px-8 transition-transform duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="max-w-7xl mb-10">
            <h2 className="text-4xl md:text-5xl text-gray-200 font-bold mb-3 pb-10">
              {title}
            </h2>
            <h1 className="text-5xl md:text-9xl uppercase font-bold text-start text-white">
              {subtitle}
            </h1>
          </div>
        </div>

        <div
          className={`relative z-10 flex justify-start px-4 sm:px-6 lg:px-8 transition-transform duration-1000 ease-out delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="max-w-xl mb-10">
            <p className="text-lg md:text-xl text-white font-medium mb-6 leading-8">
              {paragraph}
            </p>
          </div>
        </div>

        {buttonLink && (
          <div
            className={`relative z-10 flex justify-start px-4 sm:px-6 lg:px-8 transition-transform duration-1000 ease-out delay-400 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <a href={buttonLink}>
              <button className="bg-blue-400 text-white px-6 py-3 border-2 border-blue-400 rounded-3xl font-semibold hover:bg-blue-500 hover:border-blue-500 transition duration-300">
                {buttonText}
              </button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
