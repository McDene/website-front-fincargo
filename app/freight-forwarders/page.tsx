"use client";

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Main";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Benefit from "@/components/Benefit";
import Invite from "@/components/Invite";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

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
          inviteResponse,
          faqResponse,
        ] = await Promise.all([
          fetchAPI(
            "/api/hero-videos?filters[Page][$eq]=FreightForwarders&populate[Hero][populate]=Video"
          ),
          fetchAPI(
            "/api/features?filters[Page][$eq]=FreightForwarders&populate[Feature][populate][Card][populate]=Image"
          ),
          fetchAPI(
            "/api/benefits?filters[Page][$eq]=FreightForwarders&populate[Benefit][populate]=Benefit"
          ),
          fetchAPI(
            "/api/invites?filters[Page][$eq]=FreightForwarders&populate=Image"
          ),
          fetchAPI(
            "/api/faqs?filters[Page][$eq]=FreightForwarder&populate[FAQ][populate]=Accordion"
          ),
        ]);

        setHeroData(heroResponse?.data?.[0]?.Hero || null);
        setFeatureData(featureResponse?.data?.[0] || null);
        setBenefitData(benefitResponse?.data?.[0] || null);
        setInviteData(inviteResponse?.data?.[0] || null);
        setFaqData(faqResponse?.data?.[0] || null);
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#faqs") {
      const faqsSection = document.getElementById("faqs");
      if (faqsSection) {
        faqsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [loading]);

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
        {heroData && <Hero heroData={heroData} />}
        {featureData && <Feature featureData={featureData} />}
        {benefitData && <Benefit benefitData={benefitData} />}
        {inviteData && <Invite inviteData={inviteData} />}
        {faqData && <Faq faqData={faqData} />}
        <Footer />
      </>
    )
  );
}
