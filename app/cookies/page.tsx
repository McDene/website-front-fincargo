"use client";

import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface CookiesData {
  title: string;
  content: string;
}

export default function CookiesPage() {
  const [cookiesData, setCookiesData] = useState<CookiesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const response = await fetchAPI("/api/cookie");
        if (response?.data) {
          setCookiesData({
            title: response.data.Title,
            content: response.data.Paragraph,
          });
        }
      } catch (error) {
        console.error("Error fetching cookies data:", error);
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
      <>
        <HeaderSecondary />
        <SectionHeroSmall />
        {cookiesData && (
          <section className="py-32 xl:py-32 lg:py-38 md:py-24 sm:py-20 bg-white px-4">
            <div className="max-w-7xl mx-auto">
              <div className="pb-10">
                <h2 className="text-7xl font-semibold uppercase mb-3 tracking-wide flex justify-center">
                  {cookiesData.title || "Cookeies"}
                </h2>
              </div>
              <ReactMarkdown
                className="text-lg text-justify"
                components={{
                  h3: ({ children }) => (
                    <h3 className="pt-5 pb-2 text-xl">{children}</h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside">{children}</ol>
                  ),
                  li: ({ children }) => <li className="my-0">{children}</li>,
                  p: ({ children }) => <p className="mt-1 mb-4">{children}</p>,
                  a: ({ children, href }) => (
                    <a href={href} className="text-darkBlue hover:underline">
                      {children}
                    </a>
                  ),
                }}
              >
                {cookiesData.content || "Content not available."}
              </ReactMarkdown>
            </div>
          </section>
        )}
        <Footer />
      </>
    )
  );
}
