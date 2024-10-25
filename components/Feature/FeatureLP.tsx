"use client";

import SectionKeyFeature from "@/components/Common/SectionKeyFeatures";
import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/utils";

interface Card {
  id: number;
  Title: string;
  Content: string;
  Image: {
    url: string;
  };
}

interface FeatureData {
  id: number;
  Feature: {
    Title: string;
    Card: Card[];
  };
}

export default function FeatureLP() {
  const [featureData, setFeatureData] = useState<FeatureData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeatureData = async () => {
      try {
        const data = await fetchAPI(
          "/api/feature-lp?populate[Feature][populate][Card][populate]=Image"
        );
        if (data && data.data) {
          setFeatureData(data.data);
        }
      } catch (error) {
        console.error("Error fetching Feature LP:", error);
      } finally {
        setLoading(false);
      }
    };

    getFeatureData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (
    !featureData ||
    !featureData.Feature ||
    !Array.isArray(featureData.Feature.Card)
  ) {
    return <div>No data available</div>;
  }

  return (
    <>
      <SectionKeyFeature
        titleSection={featureData.Feature.Title}
        cards={featureData.Feature.Card || []}
      />
    </>
  );
}
