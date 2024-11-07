"use client";

import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

interface Card {
  id: number;
  Title: string;
  Content: string;
  Image: {
    url: string;
  };
}

interface SectionKeyFeatureProps {
  titleSection: string;
  cards: Card[];
}

export default function SectionKeyFeature({
  titleSection,
  cards = [],
}: SectionKeyFeatureProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  React.useEffect(() => {
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

    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="feature"
      className={`py-16 md:py-28 bg-gradient-to-b from-white to-gray-300 px-4 relative transform transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-bold text-darkBlue uppercase text-center mb-10 md:mb-20">
          {titleSection}
        </h2>

        <Swiper
          grabCursor
          centeredSlides
          slidesPerView={2}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
          }}
          effect="coverflow"
          loop
          pagination={{ clickable: true, el: ".custom-pagination" }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 2,
            slideShadows: true,
          }}
          modules={[Pagination, EffectCoverflow, Autoplay]}
          className="w-full max-w-7xl h-[500px]"
        >
          {cards.map((card) => {
            const imageUrl = card.Image.url.startsWith("http")
              ? card.Image.url
              : `${API_URL}${card.Image.url}`;

            return (
              <SwiperSlide
                key={card.id}
                className="relative flex items-end justify-center rounded-3xl overflow-hidden transition-transform transform hover:scale-105"
              >
                <Image
                  src={imageUrl}
                  alt={card.Title}
                  width={700}
                  height={700}
                  className="w-full h-full object-cover rounded-3xl absolute inset-0 -z-10"
                  unoptimized
                />
                <div className="absolute top-0 left-0 right-0 h-[16rem] pointer-events-none bg-gradient-to-b from-black/40 via-black/30 to-transparent backdrop-blur-sm"></div>

                <div className="relative z-20 w-full px-5">
                  <h2 className="relative text-center text-3xl md:text-5xl text-gray-100 py-10 tracking-wide">
                    {card.Title}
                  </h2>
                  <p className="relative text-lg text-gray-100 font-light">
                    {card.Content}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="custom-pagination text-center mt-4"></div>
      </div>
    </section>
  );
}
