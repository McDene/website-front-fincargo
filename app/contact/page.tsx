"use client";

import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderSecondary from "@/components/Header/Secondary";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";
import { postAPI } from "@/lib/utils";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error during initial data fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

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
    setStatus("");
    try {
      const response = await postAPI("/api/contacts", formData);
      if (response) {
        setStatus("Message sent successfully!");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        setStatus("Failed to send the message.");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      setStatus("An error occurred. Please try again.");
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
              {/* Section de gauche : Titre et sous-titre */}
              <div className="flex flex-col ">
                <h2 className="text-6xl md:text-8xl font-bold mb-6">
                  Contact <span className="text-darkBlue">us</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-700 pb-5">
                  Do you have a question or want to get in touch with us? Fill
                  out the form below to contact us.
                </p>

                <p className="text-lg md:text-xl text-gray-700 pb-5">
                  You can also reach us at this email address:{" "}
                  <a
                    className="text-lightBlue hover:underline"
                    href="mailto:contact@fincargo.ai"
                  >
                    contact@fincargo.ai
                  </a>
                </p>
              </div>

              {/* Section de droite : Formulaire */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm md:text-lg">
                      Email
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
                    <label
                      htmlFor="subject"
                      className="block text-sm md:text-lg"
                    >
                      Subject
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
                    <label
                      htmlFor="message"
                      className="block text-sm md:text-lg"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full border border-darkBlue rounded-md px-4 py-3 mt-1"
                    ></textarea>
                  </div>
                  <div className="text-right">
                    <button
                      type="submit"
                      className="px-6 w-full md:px-10 py-3 bg-lightBlue text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-darkBlue"
                    >
                      Send
                    </button>
                  </div>
                  {status && <p className="text-center mt-4">{status}</p>}
                </form>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    )
  );
}
