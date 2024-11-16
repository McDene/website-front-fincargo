"use client";

import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import HeroImage from "@/components/HeroImage";
import Api from "@/components/Api";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

export default function ApiPage() {
  const [heroData, setHeroData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const [heroResponse, apiResponse] = await Promise.all([
          fetchAPI(
            "/api/hero-images?filters[Page][$eq]=Api&populate[Hero][populate]=Image"
          ),
          fetchAPI("/api/api?populate=MultipleText"),
        ]);

        setHeroData(heroResponse?.data?.[0]?.Hero || null);
        setApiData(apiResponse?.data || []);
      } catch (error) {
        console.error("Error fetching about data:", error);
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
        {apiData && <Api apiData={apiData} />}
        <Footer />
      </>
    )
  );
}
