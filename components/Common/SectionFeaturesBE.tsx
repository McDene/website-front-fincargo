"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

interface FeatureItem {
  name: string;
  description: string;
  href: string;
  points?: string[];
  imageSrc: string;
  imageAlt: string;
}

export default function SectionFeaturesBE() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const { t, tl, language } = useTranslation();

  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const learnMore = tf("services.learn_more", "Learn more");
  const sectionLabel = tf("services.section", "Services");
  const title = tf(
    "services.title",
    "Plateforme Invoice-to-cash propulsée par l’IA"
  );
  // BE-specific subtitle copy (FR/EN) regardless of global default
  const subtitle = language === "fr"
    ? "Notre plateforme s’articule autour de quatre composants parfaitement intégrés pour accélérer votre conformité et votre cycle cash-to-cash en Belgique dès 2026."
    : "Our platform is built around four seamlessly integrated components to accelerate your compliance and cash-to-cash cycle in Belgium starting in 2026.";

  const features: FeatureItem[] = [
    {
      name: t("services.invoice.title"),
      description: t("services.invoice.description"),
      href: "/e-invoicing",
      points: tl("services.invoice.points"),
      imageSrc: "/images/fincargo_invoicing.webp",
      imageAlt: "Fincargo e‑Invoicing Belgium",
    },
    {
      name: t("services.financial.title"),
      description: t("services.financial.description"),
      href: "/financial-services",
      points: tl("services.financial.points"),
      imageSrc: "/images/fincargo_financial.webp",
      imageAlt: "Fincargo financial services",
    },
    {
      name: t("services.analytics.title"),
      description: t("services.analytics.description"),
      href: "/analytics",
      points: tl("services.analytics.points"),
      imageSrc: "/images/fincargo_analytics.webp",
      imageAlt: "Fincargo analytics",
    },
    {
      name: t("services.integration.title"),
      description: t("services.integration.description"),
      href: "/integration",
      points: tl("services.integration.points"),
      imageSrc: "/images/fincargo_integration.webp",
      imageAlt: "Fincargo integrations",
    },
  ];

  // Force BE copy for the first card (e‑invoicing)
  const isFr = language === "fr";
  const beName = isFr ? "E‑Invoicing Belgique" : "E‑Invoicing Belgium";
  const beDesc = isFr
    ? "Facturation électronique structurée pour le transport, conforme EN 16931 & Peppol, avec validation automatique et envoi sécurisé."
    : "Structured e‑invoicing for transport, EN 16931 & Peppol compliant, with automated validation and secure delivery.";
  features[0] = { ...features[0], name: beName, description: beDesc };

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
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_20%,black,transparent)]">
        <div className="absolute -top-20 right-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />
        <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((f, i) => (
            <a
              key={f.name}
              href={f.href}
              data-analytics-action="card_click"
              data-analytics-category="Services_BE"
              data-analytics-label={f.name}
              className={`group relative overflow-hidden rounded-2xl flex h-full flex-col bg-gradient-to-b from-darkBlue to-black text-white border border-blue-500/30 ring-3 ring-blue-500/10 shadow-xl transition-all duration-700 hover:duration-200 ease-out transform-gpu ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              } hover:shadow-lg hover:-translate-y-0.5`}
              style={{ transitionDelay: `${50 + i * 50}ms` }}
              aria-label={`${f.name} – ${learnMore}`}
            >
              {/* Illustration (smaller) */}
              <div className="relative">
                <Image
                  src={f.imageSrc}
                  alt={f.imageAlt}
                  width={800}
                  height={600}
                  className="w-full aspect-[16/9] max-h-40 md:max-h-48 object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div className="px-6 pt-4 pb-4 md:pb-5 flex-1">
                <h3 className="text-xl font-bold tracking-tight uppercase">
                  <span className="bg-gradient-to-r from-lightBlue to-white bg-clip-text text-transparent">
                    {f.name}
                  </span>
                </h3>
                <p className="mt-2 text-sm md:text-base text-white/80 leading-relaxed">
                  {f.description}
                </p>
              </div>

              {/* CTA bottom aligned */}
              <div className="px-6 pb-6 md:pb-7 mt-auto">
                <span className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-white/80 hover:bg-white/95 hover:ring-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white">
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
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
