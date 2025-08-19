"use client";

import { useEffect, useState, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Main";
import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";
import SectionBenefits from "@/components/Common/SectionProvenResults";
import SectionFeatures from "@/components/Common/SectionFeatures";
import SectionPricing from "@/components/Common/SectionPricing";
import SectionDemo from "@/components/Common/SectionDemo";

export default function Home() {
  const { language } = useContext(LanguageContext);
  const [heroData, setHeroData] = useState<any>(null);
  const [faqDataCarrier, setFaqDataCarrier] = useState<any>(null);
  const [faqDataFreight, setFaqDataFreight] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => setShowLoader(true), 500);

    const fetchData = async () => {
      try {
        const [heroResponse, faqCarrierRes, faqFreightRes] = await Promise.all([
          fetchAPI(
            "/api/hero-videos?filters[Page][$eq]=Carriers&populate[Hero][populate]=Video",
            language
          ),
          fetchAPI(
            "/api/faqs?filters[Page][$eq]=Carrier&populate[FAQ][populate]=Accordion",
            language
          ),
          fetchAPI(
            "/api/faqs?filters[Page][$eq]=FreightForwarder&populate[FAQ][populate]=Accordion",
            language
          ),
        ]);

        setHeroData(heroResponse?.data?.[0]?.Hero || null);
        setFaqDataCarrier(faqCarrierRes?.data?.[0] || null);
        setFaqDataFreight(faqFreightRes?.data?.[0] || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        clearTimeout(loaderTimeout);
        setLoading(false);
      }
    };

    fetchData();
    return () => clearTimeout(loaderTimeout);
  }, [language]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#faqs") {
      document.getElementById("faqs")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  if (loading && showLoader) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  return (
    !loading && (
      <>
        <Header />
        {heroData && <Hero heroData={heroData} />}
        <SectionFeatures />
        <SectionBenefits />
        <SectionPricing />
        <SectionDemo />
        {/* Toggle intégré dans Faq si les deux datasets sont fournis */}
        <Faq carrier={faqDataCarrier} freight={faqDataFreight} />
        <Footer />
      </>
    )
  );
}
