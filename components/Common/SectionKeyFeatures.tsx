"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carouselFeatures";

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
      id="whatisfincargo"
      className="py-36 xl:py-36 lg:py-36 md:py-28 sm:py-24 bg-white px-4"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className={`text-5xl md:text-6xl font-bold text-black uppercase text-center mb-14 transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {titleSection}
        </h2>

        <div className="grid grid-cols-1 gap-6">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full relative"
          >
            <CarouselContent>
              {cards.length > 0 ? (
                cards.map((card) => (
                  <CarouselItem
                    key={card.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <div
                        className={`relative bg-gray-100 rounded-3xl overflow-hidden shadow-md transform transition-transform duration-500 min-h-[500px]`}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${
                              card.Image.url.startsWith("http")
                                ? card.Image.url
                                : `${API_URL}${card.Image.url}`
                            })`,
                          }}
                        ></div>

                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-200 opacity-70"></div>

                        <div className="relative p-6 ">
                          <h3 className="text-4xl text-blue-950 font-semibold mb-2">
                            {card.Title}
                          </h3>
                          <p className="text-gray-900 font-semibold">
                            {card.Content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <p>No cards available</p>
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
