import SectionKeyFeature from "@/components/Common/SectionKeyFeatures";

interface Card {
  id: number;
  Title: string;
  Content: string;
  Image: {
    url: string;
  };
}

interface Feature {
  Title: string;
  Card: Card[];
}

interface FeatureData {
  id: number;
  Feature: Feature;
}

interface FeatureFFProps {
  featureData: FeatureData | null;
}

export default function FeatureFF({ featureData }: FeatureFFProps) {
  if (!featureData || !Array.isArray(featureData.Feature.Card)) {
    return null;
  }

  return (
    <SectionKeyFeature
      titleSection={featureData.Feature.Title}
      cards={featureData.Feature.Card}
    />
  );
}
