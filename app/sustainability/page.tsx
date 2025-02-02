"use client";

import { useEffect, useState, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import HeroImage from "@/components/HeroImage";
import EsgPolicy from "@/components/EsgPolicy";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";

export default function SustainabilityPage() {
  const { language } = useContext(LanguageContext);
  const [heroData, setHeroData] = useState(null);
  const [sustainabilityData, setSustainabilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => setShowLoader(true), 500);

    const fetchData = async () => {
      try {
        const [heroResponse, sustainabilityResponse] = await Promise.all([
          fetchAPI(
            "/api/hero-images?filters[Page][$eq]=Sustainability&populate[Hero][populate]=Image",
            language
          ),
          fetchAPI("/api/esg-policy?populate=MultipleText", language),
        ]);

        setHeroData(heroResponse?.data?.[0]?.Hero || null);
        setSustainabilityData(sustainabilityResponse?.data || null);
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
        <HeaderSecondary />
        {heroData && <HeroImage heroImageData={heroData} />}
        {sustainabilityData && <EsgPolicy esgPolicyData={sustainabilityData} />}
        <Footer />
      </>
    )
  );
}
