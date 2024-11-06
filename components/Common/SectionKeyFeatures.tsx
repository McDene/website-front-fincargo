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
  const titleRef = React.useRef<HTMLHeadingElement | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.8 }
    );

    const currentTitleRef = titleRef.current;

    if (currentTitleRef) {
      observer.observe(currentTitleRef);
    }

    return () => {
      if (currentTitleRef) {
        observer.unobserve(currentTitleRef);
      }
    };
  }, []);

  return (
    <section
      id="feature"
      className="py-24 bg-gradient-to-b from-white to-gray-300 px-4 relative"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className={`text-5xl md:text-6xl font-bold text-darkBlue uppercase text-center mb-20 transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {titleSection}
        </h2>

        <Swiper
          grabCursor
          centeredSlides
          slidesPerView={2}
          effect="coverflow"
          loop
          pagination={{ clickable: true }}
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
                className="relative flex items-end justify-center rounded-3xl overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              >
                <Image
                  src={imageUrl}
                  alt={card.Title}
                  width={700}
                  height={700}
                  className="w-full h-full object-cover rounded-3xl absolute inset-0 -z-10"
                  unoptimized
                />

                {/* Gradient Blur Overlay for Smooth Transition */}
                <div className="absolute top-0 left-0 right-0 h-2/5 pointer-events-none bg-gradient-to-b from-black/40 via-black/10 to-transparent backdrop-blur-sm"></div>

                {/* Text Overlay */}
                <div className="relative z-20 text-center text-white w-full px-2">
                  <h2 className="relative text-4xl text-darkBlue py-10 font-semibold tracking-wide mb-1 text-gold">
                    {card.Title}
                  </h2>
                  <p className="relative text-xl text-gray-100 font-light">
                    {card.Content}
                  </p>
                </div>

                {/* Border Effect */}
                <div className="absolute  opacity-75 shadow-lg"></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
