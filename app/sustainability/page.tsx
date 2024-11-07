"use client";

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import HeroImage from "@/components/HeroImage";
import EsgPolicy from "@/components/EsgPolicy";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

export default function SustainabilityPage() {
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
            "/api/hero-images?filters[Page][$eq]=Sustainability&populate[Hero][populate]=Image"
          ),
          fetchAPI("/api/esg-policy?populate=MultipleText"),
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
  }, []);

  if (loading && showLoader) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000" loading={showLoader} size={150} />
        <p>Loading data...</p>
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
