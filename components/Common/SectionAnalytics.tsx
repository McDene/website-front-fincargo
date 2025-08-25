"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

/* -------------------- Inline Icons (no deps) -------------------- */
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
function IconTrend(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  );
}
function IconPie(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21.21 15.89A10 10 0 1 1 12 2v10l9.21 3.89z" />
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
      <circle cx="6" cy="5" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M8 5h5a3 3 0 0 1 3 3v6" />
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
      <path d="M5 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" />
      <path d="M19 11l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
      <path d="M11 20l1 .5L12.5 22 11 21.5 9.5 22 10 20.5 9 20h2z" />
    </svg>
  );
}
function IconDatabase(props: React.SVGProps<SVGSVGElement>) {
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
    </svg>
  );
}
function IconRefresh(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
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
function IconBell(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a2 2 0 0 0 3.4 0" />
    </svg>
  );
}
function IconGrid(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function IconCalendar(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function IconDownload(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
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
export default function SectionAnalytics() {
  const { t, tl } = useTranslation();
  const tf = (k: string, fb = "") => (t(k) === k ? fb : t(k));
  const ta = (k: string, fb: string[] = []) => {
    const arr = tl(k);
    return Array.isArray(arr) && arr.length ? arr : fb;
  };

  // visibility per section
  const [v, setV] = useState([false, false, false, false]);

  // refs stables
  const r0 = useRef<HTMLElement | null>(null);
  const r1 = useRef<HTMLElement | null>(null);
  const r2 = useRef<HTMLElement | null>(null);
  const r3 = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const list = [r0, r1, r2, r3];
    const observers: IntersectionObserver[] = [];

    list.forEach((r, idx) => {
      const el = r.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) =>
          entries.forEach(
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
  }, [r0, r1, r2, r3]); // ✅ deps stables, plus de warning

  /* ---------------- Section 1 (DARK) — Feature grid ---------------- */
  const s1Title = tf(
    "analytic.section1.title",
    "Comprehensive Business Intelligence"
  );
  const s1Desc = tf(
    "analytic.section1.description",
    "Transform your transport data into actionable business insights"
  );
  const s1Cards = [
    {
      icon: <IconChart className="h-6 w-6" />,
      title: tf("analytic.section1.point1.title", "Real-time Dashboards"),
      content: tf(
        "analytic.section1.point1.content",
        "Live performance metrics updated automatically"
      ),
    },
    {
      icon: <IconTrend className="h-6 w-6" />,
      title: tf("analytic.section1.point2.title", "Trend Analysis"),
      content: tf(
        "analytic.section1.point2.content",
        "Identify patterns in costs, revenues, and efficiency"
      ),
    },
    {
      icon: <IconPie className="h-6 w-6" />,
      title: tf("analytic.section1.point3.title", "Cost Breakdown"),
      content: tf(
        "analytic.section1.point3.content",
        "Detailed view of operational costs"
      ),
    },
    {
      icon: <IconGrid className="h-6 w-6" />,
      title: tf("analytic.section1.point4.title", "Performance KPIs"),
      content: tf(
        "analytic.section1.point4.content",
        "Track key logistics KPIs"
      ),
    },
    {
      icon: <IconRoute className="h-6 w-6" />,
      title: tf("analytic.section1.point5.title", "Route Optimization"),
      content: tf(
        "analytic.section1.point5.content",
        "Analyze route efficiency"
      ),
    },
    {
      icon: <IconSparkles className="h-6 w-6" />,
      title: tf("analytic.section1.point6.title", "Predictive Insights"),
      content: tf("analytic.section1.point6.content", "AI-powered forecasting"),
    },
  ];

  /* ---------------- Section 2 (WHITE) — KPI categories ---------------- */
  const s2Title = tf("analytic.section2.title", "Essential Transport Metrics");
  const s2Desc = tf(
    "analytic.section2.description",
    "Monitor the KPIs that matter most"
  );
  const s2Groups = [
    {
      title: tf("analytic.section2.point1.title", "Financial Metrics"),
      items: ta("analytic.section2.point1.list"),
    },
    {
      title: tf("analytic.section2.point2.title", "Operational Metrics"),
      items: ta("analytic.section2.point2.list"),
    },
    {
      title: tf("analytic.section2.point3.title", "Customer Metrics"),
      items: ta("analytic.section2.point3.list"),
    },
    {
      title: tf("analytic.section2.point4.title", "Compliance Metrics"),
      items: ta("analytic.section2.point4.list"),
    },
  ];

  /* ---------------- Section 3 (DARK) — Integrated platform ---------------- */
  const s3Title = tf(
    "analytic.section3.title",
    "Fully Integrated Data Platform"
  );
  const s3Desc = tf(
    "analytic.section3.description",
    "All your transport data synchronized in one platform"
  );
  // Paire bold/regular (les clés fournies mélangent point1/point2 + bold/regular)
  const s3Pairs = [1, 2, 3, 4, 5]
    .map((i) => {
      const bold = tf(`analytic.section3.point1.item${i}.bold`, "");
      const regular = tf(`analytic.section3.point2.item${i}.regular`, "");
      return bold || regular ? { bold, regular } : null;
    })
    .filter(Boolean) as { bold: string; regular: string }[];

  const updTitle = tf("analytic.section3.update.title", "Real-time Updates");
  const updDesc = tf(
    "analytic.section3.update.description",
    "Analytics automatically update as new documents are processed, invoices are paid, and transport operations are completed."
  );
  const updStats = [
    {
      data: tf("analytic.section3.update.data1", "< 1min"),
      label: tf("analytic.section3.update.content1", "Data refresh time"),
      icon: <IconRefresh className="h-5 w-5" />,
    },
    {
      data: tf("analytic.section3.update.data2", "24/7"),
      label: tf("analytic.section3.update.content2", "Monitoring"),
      icon: <IconClock className="h-5 w-5" />,
    },
  ];

  /* ---------------- Section 4 (WHITE) — Roles + Reporting/Export ---------------- */
  const s4Title = tf("analytic.section4.title", "Analytics for Every Role");
  const carriersTitle = tf("analytic.section4.carriers.title", "For Carriers");
  const carriersList = ta("analytic.section4.carriers.list");
  const fwdTitle = tf(
    "analytic.section4.forwarders.title",
    "For Forwarders & Shippers"
  );
  const fwdList = ta("analytic.section4.forwarders.list");

  // Reporting & export (typos: analytics.section4.*)
  const repTitle = tf("analytic.section5.title", "Flexible Reporting & Export");
  const repDesc = tf(
    "analytic.section5.description",
    "Generate custom reports and export data in multiple formats"
  );
  const repItems = [
    {
      title: tf("analytics.section4.item1.title", "Custom Dashboards"),
      content: tf(
        "analytics.section4.item1.content",
        "Build personalized views with drag-and-drop widgets"
      ),
      icon: <IconGrid className="h-6 w-6" />,
    },
    {
      title: tf("analytics.section4.item2.title", "Scheduled Reports"),
      content: tf(
        "analytics.section4.item2.content",
        "Automated daily, weekly, or monthly delivery"
      ),
      icon: <IconCalendar className="h-6 w-6" />,
    },
    {
      title: tf("analytics.section4.item3.title", "Data Export"),
      content: tf(
        "analytics.section4.item3.content",
        "Export to Excel, PDF, CSV, or API"
      ),
      icon: <IconDownload className="h-6 w-6" />,
    },
    {
      title: tf("analytics.section4.item4.title", "Alert System"),
      content: tf(
        "analytics.section4.item4.content",
        "Real-time notifications for threshold breaches"
      ),
      icon: <IconBell className="h-6 w-6" />,
    },
  ];

  return (
    <>
      {/* ========== Section 1 (DARK) ========== */}
      <section
        ref={r0}
        className="relative bg-gradient-to-b from-darkBlue to-black py-20 md:py-28 text-white overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              ANALYTICS
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {s1Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/80">{s1Desc}</p>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${
              v[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {s1Cards.map((c, i) => (
              <article
                key={i}
                className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl"
                style={{ transitionDelay: `${120 + i * 70}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{c.title}</h3>
                    <p className="mt-2 text-sm md:text-base text-white/85">
                      {c.content}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 2 (WHITE) ========== */}
      <section ref={r1} className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/10">
              KPIs
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {s2Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-slate-700">{s2Desc}</p>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
              v[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {s2Groups.map((g, i) => (
              <article
                key={i}
                className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition"
                style={{ transitionDelay: `${120 + i * 70}ms` }}
              >
                <h3 className="text-lg font-bold text-slate-900">{g.title}</h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((li, idx) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 3 (DARK) ========== */}
      <section
        ref={r2}
        className="relative bg-gradient-to-b from-darkBlue to-black py-20 md:py-28 text-white overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              DATA PLATFORM
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {s3Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/80">{s3Desc}</p>
          </div>

          <div
            className={`mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${
              v[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Sources synchronisées */}
            <article className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl lg:col-span-2">
              <h3 className="text-xl font-bold">
                {tf(
                  "analytic.section3.point1.title",
                  "Synchronized Data Sources"
                )}
              </h3>
              <ul className="mt-4 space-y-2">
                {s3Pairs.map((p, idx) => (
                  <li key={idx} className="text-white/90 text-sm md:text-base">
                    <span className="font-semibold">{p.bold}</span>
                    <span>{p.regular}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 text-sm text-white/80">
                <IconDatabase className="h-5 w-5" />
                <span>{tf("analytic.section3.update.description", "")}</span>
              </div>
            </article>

            {/* Mises à jour temps réel */}
            <article className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl">
              <h3 className="text-xl font-bold">{updTitle}</h3>
              <p className="mt-2 text-white/85 text-sm md:text-base">
                {updDesc}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {updStats.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white/10 ring-1 ring-white/15 p-4"
                  >
                    <div className="flex items-center gap-2">
                      {s.icon}
                      <div className="text-2xl font-black">{s.data}</div>
                    </div>
                    <div className="mt-1 text-xs text-white/80">{s.label}</div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========== Section 4 (WHITE) ========== */}
      <section ref={r3} className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v[3] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/10">
              ROLES & REPORTING
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {s4Title}
            </h2>
          </div>

          {/* Rôles */}
          <div
            className={`mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 transition-all duration-700 ${
              v[3] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <article className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm">
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
            </article>

            <article className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">{fwdTitle}</h3>
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
            </article>
          </div>

          {/* Reporting & Export */}
          <div className="mt-8">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {repTitle}
              </h3>
              <p className="mt-2 text-slate-700">{repDesc}</p>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {repItems.map((it, i) => (
                <article
                  key={i}
                  className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                      {it.icon}
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-slate-900">
                        {it.title}
                      </h4>
                      <p className="mt-2 text-sm md:text-base text-slate-700">
                        {it.content}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
