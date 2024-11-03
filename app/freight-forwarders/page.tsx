"use client";

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Main";
import HeroFF from "@/components/Hero/HeroFF";
import FeatureFF from "@/components/Feature/FeatureFF";
import BenefitFF from "@/components/Benefit/BenefitFF";
import FaqFF from "@/components/FAQs/FaqFF";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

export default function FreightForwardersPage() {
  const [heroData, setHeroData] = useState(null);
  const [featureData, setFeatureData] = useState(null);
  const [benefitData, setBenefitData] = useState(null);
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const [heroResponse, featureResponse, benefitResponse, faqResponse] =
          await Promise.all([
            fetchAPI(
              "/api/hero-videos?filters[Page][$eq]=FreightForwarders&populate[Hero][populate]=Video"
            ),
            fetchAPI(
              "/api/features?filters[Page][$eq]=FreightForwarders&populate[Feature][populate][Card][populate]=Image"
            ),
            fetchAPI(
              "/api/benefits?filters[Page][$eq]=FreightForwarders&populate[Benefit][populate][Card][populate]=Image"
            ),
            fetchAPI(
              "/api/faqs?filters[Page][$eq]=FreightForwarder&populate[FAQ][populate]=Accordion"
            ),
          ]);

        if (heroResponse?.data?.length > 0) {
          setHeroData(heroResponse.data[0].Hero);
        }

        if (featureResponse?.data?.length > 0) {
          setFeatureData(featureResponse.data[0]);
        }

        if (benefitResponse?.data?.length > 0) {
          setBenefitData(benefitResponse.data[0]);
        }

        if (faqResponse?.data?.length > 0) {
          setFaqData(faqResponse.data[0]);
        }
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
        <Header />
        <HeroFF heroData={heroData} />
        <FeatureFF featureData={featureData} />
        <BenefitFF benefitData={benefitData} />
        <FaqFF faqData={faqData} />
        <Footer />
      </>
    )
  );
}
