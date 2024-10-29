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

interface Feature {
  Title: string;
  Card: Card[];
}

interface FeatureData {
  id: number;
  Feature: Feature;
}

export default function FeatureC() {
  const [featureData, setFeatureData] = useState<FeatureData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeatureData = async () => {
      try {
        const response = await fetchAPI(
          "/api/features?filters[Page][$eq]=FreightForwarders&populate[Feature][populate][Card][populate]=Image"
        );
        if (response && response.data && response.data.length > 0) {
          setFeatureData(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching Feature C:", error);
      } finally {
        setLoading(false);
      }
    };

    getFeatureData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!featureData || !Array.isArray(featureData.Feature.Card)) {
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
