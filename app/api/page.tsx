"use client";

import { useState, useEffect, useContext, useMemo, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Header from "@/components/Header/Main";
import HeroImage from "@/components/HeroImage";
import Api from "@/components/Api";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import SectionApiProcess from "@/components/Common/SectionApiProcess";

export default function ApiPage() {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const [heroData, setHeroData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  // Form state (same base as get-started, subject adapted)
  type FormState = {
    name: string;
    email: string;
    subject: string;
    message: string;
    company?: string;
    phone?: string;
    hp?: string; // honeypot
  };
  type FormErrors = Partial<Record<keyof FormState, string>>;
  const forcedSubject = "API integration partner request";
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: forcedSubject,
    message: "",
    company: "",
    phone: "",
    hp: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const startedAt = useMemo(() => Date.now(), []);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const fetchData = async () => {
      try {
        const [heroResponse, apiResponse] = await Promise.all([
          fetchAPI(
            "/api/hero-images?filters[Page][$eq]=Api&populate[Hero][populate]=Image",
            language
          ),
          fetchAPI("/api/api?populate=MultipleText", language),
        ]);

        setHeroData(heroResponse?.data?.[0]?.Hero || null);
        setApiData(apiResponse?.data || []);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        clearTimeout(loaderTimeout);
        setLoading(false);
      }
    };

    fetchData();

    return () => clearTimeout(loaderTimeout);
  }, [language]);

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const emailRegex =
    /^(?:[a-zA-Z0-9_'^&\-]+(?:\.[a-zA-Z0-9_'^&\-]+)*)@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = "Required";
    if (!emailRegex.test(formData.email)) e.email = "Invalid";
    if (!formData.subject.trim()) e.subject = "Required";
    if (!formData.message.trim() || formData.message.trim().length < 10)
      e.message = "Too short";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    if (isSubmitting) return;
    const elapsed = Date.now() - startedAt;
    if (formData.hp || elapsed < 800) return;
    if (!validate()) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setSubmitting(true);
    setStatus("");
    try {
      const res = await fetch("/internal-api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-started-at": String(startedAt),
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: forcedSubject,
          message: [
            formData.message,
            formData.company ? `\n\nCompany: ${formData.company}` : "",
            formData.phone ? `\nPhone: ${formData.phone}` : "",
          ].join(""),
          company: formData.company,
          phone: formData.phone,
          hp: formData.hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data && data.error) || "Request failed");
      setSuccess(true);
      setStatus("Message sent successfully.");
    } catch (e: unknown) {
      setStatus(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
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
        <Header />
        {heroData && <HeroImage heroImageData={heroData} />}
        {/* Process (private API) */}
        <SectionApiProcess />
        {/* CTA band */}
        <section className="relative py-10">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="rounded-3xl bg-gradient-to-r from-darkBlue to-black p-[1px]">
              <div className="rounded-3xl bg-white/95 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-darkBlue">
                    {t("api.cta.title")}
                  </h3>
                  <p className="text-slate-700 mt-1">{t("api.cta.desc")}</p>
                </div>
                <a
                  href="#api-partner-form"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 font-semibold shadow-lg ring-1 ring-blue-600/50"
                >
                  {t("api.cta.button")}
                </a>
              </div>
            </div>
          </div>
        </section>
        {apiData && <Api apiData={apiData} />}
        {/* API Integration Partner Contact Form */}
        <section id="api-partner-form" className="relative py-8 md:py-12 px-4">
          <div className="relative z-10 mx-auto w-full max-w-3xl">
            <div className="mb-4">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-darkBlue">
                {t("api.form.title")}
              </h3>
              <p className="text-slate-600 mt-1">{t("api.form.subtitle")}</p>
            </div>

            <div>
              {success ? (
                <div className="rounded-3xl border border-green-200 bg-green-50 p-6 md:p-8 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-green-500" />
                    <div>
                      <h4 className="text-lg font-semibold text-green-900">
                        Thank you! Your message has been sent.
                      </h4>
                      <p className="mt-1 text-green-800/90 text-sm">{status}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="relative rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-6 md:p-8 shadow-sm ring-1 ring-slate-900/5"
                  ref={formRef}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <Field label={t("name")} id="name" required error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={onChange}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        placeholder={t("name")}
                        aria-invalid={!!errors.name}
                      />
                    </Field>
                    <Field label={t("email")} id="email" required error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        placeholder="you@company.com"
                        aria-invalid={!!errors.email}
                      />
                    </Field>
                    <Field label="Company" id="company">
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={onChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        placeholder="Acme Logistics"
                      />
                    </Field>
                    <Field label="Phone" id="phone">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={onChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        placeholder="+41 79 773 7224"
                      />
                    </Field>
                    <Field label={t("message")} id="message" required error={errors.message} className="md:col-span-2">
                      <textarea
                        id="message"
                        name="message"
                        rows={8}
                        value={formData.message}
                        onChange={onChange}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        placeholder={t("message")}
                        aria-invalid={!!errors.message}
                      />
                    </Field>

                    {/* Honeypot */}
                    <div className="hidden">
                      <label htmlFor="hp">Leave this field empty</label>
                      <input id="hp" name="hp" value={formData.hp} onChange={onChange} />
                    </div>
                  </div>

                  {/* Status + Submit */}
                  <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-slate-500" role="status" aria-live="polite">
                      {status}
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white text-base font-semibold shadow-lg ring-1 ring-blue-600/50 transition hover:bg-blue-500 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <ClipLoader size={16} color="#fff" />
                          <span>{t("sending")}</span>
                        </>
                      ) : (
                        <>
                          <PaperAirplaneIcon className="h-5 w-5 rotate-12" />
                          <span>{t("send")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  );
}

function Field({
  label,
  id,
  required,
  error,
  className,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-rose-600">*</span>}
      </label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
