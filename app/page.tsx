import HeroC from "@/components/Hero/HeroC";
import WhatIsFincargo from "@/components/WhatIsFincargo";
import BenefitsC from "@/components/Benefits/BenefitsC";
import FaqC from "@/components/FAQs/FaqC";
import Footer from "@/components/Footer";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <HeroC />
      <WhatIsFincargo />
      <BenefitsC />
      <FaqC />
      <Footer />
    </>
  );
}
