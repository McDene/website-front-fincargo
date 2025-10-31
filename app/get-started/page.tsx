"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Header from "@/components/Header/Secondary";
import Image from "next/image";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

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

export default function GetStartedPage() {
  const { t, tl } = useTranslation();
  const forcedSubject = "Get Started with Fincargo";

  // Steps from translations
  const steps = useMemo(
    () =>
      [1, 2, 3, 4, 5, 6].map((i) => {
        const arr = tl(`started.how.works.step${i}`);
        const [title, desc] = Array.isArray(arr) ? arr : ["", ""];
        return { n: i, title, desc } as const;
      }),
    [tl]
  );

  // Minimal form state
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
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const formWrapRef = useRef<HTMLDivElement | null>(null);
  const [stepsVisible, setStepsVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

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

  // Soft intro mount effect to match site UX
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(id);
  }, []);

  // Observe workflow + form to reveal smoothly on entry
  useEffect(() => {
    const entries: Array<[Element | null, (v: boolean) => void]> = [
      [stepsRef.current, setStepsVisible],
      [formWrapRef.current, setFormVisible],
    ];

    const obs = new IntersectionObserver(
      (list) => {
        list.forEach((e) => {
          if (!e.isIntersecting) return;
          entries.forEach(([el, set]) => {
            if (el && el === e.target) set(true);
          });
        });
      },
      { threshold: 0.12 }
    );

    entries.forEach(([el]) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Header />
      <SectionHeroSmall />

      {/* Intro section */}
      <section className="relative py-14 md:py-24 px-4">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Colonne gauche: Titre + texte */}
              <div className="md:col-span-2">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-darkBlue uppercase">
                  {t("started.title")}
                </h1>
                <div className="max-w-3xl">
                  <p className="mt-4 text-lg md:text-xl text-slate-700">
                    {t("started.ready")}
                  </p>
                  <p className="mt-2 text-lg md:text-xl text-slate-700">
                    {t("started.ous.team")}
                  </p>
                </div>
              </div>
              {/* Colonne droite: Illustration style "coin" (token) avec bordure issue de l'image */}
              <div className="hidden md:flex justify-end">
                {/* Illustration style "coin" (token) — flat (pas d'effet 3D) */}
                <div className="relative w-44 h-44 lg:w-60 lg:h-60 xl:w-72 xl:h-72 drop-shadow-2xl">
                  {/* Anneau externe utilisant l'image comme texture via mask en couronne */}
                  <div className="absolute inset-0 rounded-full bg-[url('/images/fincargo-get-started.png')] bg-cover bg-center [mask-image:radial-gradient(closest-side,transparent_calc(100%_-_12px),#000_calc(100%_-_12px))]" />
                  {/* Face interne contenant l'image */}
                  <div className="absolute inset-[12px] rounded-full overflow-hidden ring-1 ring-white/10">
                    <Image
                      src="/images/fincargo-get-started.png"
                      alt="Get started illustration"
                      width={560}
                      height={560}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  {/* Reflets pour effet métal/brillance (subtils) */}
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(80%_50%_at_25%_15%,rgba(255,255,255,0.35),rgba(255,255,255,0)_60%)]" />
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_200deg_at_50%_50%,rgba(255,255,255,0.18)_0deg,rgba(255,255,255,0.06)_110deg,rgba(0,0,0,0.0)_200deg,rgba(255,255,255,0.14)_360deg)] opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-8 md:py-10 px-4">
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div
            className={`flex flex-col justify-center transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-darkBlue">
              {t("started.how.works")}
            </h2>
            <p className="mt-3 text-slate-700 text-base md:text-lg">
              {t("started.how.works.desc")}
            </p>

            {/* Workflow en petites cartes horizontales qui wrap sans scroll */}
            <div
              ref={stepsRef}
              className={`mt-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 transition-all duration-700 ${
                stepsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              {steps.map((s, idx) => (
                <div
                  key={s.n}
                  className={`rounded-2xl border border-slate-200 bg-white/80 p-4 md:p-5 shadow-sm ring-1 ring-slate-900/5 will-change-transform transition-all duration-700 ${
                    stepsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-darkBlue text-white text-sm font-bold shadow-sm">
                      {s.n}
                    </span>
                    <h3 className="text-base md:text-lg font-semibold text-slate-900 line-clamp-2">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm md:text-base text-slate-700">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Sales form (placed after steps for top-to-bottom flow) */}
      <section className="relative py-4 md:py-8 px-4">
        <div
          ref={formWrapRef}
          className={`relative z-10 mx-auto w-full max-w-3xl transition-all duration-700 ${
            formVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-darkBlue">
              {t("started.contact.title")}
            </h3>
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
