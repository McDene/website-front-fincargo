"use client";

import { useState, useEffect, useRef } from "react";

interface SectionHeroProps {
  title: string;
  paragraph: string;
  buttonText: string;
  buttonLink: string;
  videoUrl: string;
  imageAlt: string;
}

export default function SectionHero({
  title,
  paragraph,
  buttonText,
  buttonLink,
  videoUrl,
}: SectionHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

    const currentTitleRef = titleRef.current;
    const currentTextRef = textRef.current;
    const currentButtonRef = buttonRef.current;

    console.log(buttonLink);

    if (currentTitleRef) observer.observe(currentTitleRef);
    if (currentTextRef) observer.observe(currentTextRef);
    if (currentButtonRef) observer.observe(currentButtonRef);

    return () => {
      if (currentTitleRef) observer.unobserve(currentTitleRef);
      if (currentTextRef) observer.unobserve(currentTextRef);
      if (currentButtonRef) observer.unobserve(currentButtonRef);
    };
  }, []);

  return (
    <section className="relative flex items-start min-h-screen py-32 xl:py-32 lg:py-38 md:py-24 sm:py-20 overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-30 z-0 overflow-hidden"></div>

      <div className="flex flex-col max-w-7xl justify-center m-auto md:mt-[100px] mt-[10px] w-full">
        <div
          ref={titleRef}
          className={`relative z-10 flex justify-start px-4 sm:px-6 lg:px-8 transition-transform duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="max-w-7xl mb-6">
            <h1 className="text-4xl md:text-8xl uppercase font-bold text-start text-white">
              {title}
            </h1>
          </div>
        </div>

        <div
          ref={textRef}
          className={`relative z-10 flex justify-start px-4 sm:px-6 lg:px-8 transition-transform duration-1000 ease-out delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-10">
            <p className="text-xl md:text-3xl text-white font-medium mb-2 md:mb-6 leading-8">
              {paragraph}
            </p>
          </div>
        </div>

        <div
          className={`relative z-10 flex justify-start px-4 md:px-8 transition-transform duration-1000 ease-out delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <a href={buttonLink} target="_blank">
            <button className="mt-0 md:mt-6 px-6 py-3 bg-lightBlue text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-darkBlue">
              {buttonText}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
