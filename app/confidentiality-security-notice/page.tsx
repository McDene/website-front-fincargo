"use client";

import { useState, useEffect, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Secondary";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { LanguageContext } from "@/context/LanguageContext";

interface ConfidentialityData {
  title: string;
  content: string;
}

export default function ConfidentialitySecurityNoticePage() {
  const { language } = useContext(LanguageContext);
  const [confidentialityData, setConfidentialityData] =
    useState<ConfidentialityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const response = await fetchAPI(
          "/api/confidentiality-and-security-notice",
          language
        );
        if (response?.data) {
          setConfidentialityData({
            title: response.data.Title,
            content: response.data.Paragraph,
          });
        }
      } catch (error) {
        console.error("Error fetching confidentiality data:", error);
      } finally {
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

  return (
    !loading && (
      <div>
        <Header />
        <SectionHeroSmall />
        {confidentialityData && (
          <section className="py-24 xl:py-32 lg:py-38 md:py-24 sm:py-20 bg-white px-4">
            <div className="max-w-7xl mx-auto">
              <div>
                <div className="pb-10">
                  <h2 className="text-4xl md:text-6xl font-semibold uppercase mb-3 tracking-wide flex justify-center">
                    {confidentialityData?.title ||
                      "Confidentiality & Security Notice"}
                  </h2>
                </div>

                <div className="prose prose-lg">
                  <ReactMarkdown
                    className="text-lg text-justify"
                    components={{
                      h3: ({ children }) => (
                        <h3 className="pt-5">{children}</h3>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside">{children}</ol>
                      ),
                      li: ({ children }) => (
                        <li className="my-0">{children}</li>
                      ),
                      p: ({ children }) => <p className="my-4">{children}</p>,
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          className="text-darkBlue hover:underline"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {confidentialityData.content || "Content not available."}
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
