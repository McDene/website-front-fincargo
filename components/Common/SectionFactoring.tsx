"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

/* -------------------- Inline Icons (no deps) -------------------- */
function IconBolt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}
function IconPercent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 5L5 19" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  );
}
function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4Z" />
      <path d="M9.5 12.5l2 2 3.5-3.5" />
    </svg>
  );
}
function IconLayers(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 2 9 5-9 5L3 7l9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}
function IconDoc(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6M9 9h3" />
    </svg>
  );
}
function IconClock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </svg>
  );
}
function IconBank(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 10h18M5 10v8M10 10v8M14 10v8M19 10v8M2 22h20M12 2 2 7h20L12 2Z" />
    </svg>
  );
}
function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-3.5-3.5" />
    </svg>
  );
}
function IconLock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function IconAlert(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
function IconScale(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3v18M3 7h18" />
      <path d="M7 7l-4 7h8l-4-7Z" />
      <path d="M21 7l-4 7h8l-4-7Z" />
    </svg>
  );
}
function IconPhone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.31 1.71.57 2.52a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.56-1.15a2 2 0 0 1 2.11-.45c.81.26 1.66.45 2.52.57A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={props.className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* -------------------- Component -------------------- */
export default function SectionFactoring() {
  const { t, tl } = useTranslation();

  const tf = (k: string, fb = "") => (t(k) === k ? fb : t(k));
  const ta = (k: string, fb: string[] = []) => {
    const arr = tl(k);
    return Array.isArray(arr) && arr.length ? arr : fb;
  };

  // Visibility per section
  const [v, setV] = useState([false, false, false, false, false]);
  const refs = [
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.forEach((r, idx) => {
      const el = r.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        (es) =>
          es.forEach(
            (e) =>
              e.isIntersecting &&
              setV((old) => old.map((b, i) => (i === idx ? true : b)))
          ),
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* -------------------- Section 1 (WHITE): Value -------------------- */
  const s1Title = tf("factoring.section1.title", "Accelerate Your Cash Flow");
  const s1Desc = tf(
    "factoring.section1.description",
    "Stop waiting for payments and focus on growing your transport business"
  );
  const s1Cards = [
    {
      icon: <IconBolt className="h-6 w-6" />,
      title: tf("factoring.section1.point1.title", "24-Hour Payment"),
      content: tf(
        "factoring.section1.point1.content",
        "Receive funds within 24 hours of invoice submission and approval"
      ),
      badge: "24h",
    },
    {
      icon: <IconPercent className="h-6 w-6" />,
      title: tf("factoring.section1.point2.title", "Competitive Rates"),
      content: tf(
        "factoring.section1.point2.content",
        "Low factoring rates from 0.10-0.15% per day plus minimal service fees"
      ),
      badge: "0.10–0.15%",
    },
    {
      icon: <IconShield className="h-6 w-6" />,
      title: tf("factoring.section1.point3.title", "Credit Protection"),
      content: tf(
        "factoring.section1.point3.content",
        "Built-in credit protection and risk assessment for your invoices"
      ),
      badge: "Protected",
    },
    {
      icon: <IconLayers className="h-6 w-6" />,
      title: tf("factoring.section1.point4.title", "Scalable Financing"),
      content: tf(
        "factoring.section1.point4.content",
        "Financing limits that grow with your business and transport volumes"
      ),
      badge: "Scalable",
    },
  ];

  /* -------------------- Section 2 (DARK): Process -------------------- */
  const s2Title = tf("factoring.section2.title", "Simple 3-Step Process");
  const s2Desc = tf(
    "factoring.section2.description",
    "From invoice to cash in your account within 24 hours"
  );
  const steps = [
    {
      n: 1,
      icon: <IconDoc className="h-5 w-5" />,
      title: tf("factoring.section2.step1.title", "Submit Invoice"),
      content: tf(
        "factoring.section2.step1.content",
        "Upload verified invoices via platform or API"
      ),
    },
    {
      n: 2,
      icon: <IconSearch className="h-5 w-5" />,
      title: tf("factoring.section2.step2.title", "Instant Approval"),
      content: tf(
        "factoring.section2.step2.content",
        "AI risk assessment and approval in minutes"
      ),
    },
    {
      n: 3,
      icon: <IconBank className="h-5 w-5" />,
      title: tf("factoring.section2.step3.title", "Get Paid"),
      content: tf(
        "factoring.section2.step3.content",
        "Funds wired to your bank within 24 hours"
      ),
    },
  ];

  /* -------------------- Section 3 (WHITE): Pricing -------------------- */
  const s3Title = tf("factoring.section3.title", "Transparent Pricing");
  const s3Desc = tf(
    "factoring.section3.description",
    "No hidden fees, no long-term contracts"
  );

  const rateTitle = tf("factoring.section3.factoring.title", "Factoring Rate");
  const rateData = tf("factoring.section3.factoring.data", "0.10% - 0.15%");
  const rateTime = tf("factoring.section3.factoring.time", "per day");
  const rateText = tf(
    "factoring.section3.factoring.content",
    "Competitive daily rates based on creditworthiness and invoice terms."
  );

  const feeTitle = tf("factoring.section3.service.title", "Service Fee");
  const feeData = tf("factoring.section3.service.data", "20 CHF");
  const feeTime = tf("factoring.section3.service.time", "per transaction");
  const feeText = tf(
    "factoring.section3.service.content",
    "One-time service fee per factored invoice."
  );

  const exTitle = tf("factoring.section3.exemple.title", "Example Calculation");
  const exD1 = tf("factoring.section3.exemple.data1", "10,000 CHF");
  const exC1 = tf("factoring.section3.exemple.content1", "Invoice Amount");
  const exD2 = tf("factoring.section3.exemple.data2", "35 CHF");
  const exC2 = tf(
    "factoring.section3.exemple.content2",
    "Total Cost (30 days @ 0.15%)"
  );
  const exD3 = tf("factoring.section3.exemple.data3", "9,945 CHF");
  const exC3 = tf("factoring.section3.exemple.content3", "You Receive");

  /* -------------------- Section 4 (DARK): Benefits by audience -------------------- */
  const s4Title = tf(
    "factoring.section4.title",
    "Benefits for Transport Companies"
  );
  const carriersTitle = tf("factoring.section4.carriers.title", "For Carriers");
  const carriersList = ta("factoring.section4.carriers.list", []);
  const fwdTitle = tf(
    "factoring.section4.forwarders.title",
    "For Forwarders & Shippers"
  );
  const fwdList = ta("factoring.section4.forwarders.list", []);

  /* -------------------- Section 5 (WHITE): Risk Management -------------------- */
  const s5Title = tf("factoring.section5.title", "Advanced Risk Management");
  const s5Desc = tf(
    "factoring.section5.description",
    "Comprehensive protection for both factoring clients and invoice payers"
  );
  const riskItems = [
    {
      icon: <IconScale className="h-6 w-6" />,
      title: tf("factoring.section5.item1.title", "Credit Assessment"),
      content: tf(
        "factoring.section5.item1.content",
        "Real-time creditworthiness evaluation of invoice payers"
      ),
    },
    {
      icon: <IconSearch className="h-6 w-6" />,
      title: tf("factoring.section5.item2.title", "Invoice Verification"),
      content: tf(
        "factoring.section5.item2.content",
        "AI-powered validation of invoice authenticity and accuracy"
      ),
    },
    {
      icon: <IconLock className="h-6 w-6" />,
      title: tf("factoring.section5.item3.title", "Payment Protection"),
      content: tf(
        "factoring.section5.item3.content",
        "Built-in protection against non-payment and defaults"
      ),
    },
    {
      icon: <IconAlert className="h-6 w-6" />,
      title: tf("factoring.section5.item4.title", "Fraud Detection"),
      content: tf(
        "factoring.section5.item4.content",
        "Advanced algorithms to detect and prevent fraudulent invoices"
      ),
    },
    {
      icon: <IconShield className="h-6 w-6" />,
      title: tf("factoring.section5.item5.title", "Legal Compliance"),
      content: tf(
        "factoring.section5.item5.content",
        "Full compliance with EU financial services regulations"
      ),
    },
    {
      icon: <IconPhone className="h-6 w-6" />,
      title: tf("factoring.section5.item6.title", "Collection Support"),
      content: tf(
        "factoring.section5.item6.content",
        "Professional collection services for overdue payments"
      ),
    },
  ];

  return (
    <>
      {/* ========== Section 1 (WHITE) ========== */}
      <section ref={refs[0]} className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/10">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
              FACTORING
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {s1Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-slate-700">{s1Desc}</p>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
              v[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {s1Cards.map((c, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition"
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {c.title}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-200">
                        {c.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-sm md:text-base text-slate-700">
                      {c.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 2 (DARK) ========== */}
      <section
        className="relative bg-gradient-to-b from-darkBlue to-black py-20 md:py-28 text-white overflow-hidden"
        ref={refs[1]}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              PROCESS
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {s2Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/80">{s2Desc}</p>
          </div>

          <ol
            className={`mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${
              v[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {steps.map((s, i) => (
              <li
                key={i}
                className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl"
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                {/* step number */}
                <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-2xl font-black">
                  {s.n}
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm md:text-base text-white/85">
                      {s.content}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ========== Section 3 (WHITE) ========== */}
      <section ref={refs[2]} className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/10">
              PRICING
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {s3Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-slate-700">{s3Desc}</p>
          </div>

          {/* Pricing cards */}
          <div
            className={`mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${
              v[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Rate */}
            <div className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                  <IconPercent className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-slate-900">
                    {rateTitle}
                  </h3>
                  <div className="mt-1 text-3xl md:text-4xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-lightBlue to-black bg-clip-text text-transparent">
                      {rateData}
                    </span>{" "}
                    <span className="text-base font-semibold text-slate-500">
                      {rateTime}
                    </span>
                  </div>
                  <p className="mt-2 text-sm md:text-base text-slate-700">
                    {rateText}
                  </p>
                </div>
              </div>
            </div>
            {/* Service Fee */}
            <div className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                  <IconDoc className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-slate-900">
                    {feeTitle}
                  </h3>
                  <div className="mt-1 text-3xl md:text-4xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-lightBlue to-black bg-clip-text text-transparent">
                      {feeData}
                    </span>{" "}
                    <span className="text-base font-semibold text-slate-500">
                      {feeTime}
                    </span>
                  </div>
                  <p className="mt-2 text-sm md:text-base text-slate-700">
                    {feeText}
                  </p>
                </div>
              </div>
            </div>
            {/* Example */}
            <div className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">{exTitle}</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-xs font-medium text-slate-600">
                    {exC1}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold tracking-tight">
                    {exD1}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-xs font-medium text-slate-600">
                    {exC2}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold tracking-tight">
                    {exD2}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-xs font-medium text-slate-600">
                    {exC3}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold tracking-tight">
                    {exD3}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <IconClock className="h-4 w-4" />
                <span>
                  Illustrative example; actual pricing varies by risk profile.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Section 4 (DARK) ========== */}
      <section
        className="relative bg-gradient-to-b from-darkBlue to-black py-20 md:py-28 text-white overflow-hidden"
        ref={refs[3]}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v[3] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              BENEFITS
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {s4Title}
            </h2>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 transition-all duration-700 ${
              v[3] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Carriers */}
            <article className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl">
              <h3 className="text-xl font-bold text-white">{carriersTitle}</h3>
              <ul className="mt-4 space-y-2">
                {carriersList.map((li, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-white/90"
                  >
                    <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15 p-1">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm md:text-base">{li}</span>
                  </li>
                ))}
              </ul>
            </article>
            {/* Forwarders & Shippers */}
            <article className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl">
              <h3 className="text-xl font-bold text-white">{fwdTitle}</h3>
              <ul className="mt-4 space-y-2">
                {fwdList.map((li, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-white/90"
                  >
                    <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15 p-1">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm md:text-base">{li}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ========== Section 5 (WHITE) ========== */}
      <section ref={refs[4]} className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v[4] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/10">
              RISK
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {s5Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-slate-700">{s5Desc}</p>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${
              v[4] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {riskItems.map((it, i) => (
              <article
                key={i}
                className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition"
                style={{ transitionDelay: `${120 + (i % 6) * 60}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                    {it.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {it.title}
                    </h3>
                    <p className="mt-2 text-slate-700">{it.content}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
