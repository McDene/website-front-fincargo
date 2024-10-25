import Header from "@/components/Header/Main";
import HeroC from "@/components/Hero/HeroC";
import BenefitC from "@/components/Benefit/BenefitC";
import FaqC from "@/components/FAQs/FaqC";
import Footer from "@/components/Footer";
import FeatureC from "@/components/Feature/FeatureC";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
};

export default function Home() {
  return (
    <>
      <Header />
      <HeroC />
      <FeatureC />
      <BenefitC />
      <FaqC />
      <Footer />
    </>
  );
}
