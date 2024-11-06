import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

interface Benefit {
  id: number;
  image: string;
  title: string;
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    setCurrentIndex(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, onSelect]);

  return (
    <section
      id="benefit"
      className="py-32 xl:py-32 lg:py-38 md:py-24 sm:py-20  bg-gray-300  px-4"
    >
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-5xl md:text-7xl font-bold text-darkBlue mb-3 uppercase tracking-wide">
          {title}
        </h2>
        <h3 className="text-2xl  md:text-3xl font-bold text-gray-700 mb-12">
          {subtitle}
        </h3>

        <Carousel setApi={setCarouselApi} className="w-full">
          <CarouselContent>
            {benefits.map((benefit) => (
              <CarouselItem
                key={benefit.id}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="flex-shrink-0 md:w-1/2 w-full">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    width={700}
                    height={700}
                    className="w-full object-cover rounded-3xl"
                    unoptimized
                  />
                </div>

                <div className="md:w-1/2 w-full p-6">
                  <span className="text-gray-500 mb-6">
                    {currentIndex + 1}/{benefits.length}
                  </span>
                  <h4 className="text-2xl font-bold text-darkBlue mb-5">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-700 leading-8">
                    {benefit.description}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
