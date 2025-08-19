"use client";

import { useEffect, useState, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Main";
import HeroImage from "@/components/HeroImage";
import ProtectionPolicyC from "@/components/ProtectionPolicyC";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";

export default function CarrierProtectionPolicyPage() {
  const { language } = useContext(LanguageContext);
  const [heroData, setHeroData] = useState(null);
  const [carrierProtectionPolicyData, setCarrierProtectionPolicyData] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => setShowLoader(true), 500);

    const fetchData = async () => {
      try {
        const [heroResponse, carrierProtectionPolicyResponse] =
          await Promise.all([
            fetchAPI(
              "/api/hero-images?filters[Page][$eq]=CarrierProtectionPolicy&populate[Hero][populate]=Image",
              language
            ),
            fetchAPI(
              "/api/c-protection-policy?populate[Content][populate]=Image",
              language
            ),
          ]);

        setHeroData(heroResponse?.data?.[0]?.Hero || null);
        setCarrierProtectionPolicyData(
          carrierProtectionPolicyResponse?.data || null
        );
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
        <Header />
        {heroData && <HeroImage heroImageData={heroData} />}
        {carrierProtectionPolicyData && (
          <ProtectionPolicyC
            carrierProtectionPolicyData={carrierProtectionPolicyData}
          />
        )}
        <Footer />
      </>
    )
  );
}
