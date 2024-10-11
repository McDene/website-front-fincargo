import Hero from "@/components/Hero";
import WhatIsFincargo from "@/components/WhatIsFincargo";
import BenefitsC from "@/components/Benefits/BenefitsC";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsFincargo />
      <BenefitsC />
      <section id="prerequis" className="py-16">
        <h2 className="text-2xl font-bold">Prérequis</h2>
        <p>Voici les prérequis pour être un carrier chez nous.</p>
      </section>

      <section id="fincargo" className="py-16">
        <h2 className="text-2xl font-bold">Qu’est-ce que Fincargo</h2>
        <p>Fincargo est une plateforme pour gérer votre logistique.</p>
      </section>

      <section id="aide" className="py-16">
        <h2 className="text-2xl font-bold">Aide</h2>
        <p>Besoin daide ? Voici les informations.</p>
      </section>
    </>
  );
}
