"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";
import { postAPI } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export default function ContactPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(loaderTimeout);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Empêche les envois multiples
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await postAPI("/api/contact-submissions", {
        Name: formData.name, // ✅ Ajout du champ Name
        Email: formData.email,
        Subject: formData.subject,
        Message: formData.message,
      });

      if (response) {
        setStatus("Message sent successfully! ✅");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Failed to send the message. ❌");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // ✅ Fin du chargement
    }
  };

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
        <section className="py-20 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col ">
                <h2 className="text-6xl md:text-8xl font-bold mb-6">
                  {t("contact_us")}
                </h2>
                <p className="text-lg md:text-xl text-gray-700 pb-5">
                  {t("contact_text")}
                </p>

                <p className="text-lg md:text-xl text-gray-700 pb-5">
                  {t("contact_subtext")}{" "}
                  <a
                    className="text-lightBlue hover:underline"
                    href="mailto:contact@fincargo.ai"
                  >
                    contact@fincargo.ai
                  </a>
                </p>
              </div>

              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-darkBlue rounded-md px-4 py-3 mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm">
                      {t("name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-darkBlue rounded-md px-4 py-3 mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm">
                      {t("subject")}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full border border-darkBlue rounded-md px-4 py-3 mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm ">
                      {t("message")}
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full h-44 border border-darkBlue rounded-md px-4 py-3 mt-1"
                    ></textarea>
                  </div>
                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 w-full md:px-10 py-3 bg-lightBlue text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-darkBlue disabled:opacity-50"
                    >
                      {isSubmitting ? t("sending") : t("send")}
                    </button>
                  </div>
                  {status && <p className="text-center mt-4">{status}</p>}
                </form>
              </div>
            </div>
            <div className="mt-32 ">
              <h2 className="text-4xl md:text-6xl font-bold my-14 text-center">
                {t("where_to_find_us")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* 📍 Switzerland - Sion */}
                <div className="flex flex-col bg-gray-50 rounded-3xl  overflow-hidden transition-shadow duration-300">
                  <Image
                    src="/images/sion.webp"
                    alt="Sion, Switzerland"
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover"
                    unoptimized
                  />
                  <div className="p-6 ">
                    <p className="text-xl font-semibold text-darkBlue">
                      Switzerland - Sion
                    </p>
                    <p className="text-lg text-gray-700">Fincargo SA</p>
                    <p className="text-gray-600">
                      Rue de L&rsquo;Industrie, 23
                    </p>
                    <p className="text-gray-600">1950 Sion, Switzerland</p>
                  </div>
                </div>

                {/* 📍 Spain - Barcelona */}
                <div className="flex flex-col bg-gray-50 rounded-3xl  overflow-hidden transition-shadow duration-300">
                  <Image
                    src="/images/barcelona.jpg"
                    alt="Barcelona, Spain"
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover"
                    unoptimized
                  />
                  <div className="p-6 ">
                    <p className="text-xl font-semibold text-darkBlue">
                      Spain - Barcelona
                    </p>
                    <p className="text-lg text-gray-700">Fincargo Iberia SL</p>
                    <p className="text-gray-600">Avenida Diagonal, 598</p>
                    <p className="text-gray-600">08021 Barcelona, Spain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    )
  );
}
