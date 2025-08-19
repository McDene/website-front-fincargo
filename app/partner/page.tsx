"use client";

import { useEffect, useState, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Main";
import HeroImage from "@/components/HeroImage";
import Partner from "@/components/Partner";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";

export default function PartenerPage() {
  const { language } = useContext(LanguageContext);
  const [heroData, setHeroData] = useState(null);
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const heroURL = `/api/hero-images?filters[Page][$eq]=Partener&populate[Hero][populate]=Image`;
        const partnerURL = `/api/partner?populate[MultipleText]=true&populate[Gallery]=true`;

        const [heroResponse, partnerResponse] = await Promise.all([
          fetchAPI(heroURL, language),
          fetchAPI(partnerURL, language),
        ]);

        setHeroData(heroResponse?.data?.[0]?.Hero || null);
        setPartnerData(partnerResponse?.data || null);
      } catch (error) {
        console.error("Error fetching partner data:", error);
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
        <Header />
        {heroData && <HeroImage heroImageData={heroData} />}
        {partnerData && <Partner partnerData={partnerData} />}
        <Footer />
      </>
    )
  );
}
