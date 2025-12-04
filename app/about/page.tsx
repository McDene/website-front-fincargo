"use client";

import { useState, useEffect, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Main";
import HeroImage from "@/components/HeroImage";
import AboutPageContent from "@/components/About/AboutPageContent";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language } = useContext(LanguageContext);
  const [heroData, setHeroData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
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
            "/api/hero-images?filters[Page][$eq]=About&populate[Hero][populate]=Image",
            language
          ),
          fetchAPI("/api/abouts", language),
        ]);

        setHeroData(heroResponse?.data?.[0]?.Hero || null);
        setAboutData(aboutResponse?.data || []);
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

  // Helpers to extract plain text from Strapi richtext
  const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;
  type RichTextChild = { text?: string };
  type RichTextBlock = { children?: RichTextChild[] };
  type AboutItem = { Title?: string; Content?: RichTextBlock[] };

  const extractPlain = (blocks: unknown): string => {
    if (!Array.isArray(blocks)) return "";
    const arr = blocks as RichTextBlock[];
    return arr
      .map((b) =>
        Array.isArray(b?.children)
          ? (b.children as RichTextChild[])
              .map((c) => (typeof c?.text === "string" ? c.text : ""))
              .join(" ")
          : ""
      )
      .filter(Boolean)
      .join("\n\n");
  };

  const pickByTitle = (needle: RegExp): AboutItem | undefined =>
    Array.isArray(aboutData)
      ? (aboutData as unknown[]).find(
          (s): s is AboutItem =>
            isRecord(s) && typeof s.Title === "string" && needle.test(s.Title.toLowerCase())
        )
      : undefined;

  const missionItem = pickByTitle(/mission/);
  const visionItem = pickByTitle(/vision/);
  const aboutItem = pickByTitle(/propos|about|fincargo/);
  const missionText = extractPlain(missionItem?.Content);
  const visionText = extractPlain(visionItem?.Content);
  const aboutText = extractPlain(aboutItem?.Content);

  return !loading ? (
    <>
      <Header />
      {heroData && (
        <HeroImage
          heroImageData={heroData}
          overlayStrength={0}
          showOverline={false}
          imageObjectPosition="object-left md:object-center"
        />
      )}
      <AboutPageContent whoWeAre={aboutText} mission={missionText} vision={visionText} />
      <Footer />
    </>
  ) : null;
}
