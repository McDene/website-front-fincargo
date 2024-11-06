import React from "react";

const benefits = [
  { title: "Benefit 1", content: "Description of benefit 1." },
  { title: "Benefit 2", content: "Description of benefit 2." },
  { title: "Benefit 3", content: "Description of benefit 3." },
  { title: "Benefit 4", content: "Description of benefit 4." },
  { title: "Benefit 5", content: "Description of benefit 5." },
];

export const BenefitsSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Benefits
        </h2>
        <div className="grid gap-6">
          {/* Première ligne - 3 colonnes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.slice(0, 3).map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.content}</p>
              </div>
            ))}
          </div>

          {/* Deuxième ligne - 2 colonnes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {benefits.slice(3, 5).map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
