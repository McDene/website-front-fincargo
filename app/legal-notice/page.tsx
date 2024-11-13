"use client";

import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface LegalNoticeData {
  title: string;
  content: string;
}

export default function LegalNoticePage() {
  const [legalNoticeData, setLegalNoticeData] =
    useState<LegalNoticeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const response = await fetchAPI("/api/legal-notice");
        if (response?.data) {
          setLegalNoticeData({
            title: response.data.Title,
            content: response.data.Paragraph, // Directement le texte en Markdown
          });
        }
      } catch (error) {
        console.error("Error fetching legal notice data:", error);
      } finally {
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
      <div>
        <HeaderSecondary />
        <SectionHeroSmall />
        {legalNoticeData && (
          <section className="py-24 xl:py-32 lg:py-38 md:py-24 sm:py-20 bg-white px-4">
            <div className="max-w-7xl mx-auto">
              <div>
                <div className="pb-10">
                  <h2 className="text-5xl md:text-7xl font-semibold uppercase mb-3 tracking-wide flex justify-center">
                    {legalNoticeData.title || "Legal Notice"}
                  </h2>
                </div>
                <div className="prose prose-lg">
                  <ReactMarkdown className="text-lg line-break text-justify">
                    {legalNoticeData.content || "Content not available."}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    )
  );
}
