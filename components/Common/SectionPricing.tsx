"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

type PlanKey = "starter" | "growth" | "unlimited";

interface SectionPricingProps {
  id?: string;
}

export default function SectionPricing({
  id = "pricing",
}: SectionPricingProps) {
  const [visible, setVisible] = useState(false);
  const [activePlan, setActivePlan] = useState<PlanKey>("growth"); // mobile toggle
  const ref = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();

  // fallback helper
  const tf = (key: string, fallback = "") => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  // Header content
  const title = tf(
    "pricing.title",
    "Transparent Pricing for Road Transportation"
  );
  const subtitle = tf(
    "picing.description",
    "Choose the plan that fits your business size. All plans include our four core services: e-CMR/e-PoD, e-Invoicing, freight audit, and factoring."
  );

  // Currency & cadence (typo priciing.time)
  const currency = tf("pricing.currency", "CHF");
  const cadence = tf("priciing.time", "/month/user");

  // Plan meta
  const plans: Record<
    PlanKey,
    { title: string; desc: string; price: string; popular?: boolean }
  > = {
    starter: {
      title: tf("pricing.starter.title", "Starter"),
      desc: tf("pricing.starter.description", "Carriers & small forwarders"),
      price: tf("pricing.starter.price", "199"),
    },
    growth: {
      title: tf("pricing.growth.title", "Growth"),
      desc: tf("pricing.growth.description", "Medium forwarders"),
      price: tf("pricing.growth.price", "499"),
      popular: true, // Growth = most popular
    },
    unlimited: {
      title: tf("pricing.unlimited.title", "Unlimited"),
      desc: tf("pricing.unlimited.description", "Large forwarders & shippers"),
      price: tf("pricing.unlimited.price", "On-demand"),
    },
  };

  // Feature row labels
  const featuresLabels = [
    tf("pricing.feature1", "e-CMR & e-PoD"),
    tf("pricing.feature2", "Invoice Verification"),
    tf("pricing.feature3", "e-Invoicing"),
    tf("pricing.feature4", "Factoring"),
    tf("pricing.feature5", "Support"),
    // tf("pricing.feature6", "Transactional Fee"),
    // tf("pricing.feature7", "Integration & Calibration"),
  ];

  // Values by plan & row (1..7)
  const value = (plan: PlanKey, idx: number) =>
    tf(`pricing.${plan}.features${idx + 1}`, "");

  // CTAs & labels (incl. typos demandées)
  const ctaGetStarted = tf("pricing.get_started", "Get started");
  const badge7d = tf("princing.starter_7_days_free", "7 days free trial");
  const ctaContact = tf("prining.starter_contact_sales", "Contact sales");
  const mostPopular = tf("pricing.most_popular", "Most popular");
  const footnote = tf(
    "princing.more_details",
    "Credit card required for automated billing after trial"
  );

  // Free trial card (15 days)
  const freeCard = {
    title: tf("princing.free.title", "Free Trial"),
    desc: tf("princing.free.description", "Small carriers"),
    bullets: [
      [
        tf("princing.free.feature1.title", "e-CMR/e-PoD"),
        tf("princing.free.feature1.detail", "10 docs/month"),
      ],
      [
        tf("princing.free.feature2.title", "Duration"),
        tf("princing.free.feature2.detail", "15 days"),
      ],
      [
        tf("princing.free.feature3.title", "Support"),
        tf("princing.free.feature3.detail", "Iris Support"),
      ],
      [
        tf("princing.free.feature4.title", "Invoice Verification"),
        tf("princing.free.feature4.detail", "Basic AI-powered"),
      ],
      [
        tf("princing.free.feature5.title", "Factoring"),
        tf("princing.free.feature5.detail", "0.10-0.15%/day"),
      ],
    ],
    cta: tf("princing.starter.free_trial", "Start Free trial"),
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className="relative bg-white py-24 md:py-32">
      {/* subtle accents */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`max-w-3xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
            PRICING
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            {title}
          </h2>
          <p className="mt-3 text-lg md:text-xl text-slate-600">{subtitle}</p>
        </div>

        {/* Free Trial Card */}
        <div
          className={`mt-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-6 md:px-8 md:py-7 border border-slate-200 ring-1 ring-slate-900/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-200">
                  {freeCard.title} —{" "}
                  {tf("princing.free.feature2.detail", "15 days")}
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {freeCard.desc}
                </h3>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700">
                  {freeCard.bullets.map(([k, v], idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4" />
                      <span>
                        <span className="font-medium">{k}</span>
                        {v ? (
                          <span className="text-slate-500"> — {v}</span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <a
                  href="https://platform.fincargo.ai/login"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                >
                  {freeCard.cta}
                </a>
                {/* <p className="text-xs text-slate-500">{footnote}</p> */}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- MOBILE / TABLET (lg-) : Cards with Tabs ---------- */}
        <div
          className={`mt-10 lg:hidden transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {/* Tabs for plans */}
          <div
            role="tablist"
            aria-label="Choose plan"
            className="inline-flex rounded-xl bg-slate-100 p-1 ring-1 ring-slate-200"
          >
            {(["starter", "growth", "unlimited"] as PlanKey[]).map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={activePlan === key}
                onClick={() => setActivePlan(key)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${
                  activePlan === key
                    ? "bg-white text-slate-900 shadow"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {plans[key].title}
              </button>
            ))}
          </div>

          {/* Active plan card */}
          <div className="mt-6 rounded-2xl border border-slate-200 ring-1 ring-slate-900/5 bg-white p-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                {/* {plans[activePlan].popular && (
                  <div className="mb-2 inline-flex items-center rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
                    {mostPopular}
                  </div>
                )} */}
                <div className="text-base font-semibold text-slate-900">
                  {plans[activePlan].title}
                </div>
                <div className="text-xs text-slate-500">
                  {plans[activePlan].desc}
                </div>
                <div className="mt-2 flex items-end gap-2">
                  <div className="text-2xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-lightBlue to-black bg-clip-text text-transparent">
                      {activePlan === "unlimited"
                        ? plans[activePlan].price
                        : `${currency} ${plans[activePlan].price}`}
                    </span>
                  </div>
                  {activePlan !== "unlimited" && (
                    <span className="mb-1 text-xs text-slate-500">
                      {cadence}
                    </span>
                  )}
                </div>
                {activePlan !== "unlimited" && (
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-200">
                    {badge7d}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="sm:mt-0 mt-2">
                {activePlan === "unlimited" ? (
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                  >
                    {ctaContact}
                  </a>
                ) : (
                  <a
                    href={`/https://platform.fincargo.ai/login`}
                    className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                      activePlan === "growth"
                        ? "bg-blue-600 text-white hover:bg-blue-500"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {ctaGetStarted}
                  </a>
                )}
              </div>
            </div>

            {/* Feature list (labels + values) */}
            <ul className="mt-5 divide-y divide-slate-200">
              {featuresLabels.map((label, idx) => (
                <li
                  key={idx}
                  className="py-3 flex items-start justify-between gap-4"
                >
                  <span className="text-sm text-slate-600">{label}</span>
                  <span className="text-sm text-slate-900 font-medium text-right">
                    {value(activePlan, idx)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- DESKTOP (lg+) : Comparison Table ---------- */}
        <div
          className={`mt-10 hidden lg:block transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="overflow-x-auto rounded-2xl border border-slate-200 ring-1 ring-slate-900/5 bg-white">
            {/* Table header */}
            <div className="min-w-[960px] grid grid-cols-4 divide-x divide-slate-200">
              {/* Features column title */}
              <div className="px-4 py-5 sm:px-6">
                <div className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                  {tf("pricing.features.title", "Features")}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  {currency} {cadence}
                </div>
              </div>

              {(["starter", "growth", "unlimited"] as PlanKey[]).map((key) => {
                const p = plans[key];
                const isPopular = !!p.popular;
                const priceLabel =
                  key === "unlimited" ? p.price : `${currency} ${p.price}`;

                return (
                  <div
                    key={key}
                    className={`px-4 py-5 sm:px-6 ${
                      isPopular
                        ? "bg-gradient-to-b from-blue-50/60 to-white"
                        : ""
                    }`}
                  >
                    {/* {isPopular && (
                      <div className="mb-2 inline-flex items-center rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
                        {mostPopular}
                      </div>
                    )} */}

                    <div className="text-sm font-semibold text-slate-900">
                      {p.title}
                    </div>
                    <div className="text-xs text-slate-500">{p.desc}</div>

                    <div className="mt-3">
                      <div className="text-2xl md:text-3xl font-black tracking-tight">
                        <span className="bg-gradient-to-r from-lightBlue to-black bg-clip-text text-transparent">
                          {priceLabel}
                        </span>
                      </div>
                      {key !== "unlimited" && (
                        <div className="text-xs text-slate-500">{cadence}</div>
                      )}
                    </div>

                    {key !== "unlimited" && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-200">
                        {badge7d}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Rows */}
            <div className="min-w-[960px] divide-y divide-slate-200">
              {featuresLabels.map((label, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 divide-x divide-slate-200"
                >
                  <div className="bg-slate-50/60 px-4 py-4 sm:px-6">
                    <div className="text-sm font-medium text-slate-700">
                      {label}
                    </div>
                  </div>
                  {(["starter", "growth", "unlimited"] as PlanKey[]).map(
                    (key) => (
                      <div key={key} className="px-4 py-4 sm:px-6">
                        <div className="text-sm text-slate-800">
                          {value(key, idx)}
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Table footer with CTAs */}
            <div className="min-w-[960px] grid grid-cols-4 divide-x divide-slate-200">
              <div className="px-4 py-5 sm:px-6" />
              {(["starter", "growth", "unlimited"] as PlanKey[]).map((key) => (
                <div key={key} className="px-4 py-5 sm:px-6">
                  {key === "unlimited" ? (
                    <a
                      href="/contact"
                      className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                    >
                      {ctaContact}
                    </a>
                  ) : (
                    <a
                      href={`https://platform.fincargo.ai/login`}
                      className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                        key === "growth"
                          ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {ctaGetStarted}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-6 text-sm text-slate-500">{footnote}</p>
      </div>
    </section>
  );
}

/* ------------ Icons ------------- */
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
