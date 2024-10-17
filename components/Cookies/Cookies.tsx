"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { fetchAPI } from "@/lib/utils"; // Importer la fonction de fetch depuis utils.ts

interface ConfidentialityData {
  title: string;
  content: string;
}

export default function Cookies() {
  const [data, setData] = useState<ConfidentialityData | null>(null);
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState<string | null>(null); // État d'erreur

  useEffect(() => {
    // Fonction pour récupérer les données de l'API
    const getData = async () => {
      try {
        const apiData = await fetchAPI("/api/cookie"); // Appel à l'API avec l'endpoint approprié
        if (apiData) {
          setData({
            title: apiData.data.Title, // Adapter selon la structure de tes données
            content: apiData.data.Paragraph,
          });
        } else {
          setError("Failed to fetch data.");
        }
      } catch {
        setError("Error fetching data from API.");
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    getData(); // Appeler l'API au montage du composant
  }, []);

  // Afficher le loader ou l'erreur si nécessaire
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <section className="py-32 xl:py-32 lg:py-38 md:py-24 sm:py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div>
            <div className="pb-10">
              <h2 className="text-4xl font-semibold uppercase mb-3 tracking-wide flex justify-center">
                {data?.title || "Confidentiality & Security Notice"}
              </h2>
            </div>

            <div className="prose prose-lg">
              <ReactMarkdown className="line-break">
                {data?.content || "Content not available."}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
