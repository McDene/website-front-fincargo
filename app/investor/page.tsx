"use client";

import { useEffect, useState, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import HeroImage from "@/components/HeroImage";
import Investor from "@/components/Investor";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";

export default function InvestorPage() {
  const { language } = useContext(LanguageContext);
  const [heroData, setHeroData] = useState(null);
  const [investorData, setInvestorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const [heroResponse, investorResponse] = await Promise.all([
          fetchAPI(
            "/api/hero-images?filters[Page][$eq]=Investor&populate[Hero][populate]=Image",
            language
          ),
          fetchAPI("/api/investor?populate=MultipleText", language),
        ]);

        setHeroData(heroResponse?.data?.[0]?.Hero || null);
        setInvestorData(investorResponse?.data || null);
      } catch (error) {
        console.error("Error fetching investor data:", error);
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
        {investorData && <Investor investorData={investorData} />}
        <Footer />
      </>
    )
  );
}
