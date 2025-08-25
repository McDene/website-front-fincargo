"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header/Main";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";

import { useTranslation } from "@/hooks/useTranslation";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
  hp?: string; // honeypot
}

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ContactPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
    phone: "",
    hp: "",
  });

  // Simulated skeleton while header/hero mount
  useEffect(() => {
    const loaderTimeout = setTimeout(() => setShowLoader(true), 400);
    const done = setTimeout(() => setLoading(false), 800);
    return () => {
      clearTimeout(loaderTimeout);
      clearTimeout(done);
    };
  }, []);

  const startedAt = useMemo(() => Date.now(), []); // for time-to-submit heuristic

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
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!formData.name.trim()) e.name = "Required";
    if (!emailRegex.test(formData.email)) e.email = "Invalid";
    if (!formData.subject.trim()) e.subject = "Required";
    if (!formData.message.trim() || formData.message.trim().length < 10)
      e.message = "Too short";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const firstErrorRef = useRef<HTMLDivElement | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Honeypot or too-quick submit (likely bot)
    const elapsed = Date.now() - startedAt;
    if (formData.hp || elapsed < 1000) {
      return; // silently ignore
    }

    if (!validate()) {
      firstErrorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const res = await fetch("/internal-api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-started-at": String(startedAt),
        },
        body: JSON.stringify({
          // envoie en lower-case (le handler accepte aussi l'ancien format)
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
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
      if (res.ok && data?.ok) {
        setSuccess(true);
        setStatus("Message sent successfully! ✅");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          company: "",
          phone: "",
          hp: "",
        });
      } else {
        setStatus(data?.error || "Failed to send the message. ❌");
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
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
        <SectionHeroSmall />

        {/* Contact section */}
        <section className="relative py-16 md:py-28 px-4">
          {/* subtle background accents */}
          <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
            <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: intro + contacts */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-darkBlue uppercase">
                {t("contact_us")}
              </h2>
              <p className="mt-4 text-lg md:text-xl text-slate-700">
                {t("contact_text")}
              </p>
              <p className="mt-2 text-lg md:text-xl text-slate-700">
                {t("contact_subtext")}{" "}
                <a
                  className="text-blue-600 hover:underline"
                  href="mailto:contact@fincargo.ai"
                >
                  contact@fincargo.ai
                </a>
              </p>

              {/* Quick contacts */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="mailto:contact@fincargo.ai"
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-slate-900/5 hover:border-blue-300 transition"
                >
                  <EnvelopeIcon className="h-5 w-5 text-blue-700" />
                  <span className="text-slate-800">contact@fincargo.ai</span>
                </a>
                <a
                  href="tel:+41275551880"
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-slate-900/5 hover:border-blue-300 transition"
                >
                  <PhoneIcon className="h-5 w-5 text-blue-700" />
                  <span className="text-slate-800">+41 27 555 18 80</span>
                </a>
              </div>

              {/* Offices */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <Image
                    src="/images/sion.webp"
                    alt="Sion, Switzerland"
                    width={640}
                    height={400}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="text-base font-semibold text-darkBlue flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4" /> Switzerland — Sion
                    </p>
                    <p className="text-sm text-slate-700">Fincargo SA</p>
                    <p className="text-sm text-slate-600">
                      Rue de L’Industrie 23
                    </p>
                    <p className="text-sm text-slate-600">
                      1950 Sion, Switzerland
                    </p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <Image
                    src="/images/barcelona.jpg"
                    alt="Barcelona, Spain"
                    width={640}
                    height={400}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="text-base font-semibold text-darkBlue flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4" /> Spain — Barcelona
                    </p>
                    <p className="text-sm text-slate-700">Fincargo Iberia SL</p>
                    <p className="text-sm text-slate-600">
                      Avenida Diagonal, 598
                    </p>
                    <p className="text-sm text-slate-600">
                      08021 Barcelona, Spain
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div>
              {success ? (
                <SuccessPanel
                  message={status || "Message sent successfully!"}
                />
              ) : (
                <ContactForm
                  formData={formData}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  status={status}
                  onChange={onChange}
                  onSubmit={onSubmit}
                  firstErrorRef={firstErrorRef}
                  t={t}
                />
              )}
            </div>
          </div>
        </section>

        <Footer />
      </>
    )
  );
}

function SuccessPanel({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-green-200 bg-green-50 p-8 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 h-3 w-3 rounded-full bg-green-500" />
        <div>
          <h3 className="text-xl font-semibold text-green-900">
            Thank you! Your message has been sent.
          </h3>
          <p className="mt-1 text-green-800/90 text-sm">{message}</p>
          <p className="mt-4 text-sm text-green-800/80">
            We’ll get back to you shortly. For urgent matters, email{" "}
            <a className="underline" href="mailto:contact@fincargo.ai">
              contact@fincargo.ai
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactForm({
  formData,
  errors,
  isSubmitting,
  status,
  onChange,
  onSubmit,
  firstErrorRef,
  t,
}: {
  formData: FormState;
  errors: FormErrors;
  isSubmitting: boolean;
  status: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  firstErrorRef: React.RefObject<HTMLDivElement>;
  t: (key: string) => string;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-6 md:p-8 shadow-sm ring-1 ring-slate-900/5"
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
            placeholder="+41 27 555 18 80"
          />
        </Field>
        <Field
          label={t("subject")}
          id="subject"
          required
          error={errors.subject}
          className="md:col-span-2"
        >
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={onChange}
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            placeholder={t("subject")}
            aria-invalid={!!errors.subject}
          />
        </Field>
        <Field
          label={t("message")}
          id="message"
          required
          error={errors.message}
          className="md:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={6}
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

      {/* Error summary (first error anchor) */}
      <div
        ref={firstErrorRef}
        aria-live="polite"
        className="mt-2 text-sm text-rose-600"
      >
        {Object.values(errors)[0] && "Please fix the highlighted fields."}
      </div>

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
