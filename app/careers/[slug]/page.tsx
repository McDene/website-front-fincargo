"use client";

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import CareerItem from "@/components/Career/CareerItem";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

interface JobDescriptionChild {
  text: string;
  children?: { text: string }[];
}

interface JobDescription {
  type: string;
  level?: number;
  children: JobDescriptionChild[];
  image?: {
    url: string;
    alternativeText?: string;
  };
}

interface Job {
  Title: string;
  Location: string;
  Description: JobDescription[];
  Slug: string;
}

export default function CareerIdPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true); // Activer le loader après 500ms
    }, 500);

    const fetchJobData = async () => {
      try {
        const response = await fetchAPI(
          `/api/careers?filters[Slug][$eq]=${slug}&populate=*`
        );
        if (response?.data?.length > 0) {
          const fetchedJob = response.data[0];
          setJob({
            Title: fetchedJob.Title,
            Location: fetchedJob.Location,
            Description: fetchedJob.Description,
            Slug: fetchedJob.Slug,
          });
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false); // Indique que le chargement est terminé
        clearTimeout(loaderTimeout); // Nettoyer le timeout
      }
    };

    fetchJobData();

    // Cleanup du timeout
    return () => clearTimeout(loaderTimeout);
  }, [slug]);

  return (
    <>
      {loading && showLoader ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
      ) : job ? (
        <>
          <HeaderSecondary />
          <SectionHeroSmall />
          <CareerItem job={job} />
          <Footer />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500">Job not found.</p>
        </div>
      )}
    </>
  );
}
