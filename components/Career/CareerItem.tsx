"use client";

export default function CareerItem() {
  const jobTitle = "B2B Marketing Manager - CEE";
  const email = "example@example.com";

  return (
    <>
      <section className="py-24 xl:py-32 lg:py-38 md:py-24 sm:py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="pb-10">
            <h2 className="text-7xl font-semibold uppercase mb-1 tracking-wide flex justify-center">
              {jobTitle}
            </h2>
          </div>
          <span className="text-gray-600 text-lg flex justify-center">
            On site : Sion
          </span>

          {/* Bouton de postulation utilisant un lien mailto */}
          <div className="flex justify-center mt-8">
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(
                `Candidature pour le poste : ${jobTitle}`
              )}`}
              target="_blank"
              className="bg-blue-950 text-white px-6 py-3 border-2 border-blue-950 rounded-3xl font-semibold hover:bg-blue-900 hover:border-blue-900 transition duration-300"
            >
              Postuler
            </a>
          </div>

          <div className="prose prose-lg mt-8">
            <h3 className="text-2xl font-bold">Description du Poste</h3>
            <p>
              Vous êtes passionné par le marketing B2B et souhaitez contribuer à
              l expansion de notre entreprise dans la région CEE Europe centrale
              et orientale. Nous recherchons un B2B Marketing Manager
              expérimenté pour rejoindre notre équipe dynamique à Sion.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
