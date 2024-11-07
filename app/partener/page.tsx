"use client";

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import HeroImage from "@/components/HeroImage";
import Partner from "@/components/Partner";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

export default function PartenerPage() {
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
        const [heroResponse, partnerResponse] = await Promise.all([
          fetchAPI(
            "/api/hero-images?filters[Page][$eq]=Partener&populate[Hero][populate]=Image"
          ),
          fetchAPI("/api/partner?populate[MultipleText]=*&populate[Gallery]=*"),
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
        {partnerData && <Partner partnerData={partnerData} />} <Footer />
      </>
    )
  );
}
