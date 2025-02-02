"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface ContentItem {
  id: number;
  Title: string;
  Content: string;
  Image: {
    id: number;
    url: string;
    alternativeText: string | null;
  };
}

interface ProtectionPolicyCProps {
  carrierProtectionPolicyData: {
    id: number;
    Content: ContentItem[];
  };
}

export default function ProtectionPolicyC({
  carrierProtectionPolicyData,
}: ProtectionPolicyCProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textSectionRef = useRef<HTMLDivElement>(null);

  // Fonction pour mettre à jour les références des images
  const setImageRef = (index: number, el: HTMLDivElement | null) => {
    imageRefs.current[index] = el;
  };

  // Logique pour le mode desktop avec IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 1 }
    );

    const currentImageRefs = imageRefs.current;
    currentImageRefs.forEach((image) => {
      if (image) observer.observe(image);
    });

    return () => {
      currentImageRefs.forEach((image) => {
        if (image) observer.unobserve(image);
      });
    };
  }, []);

  const activeContent = carrierProtectionPolicyData.Content[activeIndex];

  return (
    <div className="bg-gradient-to-b from-gray-300 to-white min-h-screen">
      {/* Version desktop */}
      <div className="hidden md:block">
        <section className="relative max-w-7xl mx-auto flex flex-col md:flex-row h-auto px-8 py-20">
          <div className="w-3/5 flex flex-col space-y-10 py-10 md:py-20">
            {carrierProtectionPolicyData.Content.map((item, index) => (
              <div
                key={item.id}
                data-index={index}
                ref={(el) => setImageRef(index, el)}
                className="min-h-[40vh] md:min-h-[70vh] flex items-center justify-center"
              >
                <Image
                  src={item.Image.url}
                  alt={item.Image.alternativeText || "Illustration"}
                  width={300}
                  height={300}
                  className="w-full object-cover rounded-3xl"
                  unoptimized
                />
              </div>
            ))}
          </div>

          <div
            className="w-full md:w-3/5 sticky top-20 h-auto md:h-[80vh] flex flex-col justify-center pl-16 text-left"
            ref={textSectionRef}
          >
            <h2 className="text-5xl text-darkBlue mb-6">
              {activeContent.Title}
            </h2>
            <p className="text-xl text-gray-700 px-0">
              {activeContent.Content}
            </p>
          </div>
        </section>
      </div>

      {/* Version mobile */}
      <div className="block md:hidden">
        <section className="relative max-w-7xl mx-auto flex flex-col h-auto px-4 py-16 space-y-10">
          {carrierProtectionPolicyData.Content.map((item) => (
            <div key={item.id} className="flex flex-col items-center space-y-5">
              <h2 className="text-4xl text-darkBlue mb-4 ">{item.Title}</h2>
              <Image
                src={item.Image.url}
                alt={item.Image.alternativeText || "Illustration"}
                width={200}
                height={200}
                className="w-full h-auto object-cover rounded-3xl"
                unoptimized
              />
              <p className="text-lg text-gray-700 pb-10 px-4">{item.Content}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
