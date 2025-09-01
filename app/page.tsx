"use client";

import { useEffect, useState, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Main";
import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";
import { toStrapiLocale } from "@/lib/i18n";
import SectionBenefits from "@/components/Common/SectionProvenResults";
import SectionFeatures from "@/components/Common/SectionFeatures";

import SectionPricingByTransaction from "@/components/Common/SectionPricingByTransaction";
import SectionDemo from "@/components/Common/SectionDemo";

/* ================== Types ================== */
interface HeroData {
  Title: string;
  Paragraph: string;
  ButtonText: string;
  ButtonLink: string;
  Video: { url: string };
}

interface AccordionItem {
  id: number;
  Question: string;
  Answer: string;
}

interface FaqData {
  id: number;
  FAQ: {
    Title: string;
    Subtitle: string;
    Accordion: AccordionItem[];
  };
}

/* ============ Type guards & helpers ============ */
const isRecord = (val: unknown): val is Record<string, unknown> =>
  typeof val === "object" && val !== null;

const pickString = (
  obj: Record<string, unknown>,
  keys: string[]
): string | undefined => {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string") return v;
  }
  return undefined;
};

const pickNumber = (
  obj: Record<string, unknown>,
  key: string
): number | undefined => {
  const v = obj[key];
  return typeof v === "number" ? v : undefined;
};

/* ============ Normalizers (Strapi) ============ */
const normalizeHeroData = (raw: unknown): HeroData | null => {
  if (!isRecord(raw)) return null;

  const title = pickString(raw, ["Title", "title"]) ?? "";
  const paragraph = pickString(raw, ["Paragraph", "paragraph"]) ?? "";
  const buttonText = pickString(raw, ["ButtonText", "buttonText"]) ?? "";
  const buttonLink = pickString(raw, ["ButtonLink", "buttonLink"]) ?? "";

  const videoCandidate = raw["Video"];
  const videoObj = isRecord(videoCandidate) ? videoCandidate : undefined;
  const url = videoObj ? pickString(videoObj, ["url"]) ?? "" : "";

  if (!title && !paragraph && !buttonText && !buttonLink && !url) return null;

  return {
    Title: title,
    Paragraph: paragraph,
    ButtonText: buttonText,
    ButtonLink: buttonLink,
    Video: { url },
  };
};

const normalizeFaqEntry = (raw: unknown): FaqData | null => {
  if (!isRecord(raw)) return null;

  const id = pickNumber(raw, "id") ?? 0;

  const faqCandidate = raw["FAQ"] ?? raw["faq"];
  if (!isRecord(faqCandidate)) return null;

  const Title = pickString(faqCandidate, ["Title", "title"]) ?? "";
  const Subtitle = pickString(faqCandidate, ["Subtitle", "subtitle"]) ?? "";

  const accCandidate = faqCandidate["Accordion"];
  const rawAcc = Array.isArray(accCandidate) ? accCandidate : [];

  const Accordion: AccordionItem[] = rawAcc
    .map((item, idx) => {
      if (!isRecord(item)) return null;
      const idVal = pickNumber(item, "id") ?? idx;
      const Question =
        pickString(item, ["Question", "Title", "question", "title"]) ?? "";
      const Answer =
        pickString(item, ["Answer", "Content", "answer", "content"]) ?? "";
      return { id: idVal, Question, Answer };
    })
    .filter((x): x is AccordionItem => x !== null);

  if (!Title && !Subtitle && Accordion.length === 0) return null;

  return { id, FAQ: { Title, Subtitle, Accordion } };
};

/* ================== Page ================== */
export default function Home() {
  const { language } = useContext(LanguageContext);

  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [faqDataCarrier, setFaqDataCarrier] = useState<FaqData | null>(null);
  const [faqDataFreight, setFaqDataFreight] = useState<FaqData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => setShowLoader(true), 500);

    const fetchData = async () => {
      try {
        const locale = toStrapiLocale(language);
        const [heroResponse, faqCarrierRes, faqFreightRes] = await Promise.all([
          fetchAPI(
            "/api/hero-videos?filters[Page][$eq]=Carriers&populate[Hero][populate]=Video",
            locale
          ),
          fetchAPI(
            "/api/faqs?filters[Page][$eq]=Carrier&populate[FAQ][populate]=Accordion",
            locale
          ),
          fetchAPI(
            "/api/faqs?filters[Page][$eq]=FreightForwarder&populate[FAQ][populate]=Accordion",
            locale
          ),
        ]);

        const heroRaw = isRecord(heroResponse)
          ? heroResponse["data"]
          : undefined;
        const heroArr = Array.isArray(heroRaw)
          ? heroRaw
          : isRecord(heroRaw) &&
            Array.isArray((heroRaw as Record<string, unknown>)["data"])
          ? (heroRaw as Record<string, unknown>)["data"]
          : heroRaw;
        const heroItem = Array.isArray(heroArr) ? heroArr[0] : undefined;
        const heroObj = isRecord(heroItem) ? heroItem["Hero"] : undefined;
        setHeroData(normalizeHeroData(heroObj));

        const fcRaw = isRecord(faqCarrierRes)
          ? faqCarrierRes["data"]
          : undefined;
        const fcArr = Array.isArray(fcRaw)
          ? fcRaw
          : isRecord(fcRaw) &&
            Array.isArray((fcRaw as Record<string, unknown>)["data"])
          ? (fcRaw as Record<string, unknown>)["data"]
          : fcRaw;
        const fcItem = Array.isArray(fcArr) ? fcArr[0] : undefined;
        setFaqDataCarrier(normalizeFaqEntry(fcItem));

        const ffRaw = isRecord(faqFreightRes)
          ? faqFreightRes["data"]
          : undefined;
        const ffArr = Array.isArray(ffRaw)
          ? ffRaw
          : isRecord(ffRaw) &&
            Array.isArray((ffRaw as Record<string, unknown>)["data"])
          ? (ffRaw as Record<string, unknown>)["data"]
          : ffRaw;
        const ffItem = Array.isArray(ffArr) ? ffArr[0] : undefined;
        setFaqDataFreight(normalizeFaqEntry(ffItem));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        clearTimeout(loaderTimeout);
        setLoading(false);
      }
    };

    fetchData();
    return () => clearTimeout(loaderTimeout);
  }, [language]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#faqs") {
      document.getElementById("faqs")?.scrollIntoView({ behavior: "smooth" });
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
        <SectionFeatures />
        <SectionBenefits />
        <SectionPricingByTransaction />
        <SectionDemo />
        {/* Toggle intégré si les deux datasets sont fournis */}
        <Faq carrier={faqDataCarrier} freight={faqDataFreight} />
        <Footer />
      </>
    )
  );
}
