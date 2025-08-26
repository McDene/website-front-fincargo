"use client";

import { useState, useEffect, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Main";
import HeroImage from "@/components/HeroImage";
import SectionFreighAudit from "@/components/Common/SectionFreightAudit";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { toStrapiLocale } from "@/lib/i18n";
import { LanguageContext } from "@/context/LanguageContext";

export default function FreightAudiPage() {
  const { language } = useContext(LanguageContext);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const locale = toStrapiLocale(language);
        const [heroResponse] = await Promise.all([
          fetchAPI(
            "/api/hero-images?filters[Page][$eq]=FreightAudit&populate[Hero][populate]=Image",
            locale
          ),
        ]);

        setHeroData(heroResponse?.data?.[0]?.Hero || null);
      } catch (error) {
        console.error("Error fetching about data:", error);
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
        <SectionFreighAudit />
        <Footer />
      </>
    )
  );
}
