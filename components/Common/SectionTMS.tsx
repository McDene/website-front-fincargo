"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

/* ---------------- Icons (inline, no deps) ---------------- */
function IconPlug(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M7 7l10 10" />
      <path d="M9 3v6M15 15v6" />
      <rect x="3" y="9" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
    </svg>
  );
}
function IconRoute(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="4" cy="6" r="1.5" />
      <circle cx="20" cy="18" r="1.5" />
      <path d="M5.5 6C10 6 10 10 14.5 10S19 14 19 18" />
    </svg>
  );
}
function IconRadar(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 3v9l6 6" />
      <circle cx="12" cy="12" r="3" />
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
function IconChart(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 3v18h18" />
      <path d="M7 17v-6" />
      <path d="M12 17v-10" />
      <path d="M17 17v-3" />
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
function IconCard(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </svg>
  );
}
function IconBadge(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 3l3 6 6 .9-4.5 4.3 1 6-5.5-3-5.5 3 1-6L3 9.9 9 9l3-6z" />
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
      <path d="M3 8h10v7H3zM13 11h4l3 3v1h-7z" />
      <circle cx="7.5" cy="17.5" r="1.4" />
      <circle cx="17" cy="17.5" r="1.4" />
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

/* ---------------- Component ---------------- */
export default function SectionTMS() {
  const { t, tl } = useTranslation();
  const [visA, setVisA] = useState(false); // dark
  const [visB, setVisB] = useState(false); // white
  const refA = useRef<HTMLElement | null>(null);
  const refB = useRef<HTMLElement | null>(null);

  const tf = (key: string, fb = "") => (t(key) === key ? fb : t(key));
  const ta = (key: string, fb: string[] = []) => {
    const arr = tl(key);
    return Array.isArray(arr) && arr.length ? arr : fb;
  };

  /* ---------- Section 1 data (AI-Powered TMS) ---------- */
  const title1 = tf("tms.section1.title", "AI-Powered TMS");
  const lead1 = tf(
    "tms.section1.lead",
    "Fincargo TMS optimizes routes, tracks every load, and digitizes documents in a single platform."
  );

  const cap = {
    connectivity: {
      title: tf("tms.section1.connectivity.title", "Plug & Play Connectivity"),
      points: ta("tms.section1.connectivity.points"),
      icon: <IconPlug className="h-6 w-6" />,
      badge: "CONNECT",
    },
    optimization: {
      title: tf("tms.section1.optimization.title", "Route & Load Optimization"),
      points: ta("tms.section1.optimization.points"),
      icon: <IconRoute className="h-6 w-6" />,
      badge: "OPTIMIZE",
    },
    tracktrace: {
      title: tf("tms.section1.tracktrace.title", "Track & Trace in Real Time"),
      points: ta("tms.section1.tracktrace.points"),
      icon: <IconRadar className="h-6 w-6" />,
      badge: "VISIBILITY",
    },
    docs: {
      title: tf("tms.section1.docs.title", "Native e-CMR & e-Invoicing"),
      points: ta("tms.section1.docs.points"),
      icon: <IconDoc className="h-6 w-6" />,
      badge: "DOCUMENTS",
    },
    analytics: {
      title: tf(
        "tms.section1.analytics.title",
        "Analytics & Performance Management"
      ),
      points: ta("tms.section1.analytics.points"),
      icon: <IconChart className="h-6 w-6" />,
      badge: "INSIGHTS",
    },
    iris: {
      title: tf("tms.section1.iris.title", "Iris AI Assistance"),
      points: ta("tms.section1.iris.points"),
      icon: <IconSparkles className="h-6 w-6" />,
      badge: "AI",
    },
    finance: {
      title: tf("tms.section1.finance.title", "Finance-Ready by Design"),
      points: ta("tms.section1.finance.points"),
      icon: <IconCard className="h-6 w-6" />,
      badge: "FINANCE",
    },
    why: {
      title: tf("tms.section1.why.title", "Why Choose Fincargo TMS?"),
      points: ta("tms.section1.why.points"),
      icon: <IconBadge className="h-6 w-6" />,
    },
  };

  /* ---------- Section 2 data (Benefits) ---------- */
  const title2 = tf("tms.section2.title", "Benefits of Fincargo TMS");
  const carriersTitle = tf("tms.section2.carriers.title", "For Carriers");
  const carriersList = ta("tms.section2.carriers.points");
  const fwdTitle = tf(
    "tms.section2.forwarders.title",
    "For Forwarders & Shippers"
  );
  const fwdList = ta("tms.section2.forwarders.points");

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
    return () => {
      a?.();
      b?.();
    };
  }, []);

  // badges
  const BadgeDark = ({ label }: { label: string }) => (
    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90 ring-1 ring-white/15">
      {label}
    </div>
  );

  // card base
  const cardLight =
    "group relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-7 md:py-8 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm transition-all hover:shadow-md";

  return (
    <>
      {/* -------- Section 1: AI-Powered TMS (DARK GRADIENT) -------- */}
      <section
        id="tms"
        ref={refA}
        className="relative bg-gradient-to-b from-darkBlue to-black py-20 md:py-28 text-white overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>

        <div
          className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            visA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            TMS
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
            {title1}
          </h2>
          <p className="mt-3 text-lg md:text-xl text-white/90">{lead1}</p>

          {/* Grid #1 */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[cap.connectivity, cap.optimization, cap.tracktrace, cap.docs].map(
              (c, i) => (
                <article
                  key={i}
                  className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-7 md:py-8 border border-white/10 ring-1 ring-white/10 shadow-2xl"
                >
                  <BadgeDark label={c.badge} />
                  <div className="flex items-start gap-3">
                    {/* <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 text-white">

                    </div> */}
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                          {c.title}
                        </span>
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {c.points.map((p, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-white/90"
                          >
                            <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15 p-1">
                              <IconCheck className="h-3.5 w-3.5" />
                            </span>
                            <span className="text-sm md:text-[15px] leading-relaxed">
                              {p}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>

          {/* Grid #2 */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[cap.analytics, cap.iris, cap.finance].map((c, i) => (
              <article
                key={i}
                className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-7 md:py-8 border border-white/10 ring-1 ring-white/10 shadow-2xl"
              >
                <BadgeDark label={c.badge} />
                <div className="flex items-start gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                        {c.title}
                      </span>
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {c.points.map((p, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-white/90"
                        >
                          <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15 p-1">
                            <IconCheck className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-sm md:text-[15px] leading-relaxed">
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Why Choose */}
          <article className="mt-6 relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-9 border border-white/10 ring-1 ring-white/10 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 text-white">
                {cap.why.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {cap.why.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {cap.why.points.map((p, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-white/90"
                    >
                      <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15 p-1">
                        <IconCheck className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm md:text-base leading-relaxed">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* -------- Section 2: Benefits (WHITE) -------- */}
      <section ref={refB} className="relative bg-white py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div
          className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            visB ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
            BENEFITS
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            {title2}
          </h2>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Carriers */}
            <div className={cardLight}>
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                  <IconTruck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {carriersTitle}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {carriersList.map((li, idx) => (
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
                </div>
              </div>
            </div>

            {/* Forwarders & Shippers */}
            <div className={cardLight}>
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                  <IconBuilding className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {fwdTitle}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {fwdList.map((li, idx) => (
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
