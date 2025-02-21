"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import BlogItem from "@/components/Blog/BlogItem";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

interface InlineNode {
  type?: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  url?: string;
  children?: InlineNode[];
}

interface ContentBlock {
  type: string;
  level?: number;
  format?: string;
  children: InlineNode[];
}

interface Blog {
  Title: string;
  Introduction: ContentBlock[];
  Date: string;
  Content: ContentBlock[];
  Gallery?: { url: string }[];
}

export default function BlogIdPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchBlog = async () => {
      try {
        const response = await fetchAPI(
          `/api/blogs?filters[Slug][$eq]=${slug}&populate=*`
        );
        if (response?.data?.length > 0) {
          const fetchedBlog = response.data[0];

          // Vérification et transformation des données si nécessaire
          setBlog({
            Title: fetchedBlog.Title,
            Introduction: Array.isArray(fetchedBlog.Introduction)
              ? fetchedBlog.Introduction
              : [], // S'assure que c'est bien un tableau
            Date: fetchedBlog.Date,
            Content: Array.isArray(fetchedBlog.Content)
              ? fetchedBlog.Content
              : [], // S'assure que c'est bien un tableau
            Gallery: fetchedBlog.Gallery || [],
          });
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    return () => clearTimeout(loaderTimeout);
  }, [slug]);

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
        {blog && <BlogItem blog={blog} />}
        <Footer />
      </>
    )
  );
}
