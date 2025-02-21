"use client";

import { useState, useEffect, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import BlogOverview from "@/components/Blog/BlogOverview";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

import { LanguageContext } from "@/context/LanguageContext";

export default function BlogPage() {
  const { language } = useContext(LanguageContext);
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const [blogRes] = await Promise.all([
          fetchAPI("/api/blogs?[populate]=PrefaceImage", language),
        ]);
        if (blogRes?.data) setBlogData(blogRes.data);
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
        <HeaderSecondary />
        <SectionHeroSmall />
        {blogData.length > 0 ? (
          <BlogOverview blogData={blogData} />
        ) : (
          <p className="text-center">No articles found.</p>
        )}
        <Footer />
      </>
    )
  );
}
