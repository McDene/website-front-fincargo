"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"; // Import des icônes

const cards = [
  {
    image: "/images/Fincargo_don_t_spend_time checking_bank_account.jpg",
    title: "Your transportation invoices paid in hours, not weeks",
    description:
      "Waiting 30, 60, or even 90 days for payment can damage your cash flow. Our factoring platform ensures that you get paid within 48 hours for your selected transactions once the documents are validated, so you are ready to take on the next job.",
  },
  {
    image: "/images/fincargo_payment_in_hours.jpg",
    title: "Improve your cash flow with fast payments",
    description:
      "By partnering with our platform, you will see quicker payments, helping you better manage your operations and grow your business.",
  },
  {
    image: "/images/fingarco_TRUST.jpg",
    title: "Simple, fast, and reliable transactions",
    description:
      "Our platform is designed to simplify the payment process so you can focus on your core business operations.",
  },
];

export default function BenefitsC() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section
      id="features"
      className="py-32 xl:py-32 lg:py-38 md:py-24 sm:py-20 bg-black px-4"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Titre de la section */}
        <h2 className="text-7xl font-bold text-gray-50 mb-3 uppercase tracking-wide">
          Benefits
        </h2>
        <h3 className="text-3xl font-bold text-gray-500 mb-12">
          Have more cash to operate and grow your business.
        </h3>

        {/* Carrousel */}
        <div className="relative">
          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="min-w-full flex flex-col md:flex-row items-center gap-8"
                >
                  {/* Image à gauche */}
                  <div className="flex-shrink-0 md:w-1/2 w-full">
                    <Image
                      src={card.image}
                      alt="Feature"
                      width={700}
                      height={700}
                      className="w-full object-cover rounded-3xl"
                    />
                  </div>

                  {/* Texte à droite */}
                  <div className="md:w-1/2 w-full p-6">
                    <span className="text-gray-500 text mb-6">
                      {currentIndex + 1}/{cards.length}
                    </span>
                    <h4 className="text-2xl font-bold text-blue-400 mb-5">
                      {card.title}
                    </h4>
                    <p className="text-gray-50 leading-8">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons de navigation avec icônes et positionnement */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-8 z-50">
            <button
              onClick={handlePrev}
              className="bg-black transition duration-300 hover:bg-gray-900 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center"
              style={{ left: "-30px", position: "absolute" }}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="bg-black transition duration-300 hover:bg-gray-900 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center"
              style={{ right: "-30px", position: "absolute" }}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
