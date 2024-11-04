"use client";

import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import HeroAbout from "@/components/Hero/HeroAbout";
import About from "@/components/About/About";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

interface ContentChild {
  text: string;
}

interface Content {
  type: string;
  children: ContentChild[];
}

interface AboutData {
  id: number;
  Title: string;
  Content: Content[];
}

interface HeroData {
  Title: string;
  SecondeTitle: string;
  Paragraph: string;
  ButtonText: string;
  ButtonLink: string | null;
  Image: {
    id: number;
    url: string;
  };
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData[]>([]);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const [heroResponse, aboutResponse] = await Promise.all([
          fetchAPI(
            "/api/hero-images?filters[Page][$eq]=About&populate[Hero][populate]=Image"
          ),
          fetchAPI("/api/abouts"),
        ]);

        if (heroResponse?.data?.length > 0) {
          setHeroData(heroResponse.data[0].Hero);
        }

        if (aboutResponse?.data) {
          setAboutData(aboutResponse.data);
        }
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
        <HeroAbout heroData={heroData} />
        <About aboutData={aboutData} />
        <Footer />
      </>
    )
  );
}
