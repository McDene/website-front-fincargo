// "use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex justify-between items-center  bg-blue-950 py-16 px-8">
      {/* Section texte à gauche */}
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-neutral-50 mb-4">
            Bienvenue sur notre plateforme
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Nous facilitons le transport et la gestion logistique pour les
            carriers et freight forwarders. Découvrez comment Fincargo peut
            simplifier votre expérience.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            En savoir plus
          </button>
        </div>

        {/* Section image à droite */}
        <div className="flex-shrink-0">
          <Image
            src="/images/truck_fincargo_carrier.jpeg" // Remplace par le chemin vers ton image
            alt="Image de logistique"
            width={800} // Largeur de l'image
            height={400} // Hauteur de l'image
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
