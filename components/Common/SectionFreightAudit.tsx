"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

/* -------------------- Inline Icons (no deps) -------------------- */
function IconChip(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 4v3M15 4v3M9 20v-3M15 20v-3M4 9h3M4 15h3M20 9h-3M20 15h-3" />
      <rect x="8" y="8" width="8" height="8" rx="1.5" />
    </svg>
  );
}
function IconLightning(props: React.SVGProps<SVGSVGElement>) {
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
function IconShieldCheck(props: React.SVGProps<SVGSVGElement>) {
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
function IconSearchDoc(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 3h7l4 4v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M15 3v4h4" />
      <circle cx="10.5" cy="13.5" r="2.5" />
      <path d="m14 17 2.5 2.5" />
    </svg>
  );
}
function IconDocStack(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 4h8l4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M14 4v4h4" />
      <path d="M8 12h8M8 16h8" />
    </svg>
  );
}
function IconFlow(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="12" cy="17" r="2.5" />
      <path d="M8 8.5c1.5 1 2.5 1.5 4 1.5s2.5-.5 4-1.5M12 14.5V12" />
    </svg>
  );
}
function IconReport(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h6M8 15h8" />
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
function IconMap(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M9 3l6 2 6-2v18l-6 2-6-2-6 2V3l6-2z" />
      <path d="M9 3v18M15 5v18" />
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
      <circle cx="12" cy="13" r="7" />
      <path d="M12 6V2M9 2h6" />
      <path d="M8 13a4 4 0 1 0 8 0" />
    </svg>
  );
}
function IconFuel(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="3" width="10" height="18" rx="2" />
      <path d="M7 7h2M17 7l3 3v7a3 3 0 1 1-6 0V7h3" />
    </svg>
  );
}
function IconDollarFile(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 3h7l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M15 3v4h4" />
      <path d="M12 13c-1.5 0-2.5-.8-2.5-2s1-2 2.5-2 2.5-.8 2.5-2-1-2-2.5-2" />
      <path d="M12 13v6" />
    </svg>
  );
}
function IconContract(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h8M8 15h5" />
      <path d="M13 15l3 3 3-3" />
    </svg>
  );
}
function IconDuplicate(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="9" y="9" width="10" height="10" rx="2" />
      <rect x="5" y="5" width="10" height="10" rx="2" />
    </svg>
  );
}
function IconClipboardCheck(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="4" y="4" width="16" height="18" rx="2" />
      <path d="M9 4h6v4H9z" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}
function IconTax(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="7.5" cy="7.5" r="2.5" />
      <path d="M4 20l16-16M13 17h7" />
    </svg>
  );
}

/* -------------------- Component -------------------- */
export default function SectionFreightAudit() {
  const { t, tl } = useTranslation();

  // Visibility animations
  const [v1, setV1] = useState(false);
  const [v2, setV2] = useState(false);
  const [v3, setV3] = useState(false);
  const [v4, setV4] = useState(false);
  const r1 = useRef<HTMLElement | null>(null);
  const r2 = useRef<HTMLElement | null>(null);
  const r3 = useRef<HTMLElement | null>(null);
  const r4 = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mk = (setter: (b: boolean) => void, el: HTMLElement | null) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && setter(true)),
        { threshold: 0.15 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    };

    const a = mk(setV1, r1.current);
    const b = mk(setV2, r2.current);
    const c = mk(setV3, r3.current);
    const d = mk(setV4, r4.current);

    return () => {
      a?.();
      b?.();
      c?.();
      d?.();
    };
  }, []);

  // i18n helpers
  const tf = (k: string, fb = "") => (t(k) === k ? fb : t(k));
  const ta = (k: string, fb: string[] = []) => {
    const arr = tl(k);
    return Array.isArray(arr) && arr.length ? arr : fb;
  };

  // Section 1
  const s1Title = tf("audit.section1.title", "Advanced AI-Driven Verification");
  const s1Desc = tf(
    "audit.section1.description",
    "Comprehensive freight audit capabilities powered by machine learning"
  );
  const s1Points = [
    {
      icon: <IconChip className="h-6 w-6" />,
      title: tf("audit.section1.point1.title", "AI Analysis"),
      content: tf(
        "audit.section1.point1.content",
        "Machine learning algorithms analyze invoices for accuracy and compliance"
      ),
      stat: "99.9%",
      statLabel: "accuracy",
    },
    {
      icon: <IconLightning className="h-6 w-6" />,
      title: tf("audit.section1.point2.title", "Instant Verification"),
      content: tf(
        "audit.section1.point2.content",
        "Real-time validation of freight charges, routes, and contract terms"
      ),
      stat: "<2s",
      statLabel: "latency",
    },
    {
      icon: <IconShieldCheck className="h-6 w-6" />,
      title: tf("audit.section1.point3.title", "Dispute Reduction"),
      content: tf(
        "audit.section1.point3.content",
        "Identify discrepancies early to prevent costly payment disputes"
      ),
      stat: "-75%",
      statLabel: "disputes",
    },
    {
      icon: <IconSearchDoc className="h-6 w-6" />,
      title: tf("audit.section1.point4.title", "Cost Optimization"),
      content: tf(
        "audit.section1.point4.content",
        "Identify overcharges and optimize freight spend across operations"
      ),
      stat: "3–7%",
      statLabel: "savings",
    },
  ];

  // Section 2
  const s2Title = tf("audit.section2.title", "How Freight Audit Works");
  const s2Steps = [
    {
      step: "01",
      icon: <IconDocStack className="h-6 w-6" />,
      title: tf("audit.section2.work1.title", "Document Ingestion"),
      content: tf(
        "audit.section2.work1.content",
        "Upload or integrate invoices, CMRs, and transport documents directly into the system"
      ),
    },
    {
      step: "02",
      icon: <IconFlow className="h-6 w-6" />,
      title: tf("audit.section2.work2.title", "AI Analysis"),
      content: tf(
        "audit.section2.work2.content",
        "Advanced algorithms verify rates, routes, weights, and contract compliance in seconds"
      ),
    },
    {
      step: "03",
      icon: <IconReport className="h-6 w-6" />,
      title: tf("audit.section2.work3.title", "Actionable Results"),
      content: tf(
        "audit.section2.work3.content",
        "Receive detailed audit reports with recommendations for approval or dispute resolution"
      ),
    },
  ];

  // Section 3
  const s3Title = tf("audit.section3.title", "Benefits for All Stakeholders");
  const s3CarriersTitle = tf("audit.section3.carriers.title", "For Carriers");
  const s3CarriersList = ta("audit.section3.carriers.list", [
    "Faster invoice approval and payment processing",
    "Reduced administrative overhead and manual reviews",
    "Improved cash flow with quicker payment cycles",
    "Transparency in billing and dispute resolution",
  ]);
  const s3FwdTitle = tf(
    "audit.section3.forwarders.title",
    "For Forwarders & Shippers"
  );
  const s3FwdList = ta("audit.section3.forwarders.list", [
    "Significant cost savings through overcharge detection",
    "Automated compliance verification and reporting",
    "Enhanced visibility into freight spend patterns",
    "Streamlined vendor management and negotiations",
  ]);

  // Section 4
  const s4Title = tf("audit.section4.title", "Comprehensive Audit Coverage");
  const s4Desc = tf(
    "audit.section4.description",
    "Our AI audits every aspect of your freight operations"
  );
  const s4List = ta("audit.section4.list", [
    "Rate Verification",
    "Route Optimization",
    "Weight & Dimension Validation",
    "Fuel Surcharge Accuracy",
    "Accessorial Charge Review",
    "Contract Compliance",
    "Duplicate Invoice Detection",
    "Delivery Confirmation Matching",
    "Tax & Regulatory Compliance",
  ]);

  // Mapping (optionnel) d’icônes par étiquette connue
  const coverageIcon = (label: string) => {
    const key = label.toLowerCase();
    if (key.includes("rate")) return <IconDollarFile className="h-5 w-5" />;
    if (key.includes("route")) return <IconMap className="h-5 w-5" />;
    if (key.includes("weight") || key.includes("dimension"))
      return <IconScale className="h-5 w-5" />;
    if (key.includes("fuel")) return <IconFuel className="h-5 w-5" />;
    if (key.includes("accessorial"))
      return <IconClipboardCheck className="h-5 w-5" />;
    if (key.includes("contract")) return <IconContract className="h-5 w-5" />;
    if (key.includes("duplicate")) return <IconDuplicate className="h-5 w-5" />;
    if (key.includes("delivery")) return <IconReport className="h-5 w-5" />;
    if (key.includes("tax") || key.includes("regulatory"))
      return <IconTax className="h-5 w-5" />;
    return <IconCheck className="h-5 w-5" />;
  };

  return (
    <>
      {/* ---------------- Section 1 (DARK): Advanced AI ---------------- */}
      <section
        id="freight-audit"
        ref={r1}
        className="relative bg-gradient-to-b from-darkBlue to-black py-24 md:py-32 text-white overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              FREIGHT AUDIT
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {s1Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/80">{s1Desc}</p>
          </div>

          <div
            className={`mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
              v1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {s1Points.map((p, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-white/[0.05] px-6 py-7 md:px-7 md:py-8 border border-white/10 ring-1 ring-white/10 shadow-2xl transition-all hover:bg-white/[0.07] hover:border-white/20"
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                {/* glow */}
                <div
                  className="pointer-events-none absolute -inset-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 blur-2xl" />
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    {p.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                          {p.title}
                        </span>
                      </h3>
                      {/* <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold ring-1 ring-white/15">
                        {p.stat}{" "}
                        <span className="text-white/70">{p.statLabel}</span>
                      </span> */}
                    </div>
                    <p className="mt-2 text-sm text-white/80 leading-relaxed">
                      {p.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Section 2 (WHITE): How it Works ---------------- */}
      <section ref={r2} className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
              WORKFLOW
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {s2Title}
            </h2>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${
              v2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {s2Steps.map((s, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition"
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                    {s.icon}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">
                        STEP {s.step}
                      </span>
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-slate-700">{s.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Section 3 (DARK): Benefits ---------------- */}
      <section
        ref={r3}
        className="relative bg-gradient-to-b from-darkBlue to-black py-20 md:py-28 text-white overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              BENEFITS
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {s3Title}
            </h2>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 transition-all duration-700 ${
              v3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Carriers */}
            <div className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <IconShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {s3CarriersTitle}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {s3CarriersList.map((li, idx) => (
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
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <IconReport className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{s3FwdTitle}</h3>
                  <ul className="mt-4 space-y-2">
                    {s3FwdList.map((li, idx) => (
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

      {/* ---------------- Section 4 (WHITE): Coverage ---------------- */}
      <section ref={r4} className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
              COVERAGE
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {s4Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-slate-700">{s4Desc}</p>
          </div>

          {/* Chips grid */}
          <div
            className={`mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 transition-all duration-700 ${
              v4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {s4List.map((label, i) => (
              <div
                key={`${label}-${i}`}
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition"
                style={{ transitionDelay: `${120 + (i % 6) * 50}ms` }}
              >
                <span className="inline-flex items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-200 p-2 text-slate-700">
                  {coverageIcon(label)}
                </span>
                <span className="text-sm md:text-base font-medium text-slate-800">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
