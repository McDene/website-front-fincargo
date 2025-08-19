"use client";

import { useState, useEffect, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Secondary";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import CareerOverview from "@/components/Career/CareerOverview";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";

export default function CareerPage() {
  const { language } = useContext(LanguageContext);
  const [departments, setDepartments] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        // Fetch departments and jobs in parallel
        const [departmentsRes, jobsRes] = await Promise.all([
          fetchAPI("/api/departments", language),
          fetchAPI("/api/careers?populate=Department", language),
        ]);

        if (departmentsRes?.data) setDepartments(departmentsRes.data);
        if (jobsRes?.data) setJobs(jobsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      <>
        <Header />
        <SectionHeroSmall />
        {jobs && departments && (
          <CareerOverview departments={departments} jobs={jobs} />
        )}
        <Footer />
      </>
    )
  );
}
