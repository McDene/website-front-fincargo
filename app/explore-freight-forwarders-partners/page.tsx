"use client";

import { useEffect, useState, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import HeroImage from "@/components/HeroImage";
import FfParteners from "@/components/FfParteners";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";

export default function ExploreFreightForwardersPartenersPage() {
  const { language } = useContext(LanguageContext);
  const [heroData, setHeroData] = useState(null);
  const [exploreFFPartnersData, setExploreFFPartnersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const [heroResponse, exploreFFPartnesResponse] = await Promise.all([
          fetchAPI(
            "/api/hero-images?filters[Page][$eq]=ExploreFreightForwardersPartners&populate[Hero][populate]=Image",
            language
          ),
          fetchAPI("/api/explore-ff-partner?populate=MultipleText"),
        ]);

        setHeroData(heroResponse?.data?.[0]?.Hero || null);
        setExploreFFPartnersData(exploreFFPartnesResponse?.data || null);
      } catch (error) {
        console.error("Error fetching investor data:", error);
      } finally {
        clearTimeout(loaderTimeout);
        setLoading(false);
      }
    };

    fetchData();
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
        {exploreFFPartnersData && (
          <FfParteners exploreFFPartnersData={exploreFFPartnersData} />
        )}
        <Footer />
      </>
    )
  );
}
