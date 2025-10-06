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
      <path d="M9 7v4" />
      <path d="M15 7v4" />
      <path d="M7 11h10" />
      <path d="M12 15v6" />
      <path d="M8 15h8a3 3 0 0 0 3-3v-1H5v1a3 3 0 0 0 3 3Z" />
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
function IconSync(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 12a9 9 0 0 1-15.5 6.36" />
      <path d="M3 12A9 9 0 0 1 18.5 5.64" />
      <path d="M8 17l-2.5 1.5L7 21" />
      <path d="M16 7l2.5-1.5L17 3" />
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
      <rect x="1" y="7" width="13" height="8" rx="2" />
      <path d="M14 9h4l3 3v3h-7V9Z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 7h2M7 11h2M7 15h2M11 7h2M11 11h2M11 15h2M15 7h2M15 11h2M15 15h2" />
      <path d="M3 19h18" />
    </svg>
  );
}

export default function SectionIntegration() {
  const { t, tl } = useTranslation();

  const tf = (k: string, fb = "") => (t(k) === k ? fb : t(k));
  const ta = (k: string, fb: string[] = []) => {
    const arr = tl(k);
    return Array.isArray(arr) && arr.length ? arr : fb;
  };

  // Visibility per block
  const [visA, setVisA] = useState(false);
  const [visB, setVisB] = useState(false);
  const refA = useRef<HTMLElement | null>(null);
  const refB = useRef<HTMLElement | null>(null);

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

  /* ---------- Copy ---------- */
  const title = tf(
    "integration.title",
    "Integration — Reliable Bi-Directional Sync"
  );
  //   const subtitle = tf(
  //     "integration.subtitle",
  //     "Go live in weeks with unified, reliable connectivity to ERP, TMS, and Accounting—no CSVs, full write-back, enterprise-grade controls."
  //   );

  //   const featTitle = tf("integration.section1_title", "Key features");
  const groups = [
    {
      badge: "CONNECTORS",
      title: tf(
        "integration.section1_subtitle1",
        "Connectors (ERP/TMS/Accounting)"
      ),
      icon: <IconPlug className="h-6 w-6" />,
      points: ta("integration.section1.point1", [
        "Unified, resilient connectivity; no manual CSVs",
        "REST/GraphQL APIs, webhooks; SFTP fallback",
        "OAuth/SSO, retries & queuing, idempotent delta sync",
        "Multi-entity and multi-locale support",
      ]),
    },
    {
      badge: "MAPPING",
      title: tf("integration.section1_subtitle2", "Mapping & Normalization"),
      icon: <IconLayers className="h-6 w-6" />,
      points: ta("integration.section1.point2", [
        "Canonical data model and code-list alignment",
        "Validation rules with AI-assisted mapping suggestions",
        "Field-level transforms with version control",
        "Cleaner data, fewer mapping errors, faster onboarding",
      ]),
    },
    {
      badge: "WRITE-BACK",
      title: tf("integration.section1_subtitle3", "Write-Back Coverage"),
      icon: <IconSync className="h-6 w-6" />,
      points: ta("integration.section1.point3", [
        "Keep ERP/TMS/Accounting the source of truth",
        "Bi-directional write-back incl. IDs/series, ACK/status, AR/AP",
        "Reconciliation reports and coverage SLAs",
        "Less month-end reconciliation, one truth across systems",
      ]),
    },
    {
      badge: "OBSERVABILITY",
      title: tf("integration.section1_subtitle4", "Observability & SLAs"),
      icon: <IconRadar className="h-6 w-6" />,
      points: ta("integration.section1.point4", [
        "End-to-end dashboards (flow, latency, retries)",
        "Proactive alerting, runbooks, safe rollbacks (CI/CD)",
        "Uptime/MTTR SLAs for predictable reliability",
        "Issues found and fixed before users notice",
      ]),
    },
    {
      badge: "SECURITY",
      title: tf("integration.section1_subtitle5", "Access & Compliance"),
      icon: <IconShield className="h-6 w-6" />,
      points: ta("integration.section1.point5", [
        "RBAC, least-privilege access, audit logs",
        "Encryption in transit/at rest, IP allow-listing",
        "GDPR alignment, residency options, retention & key management",
        "Audit-ready posture and reduced risk",
      ]),
    },
  ];

  const benTitle = tf("integration.section2.title", "Benefits");
  const carriersTitle = tf("integration.section2.carrier.title", "Carriers");
  const carriersList = ta("integration.section2.carrier.point", [
    "Connect once; operate across systems",
    "Replace CSVs with real-time exchange",
    "Normalize data; reduce back-office errors",
    "Security and compliance built-in",
  ]);
  const fwdTitle = tf(
    "integration.section2.forwarder.title",
    "Forwarders & Shippers"
  );
  const fwdList = ta("integration.section2.forwarder.point", [
    "One source of truth via write-back",
    "Accelerate go-lives with prebuilt connectors",
    "Reliable flows with proactive observability",
    "Audit-ready posture and evidence retention",
  ]);

  const BadgeDark = ({ label }: { label: string }) => (
    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90 ring-1 ring-white/15">
      {label}
    </div>
  );

  const cardLight =
    "group relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-7 md:py-8 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm transition-all hover:shadow-md";

  return (
    <>
      {/* -------- Section 1: Features (DARK) -------- */}
      <section
        id="integration"
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
            INTEGRATION
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
            {title}
          </h2>
          {/* <p className="mt-3 text-lg md:text-xl text-white/90">{subtitle}</p> */}

          {/* Feature grids */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {groups.slice(0, 3).map((c, i) => (
              <article
                key={i}
                className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-7 md:py-8 border border-white/10 ring-1 ring-white/10 shadow-2xl"
              >
                <BadgeDark label={c.badge} />
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 text-white">
                    {c.icon}
                  </div>
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
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
            {groups.slice(3).map((c, i) => (
              <article
                key={i}
                className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-7 md:py-8 border border-white/10 ring-1 ring-white/10 shadow-2xl"
              >
                <BadgeDark label={c.badge} />
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 text-white">
                    {c.icon}
                  </div>
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
            {benTitle}
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
