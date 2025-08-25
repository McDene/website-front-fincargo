"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

/* ---------- Icons (inline, no deps) ---------- */
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
function IconGlobe(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M2 12h20M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}
function IconSparkles(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 3l1.5 3 3 1.5-3 1.5L12 12l-1.5-3L7.5 7.5 10.5 6 12 3z" />
      <path
        d="M5 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z"
        opacity="0.55"
        transform="translate(7 4) scale(0.55)"
      />
    </svg>
  );
}
function IconFingerprint(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 11a4 4 0 0 1 4 4v2" />
      <path d="M12 7a8 8 0 0 1 8 8v2" />
      <path d="M12 15v4" />
      <path d="M7 12a5 5 0 0 1 5-5" />
      <path d="M5 12a7 7 0 0 1 7-7" />
    </svg>
  );
}
function IconTruck(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="17" cy="17.5" r="1.5" />
    </svg>
  );
}
function IconBuilding(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="3" width="14" height="18" rx="2" />
      <path d="M21 9v12M7 7h6M7 11h6M7 15h3" />
    </svg>
  );
}
function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ---------- Component ---------- */
export default function SectionECMR() {
  const { t, tl } = useTranslation();
  const [visA, setVisA] = useState(false);
  const [visB, setVisB] = useState(false);
  const [visC, setVisC] = useState(false);
  const refA = useRef<HTMLElement | null>(null);
  const refB = useRef<HTMLElement | null>(null);
  const refC = useRef<HTMLElement | null>(null);

  const tf = (key: string, fb = "") => (t(key) === key ? fb : t(key));
  const ta = (key: string, fb: string[] = []) => {
    const arr = tl(key);
    return Array.isArray(arr) && arr.length ? arr : fb;
  };

  // typos dans les clés: "secton1" & "secton3" → respectées avec fallback
  const title1 = tf("ecmr.section1.title", "Fully Digital Transport Documents");
  const desc1 = tf(
    "ecmr.secton1.description",
    "Compliant with eFTI regulations and ready for cross-border operations"
  );

  const title2 = tf(
    "ecmr.section2.title",
    "Benefits for All Transport Stakeholders"
  );
  const carriersTitle = tf("ecmr.section2.carrier.title", "For Carriers");
  const carriersList = ta("ecmr.section2.carrier.list", [
    "Eliminate paper handling and storage costs",
    "Real-time document status and tracking",
    "Faster proof of delivery and payment processing",
    "Reduced administrative burden",
  ]);
  const fwdTitle = tf(
    "ecmr.section2.forwarder.title",
    "For Forwarders & Shippers"
  );
  const fwdList = ta("ecmr.section2.forwarder.list", [
    "Complete visibility over shipment documentation",
    "Instant access to delivery confirmations",
    "Automated compliance with eFTI regulations",
    "Streamlined audit trails and reporting",
  ]);

  const title3 = tf("ecmr.section3.title", "Regulatory Compliance");
  const desc3 = tf(
    "ecmr.secton3.description",
    "Stay ahead of European transport digitalization requirements"
  );
  const eftiTitle = tf("ecmr.section3.efti.title", "eFTI Regulation");
  const eftiDesc = tf(
    "ecmr.section3.efti.description",
    "The European Electronic Freight Transport Information (eFTI) regulation mandates digital document acceptance across EU borders by August 2025."
  );
  const eftiList = ta("ecmr.section3.efti.list", [
    "Mandatory digital document acceptance",
    "Cross-border recognition",
    "Standardized data formats",
    "Real-time access requirements",
  ]);
  const iruTitle = tf("ecmr.section3.iru.title", "IRU 2007 Standard");
  const iruDesc = tf(
    "ecmr.section3.iru.description",
    "Our e-CMR implementation follows the International Road Transport Union's 2007 model, ensuring global compatibility."
  );
  const iruList = ta("ecmr.section3.iru.list", [
    "International recognition",
    "Legal validity across borders",
    "Standardized data structure",
    "Proven track record",
  ]);

  // Appear on scroll
  // Appear on scroll
  useEffect(() => {
    const mk = (setter: (v: boolean) => void, el: HTMLElement | null) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setter(true)),
        { threshold: 0.15 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    };

    const a = mk(setVisA, refA.current);
    const b = mk(setVisB, refB.current);
    const c = mk(setVisC, refC.current);

    return () => {
      a?.();
      b?.();
      c?.();
    };
  }, []);

  return (
    <>
      {/* -------- Section 1: Documents (WHITE) -------- */}
      <section
        id="ecmr"
        ref={refA}
        className="relative bg-white py-24 md:py-32"
      >
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div
          className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            visA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
            e-CMR
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            {title1}
          </h2>
          <p className="mt-3 text-lg md:text-xl text-slate-700">{desc1}</p>

          {/* Feature cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: <IconShield className="h-6 w-6" />,
                title: tf("ecmr.section1.document1.title", "eFTI Compliant"),
                content: tf(
                  "ecmr.section1.document1.content",
                  "Fully compliant with European Electronic Freight Transport Information regulation"
                ),
              },
              {
                icon: <IconGlobe className="h-6 w-6" />,
                title: tf("ecmr.section1.document2.title", "IRU 2007 Based"),
                content: tf(
                  "ecmr.section1.document2.content",
                  "Built on the internationally recognized IRU 2007 model for consistency"
                ),
              },
              {
                icon: <IconSparkles className="h-6 w-6" />,
                title: tf("ecmr.section1.document3.title", "Auto-Completed"),
                content: tf(
                  "ecmr.section1.document3.content",
                  "Automatically populated fields reduce manual data entry and errors"
                ),
              },
              {
                icon: <IconFingerprint className="h-6 w-6" />,
                title: tf("ecmr.section1.document4.title", "Fraud Resistant"),
                content: tf(
                  "ecmr.section1.document4.content",
                  "Advanced security features prevent document tampering and fraud"
                ),
              },
            ].map((c, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-7 md:py-8 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm transition-all hover:shadow-md"
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900">
                      <span className="bg-gradient-to-r from-lightBlue to-black bg-clip-text text-transparent">
                        {c.title}
                      </span>
                    </h3>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------- Section 2: Benefits (DARK GRADIENT) -------- */}
      <section
        ref={refB}
        className="relative bg-gradient-to-b from-darkBlue to-black py-20 md:py-28 text-white overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              visB ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              BENEFITS
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {title2}
            </h2>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 transition-all duration-700 ${
              visB ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Carriers */}
            <div className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 text-white">
                  <IconTruck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {carriersTitle}
                  </h3>
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
                </div>
              </div>
            </div>

            {/* Forwarders & Shippers */}
            <div className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 text-white">
                  <IconBuilding className="h-6 w-6" />
                </div>
                <div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------- Section 3: Compliance (WHITE) -------- */}
      <section ref={refC} className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              visC ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
              COMPLIANCE
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {title3}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-slate-700">{desc3}</p>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 transition-all duration-700 ${
              visC ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* eFTI */}
            <article className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-200">
                eFTI
              </div>
              <h3 className="text-xl font-bold text-slate-900">{eftiTitle}</h3>
              <p className="mt-2 text-slate-700">{eftiDesc}</p>
              <ul className="mt-4 space-y-2">
                {eftiList.map((li, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-slate-700"
                  >
                    <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-slate-50 ring-1 ring-slate-200 p-1">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm md:text-base">{li}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* IRU */}
            <article className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-700 ring-1 ring-cyan-200">
                IRU 2007
              </div>
              <h3 className="text-xl font-bold text-slate-900">{iruTitle}</h3>
              <p className="mt-2 text-slate-700">{iruDesc}</p>
              <ul className="mt-4 space-y-2">
                {iruList.map((li, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-slate-700"
                  >
                    <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-slate-50 ring-1 ring-slate-200 p-1">
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
    </>
  );
}
