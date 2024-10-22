import Header from "@/components/Header/Main";
import HeroC from "@/components/Hero/HeroC";
import BenefitsC from "@/components/Benefits/BenefitsC";
import FaqC from "@/components/FAQs/FaqC";
import Footer from "@/components/Footer";
import SectionKeyFeatures from "@/components/Common/SectionKeyFeatures";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Header />
      <HeroC />
      <SectionKeyFeatures />
      <BenefitsC />
      <FaqC />
      <Footer />
    </>
  );
}
