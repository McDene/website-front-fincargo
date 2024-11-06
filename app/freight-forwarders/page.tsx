"use client";

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Main";
import HeroFF from "@/components/Hero/HeroFF";
import FeatureFF from "@/components/Feature/FeatureFF";
import BenefitFF from "@/components/Benefit/BenefitFF";
import FaqFF from "@/components/FAQs/FaqFF";
import InviteFF from "@/components/Invite/InviteFF";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

import Grid from "@/components/Gride/Gride";

export default function FreightForwardersPage() {
  const [heroData, setHeroData] = useState(null);
  const [featureData, setFeatureData] = useState(null);
  const [benefitData, setBenefitData] = useState(null);
  const [inviteData, setInviteData] = useState(null);
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const [
          heroResponse,
          featureResponse,
          benefitResponse,
          inviteRespnse,
          faqResponse,
        ] = await Promise.all([
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
            "/api/invites?filters[Page][$eq]=FreightForwarders&populate=Image"
          ),
          fetchAPI(
            "/api/faqs?filters[Page][$eq]=FreightForwarder&populate[FAQ][populate]=Accordion"
          ),
        ]);

        if (heroResponse?.data?.length > 0) {
          setHeroData(heroResponse.data[0].Hero || {});
        }

        if (featureResponse?.data?.length > 0) {
          setFeatureData(featureResponse.data[0] || {});
        }

        if (benefitResponse?.data?.length > 0) {
          setBenefitData(benefitResponse.data[0] || {});
        }

        if (inviteRespnse?.data?.length > 0) {
          setInviteData(inviteRespnse.data[0] || {});
        }

        if (faqResponse?.data?.length > 0) {
          setFaqData(faqResponse.data[0] || {});
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
        {heroData && <HeroFF heroData={heroData} />}
        {featureData && <FeatureFF featureData={featureData} />}
        <Grid />
        {benefitData && <BenefitFF benefitData={benefitData} />}
        {inviteData && <InviteFF inviteData={inviteData} />}
        {faqData && <FaqFF faqData={faqData} />}
        <Footer />
      </>
    )
  );
}
