"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

type IconName =
  | "invoice"
  | "factoring"
  | "audit"
  | "ecmr"
  | "payment"
  | "analytics";

interface FeatureItem {
  name: string;
  description: string;
  href: string;
  points?: string[];
  icon?: IconName;
}

interface SectionFeaturesProps {
  // conservés pour compat API, non nécessaires en thème clair
  gradientFromClass?: string;
  gradientToClass?: string;
}

/* ---------------- Inline icons (no external deps) ---------------- */

function IconInvoice(props: React.SVGProps<SVGSVGElement>) {
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
function IconFactoring(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 12h18" />
      <path d="M5 7h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
      <path d="M8 16v-4a2 2 0 1 1 4 0v4" />
      <path d="M12 16v-2a2 2 0 1 1 4 0v2" />
    </svg>
  );
}
function IconAudit(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 4h18" />
      <path d="M6 4v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4" />
      <path d="M9 10h6M9 14h6" />
      <path d="m9 20 2-2 2 2 2-2" />
    </svg>
  );
}
function IconECMR(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 7h13l5 5v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
      <path d="M16 7v5h5" />
      <path d="M7 13h7M7 17h5" />
    </svg>
  );
}
function IconPayment(props: React.SVGProps<SVGSVGElement>) {
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
function IconAnalytics(props: React.SVGProps<SVGSVGElement>) {
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
function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function FeatureIcon({ name }: { name?: IconName }) {
  const common = "h-6 w-6 md:h-7 md:w-7";
  switch (name) {
    case "invoice":
      return <IconInvoice className={common} />;
    case "factoring":
      return <IconFactoring className={common} />;
    case "audit":
      return <IconAudit className={common} />;
    case "ecmr":
      return <IconECMR className={common} />;
    case "payment":
      return <IconPayment className={common} />;
    case "analytics":
      return <IconAnalytics className={common} />;
    default:
      return <IconInvoice className={common} />;
  }
}

/* ---------------- Component (light theme / fond blanc) ---------------- */

export default function SectionFeatures({
  gradientFromClass,
  gradientToClass,
}: SectionFeaturesProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const { t, tl } = useTranslation();

  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const learnMore = tf("services.learn_more", "Learn more");
  const sectionLabel = tf("services.section", "Services");
  const title = tf("services.title", "Complete AI-Powered Transport Solution");
  const subtitle = tf(
    "services.description",
    "Five integrated modules designed to digitalize, optimize, and accelerate your transport operations with full regulatory compliance."
  );

  const features: FeatureItem[] = [
    {
      name: t("services.ecmr.title"),
      description: t("services.ecmr.description"),
      href: "/features/e-cmr",
      points: tl("services.ecmr.points"),
      icon: "ecmr",
    },
    {
      name: t("services.freight.title"),
      description: t("services.freight.description"),
      href: "/features/freight-audit",
      points: tl("services.freight.points"),
      icon: "audit",
    },
    {
      name: t("services.invoice.title"),
      description: t("services.invoice.description"),
      href: "/features/e-invoicing",
      points: tl("services.invoice.points"),
      icon: "invoice",
    },
    {
      name: t("services.factoring.title"),
      description: t("services.factoring.description"),
      href: "/features/factoring",
      points: tl("services.factoring.points"),
      icon: "factoring",
    },
    {
      name: t("services.analytics.title"),
      description: t("services.analytics.description"),
      href: "/features/analytics",
      points: tl("services.analytics.points"),
      icon: "analytics",
    },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      className="relative bg-white py-20 md:py-28"
    >
      {/* very subtle background accents (style Revolut) */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_20%,black,transparent)]">
        <div className="absolute -top-20 right-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />
        <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`max-w-3xl transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
            {sectionLabel.toUpperCase()}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            {title}
          </h2>
          <p className="mt-3 text-lg md:text-xl text-slate-600">{subtitle}</p>
        </div>

        {/* Features grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => (
            <a
              key={f.name}
              href={f.href}
              className={`group relative overflow-hidden rounded-2xl bg-white px-6 py-8 md:px-7 md:py-10 border border-slate-200 shadow-sm ring-1 ring-slate-900/5 transition-all duration-700 ease-out ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              } hover:shadow-md`}
              style={{ transitionDelay: `${150 + i * 120}ms` }}
              aria-label={`${f.name} – ${learnMore}`}
            >
              {/* subtle top edge sheen */}
              <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-slate-400/40 to-transparent" />
              {/* soft hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -inset-12 bg-gradient-to-tr from-blue-500/[0.06] to-cyan-500/[0.06] blur-2xl" />
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                  <FeatureIcon name={f.icon} />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    <span className="bg-gradient-to-r from-lightBlue to-black bg-clip-text text-transparent">
                      {f.name}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
                    {f.description}
                  </p>

                  {f.points && f.points.length > 0 && (
                    <ul
                      className="mt-4 space-y-2"
                      aria-label={`${f.name} highlights`}
                    >
                      {f.points.slice(0, 4).map((p, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-slate-50 ring-1 ring-slate-200 p-1 text-slate-700">
                            <IconCheck className="h-3.5 w-3.5" />
                          </span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-700">
                {learnMore}
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
