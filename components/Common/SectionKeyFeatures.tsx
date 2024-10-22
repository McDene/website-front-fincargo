"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carouselFeatures";

interface Card {
  title: string;
  description: string;
  image: string;
}

const fetchData = (): Promise<Card[]> => {
  return Promise.resolve([
    {
      title: "Instant Verification Process",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "/images/fingarco_TRUST.jpg",
    },
    {
      title: "Fast Shipping",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/images/fincargo_payment_in_hours.jpg",
    },
    {
      title: "Reliable Service",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/images/truck_fincargo_carrier.jpeg",
    },
    {
      title: "24/7 Customer Support",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/images/truck_fincargo_freightforwarder.jpg",
    },
    {
      title: "Secure Payment",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      image: "/images/fingarco_TRUST.jpg",
    },
  ]);
};

export default function CarouselSize() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    fetchData().then((data) => {
      setCards(data);
    });

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

    const currentTitleRef = titleRef.current; // Capture de la référence locale

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
    <>
      <section
        id="whatisfincargo"
        className="py-36 xl:py-36 lg:py-36 md:py-28 sm:py-24 bg-white px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            ref={titleRef}
            className={`text-5xl md:text-6xl font-bold text-black uppercase text-center mb-14 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            Features
          </h2>

          <div className="grid grid-cols-1 gap-6">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full relative"
            >
              <CarouselContent>
                {cards.map((card, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <div
                        className={`relative bg-gray-100 rounded-3xl overflow-hidden shadow-md transform transition-transform duration-500 min-h-[500px]`}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${card.image})`,
                          }}
                        ></div>

                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-200 opacity-70"></div>

                        <div className="relative p-6 ">
                          <h3 className="text-4xl text-blue-950 font-semibold mb-2">
                            {card.title}
                          </h3>
                          <p className="text-gray-900 font-semibold">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}
