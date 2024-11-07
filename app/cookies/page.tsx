"use client";

import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import BlockRendererClient from "@/components/BlockRendererClient";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { BlocksContent } from "@strapi/blocks-react-renderer"; // Assurez-vous que BlocksContent est importé

// Définir le type des données du contenu de cookies
interface CookiesData {
  title: string;
  content: BlocksContent; // Utilisez directement BlocksContent ici pour éviter les erreurs de compatibilité
}

export default function CookiesPage() {
  const [cookiesData, setCookiesData] = useState<CookiesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAPI("/api/cookie");
        if (response?.data) {
          setCookiesData({
            title: response.data.Title,
            content: response.data.Paragraph as BlocksContent, // Cast to BlocksContent for compatibility
          });
        }
      } catch (error) {
        console.error("Error fetching cookies data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  return (
    <>
      <HeaderSecondary />
      <SectionHeroSmall />
      {cookiesData && (
        <section className="py-32 xl:py-32 lg:py-38 md:py-24 sm:py-20 bg-white px-4">
          <div className="max-w-7xl mx-auto">
            <div className="pb-10">
              <h2 className="text-7xl font-semibold uppercase mb-3 tracking-wide flex justify-center">
                {cookiesData.title || "Confidentiality & Security Notice"}
              </h2>
            </div>
            <BlockRendererClient content={cookiesData.content} />
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
