import Header from "@/components/Header/Main";
import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import SectionBenefits from "@/components/Common/SectionProvenResults";
import SectionFeatures from "@/components/Common/SectionFeatures";
import SectionKPIs from "@/components/Common/SectionKPIs";
import SectionPricingByTransaction from "@/components/Common/SectionPricingByTransaction";
import SectionDemo from "@/components/Common/SectionDemo";
import SectionIntegrations from "@/components/Common/SectionIntegrations";
import { detectServerUiLocale, toStrapiLocale, detectServerRegion } from "@/lib/i18n";

export const revalidate = 3600; // revalidate every hour

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

export default async function Home() {
  // SSR fetch in default language (en) for SEO
  const uiLocale = await detectServerUiLocale();
  const region = await detectServerRegion();
  const strapiLocale = toStrapiLocale(uiLocale);
  const [heroResponse, faqCarrierRes, faqFreightRes] = await Promise.all([
    fetchAPI(
      "/api/hero-videos?filters[Page][$eq]=Carriers&populate[Hero][populate]=Video",
      strapiLocale
    ),
    fetchAPI(
      "/api/faqs?filters[Page][$eq]=Carrier&populate[FAQ][populate]=Accordion",
      strapiLocale
    ),
    fetchAPI(
      "/api/faqs?filters[Page][$eq]=FreightForwarder&populate[FAQ][populate]=Accordion",
      strapiLocale
    ),
  ]);

  const heroRaw = isRecord(heroResponse) ? heroResponse["data"] : undefined;
  const heroArr = Array.isArray(heroRaw)
    ? heroRaw
    : isRecord(heroRaw) && Array.isArray((heroRaw as Record<string, unknown>)["data"])
    ? (heroRaw as Record<string, unknown>)["data"]
    : heroRaw;
  const heroItem = Array.isArray(heroArr) ? heroArr[0] : undefined;
  const heroObj = isRecord(heroItem) ? heroItem["Hero"] : undefined;
  const heroData = normalizeHeroData(heroObj);

  const fcRaw = isRecord(faqCarrierRes) ? faqCarrierRes["data"] : undefined;
  const fcArr = Array.isArray(fcRaw)
    ? fcRaw
    : isRecord(fcRaw) && Array.isArray((fcRaw as Record<string, unknown>)["data"])
    ? (fcRaw as Record<string, unknown>)["data"]
    : fcRaw;
  const fcItem = Array.isArray(fcArr) ? fcArr[0] : undefined;
  const faqDataCarrier = normalizeFaqEntry(fcItem);

  const ffRaw = isRecord(faqFreightRes) ? faqFreightRes["data"] : undefined;
  const ffArr = Array.isArray(ffRaw)
    ? ffRaw
    : isRecord(ffRaw) && Array.isArray((ffRaw as Record<string, unknown>)["data"])
    ? (ffRaw as Record<string, unknown>)["data"]
    : ffRaw;
  const ffItem = Array.isArray(ffArr) ? ffArr[0] : undefined;
  const faqDataFreight = normalizeFaqEntry(ffItem);

  return (
    <>
      <Header />
      {heroData && <Hero heroData={heroData} region={region} />}
      <SectionKPIs region={region} />
      <SectionFeatures region={region} />
      <SectionBenefits />
      <SectionPricingByTransaction />
      <SectionDemo />
      <SectionIntegrations />
      <Faq
        carrier={faqDataCarrier ?? undefined}
        freight={faqDataFreight ?? undefined}
        initialAudience="carrier"
      />
      <Footer />
    </>
  );
}

export const metadata = {
  alternates: { canonical: "/" },
};
