"use client";

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import HeroImage from "@/components/HeroImage";
import ProtectionPolicyC from "@/components/ProtectionPolicyC";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

export default function CarrierProtectionPolicyPage() {
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
              "/api/hero-images?filters[Page][$eq]=CarrierProtectionPolicy&populate[Hero][populate]=Image"
            ),
            fetchAPI(
              "/api/c-protection-policy?populate[Content][populate]=Image"
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
  }, []);

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
