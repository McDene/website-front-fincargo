"use client";

import type { Region } from "@/lib/i18n";
import dynamic from "next/dynamic";
import SectionFeaturesGlobal from "@/components/Common/SectionFeaturesGlobal";

// Lazy-load region-specific variants (future: ES, DE, etc.)
const SectionFeaturesBE = dynamic(() => import("@/components/Common/SectionFeaturesBE"), { ssr: false });

interface SectionFeaturesProps {
  region?: Region;
}

export default function SectionFeatures({ region }: SectionFeaturesProps) {
  if (region === "be") {
    return <SectionFeaturesBE />;
  }
  // default (www.fincargo.ai and other regions)
  return <SectionFeaturesGlobal />;
}

