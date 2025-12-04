"use client";
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

type Audience = "carrier" | "freight";

interface BenefitCard {
  title: string;
  description: string;
}

interface Testimonial {
  title: string; // Company
  location: string; // City — Type
  text: string; // Quote
}

interface SectionBenefitsProps {
  title?: string;
  subtitle?: string;
}

export default function SectionBenefits({
  title,
  subtitle,
}: SectionBenefitsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [audience, setAudience] = useState<Audience>("carrier");
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();

  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };
  const tv = (key: string) => {
    const v = t(key);
    return v === key ? "" : v;
  };

  const heading = title ?? tf("benefits.title", "Benefits");
  const sub =
    subtitle ??
    tf(
      "benefits.description",
      "Discover how Fincargo transforms your transportation business with AI-powered solutions"
    );

  const buildBenefits = (who: Audience): BenefitCard[] => {
    const prefix = who === "carrier" ? "benefits.carrier" : "benefits.freight";
    const items: BenefitCard[] = [];
    for (let i = 1; i <= 6; i++) {
      const title = tv(`${prefix}_${i}.title`);
      const description = tv(`${prefix}_${i}.description`);
      if (title && description) items.push({ title, description });
    }
    return items;
  };

  const getTestimonial = (who: Audience): Testimonial | null => {
    const p = `benefits.testimonial.${who}`;
    const title = tv(`${p}.title`);
    const location = tv(`${p}.location`);
    const text = tv(`${p}.text`);
    if (!title || !text) return null;
    return { title, location, text };
  };

  const benefits = buildBenefits(audience);
  const testimonial = getTestimonial(audience);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setIsVisible(true)),
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="benefit"
      ref={sectionRef}
      className="relative bg-gradient-to-b from-darkBlue to-black py-14 md:py-18 text-white"
    >
      {/* accents */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_20%,black,transparent)]">
        <div className="absolute -top-24 right-10 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading + Toggle */}
        <div
          className={`max-w-3xl transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            {tf("benefits.title", "Benefits").toUpperCase()}
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
            {heading}
          </h2>
          {sub && (
            <p className="mt-3 text-lg md:text-xl text-white/80">{sub}</p>
          )}

          <div className="mt-6">
            <div
              role="tablist"
              aria-label="Choose audience"
              className="inline-flex rounded-xl bg-white/10 p-1 ring-1 ring-white/20 backdrop-blur"
            >
              <button
                role="tab"
                aria-selected={audience === "carrier"}
                onClick={() => setAudience("carrier")}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition ${
                  audience === "carrier"
                    ? "bg-white text-blue-900 shadow ring-1 ring-white/80"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                {tf("benefits.carrier", "Carriers")}
              </button>
              <button
                role="tab"
                aria-selected={audience === "freight"}
                onClick={() => setAudience("freight")}
                className={`ml-1 px-3.5 py-2 text-sm font-medium rounded-lg transition ${
                  audience === "freight"
                    ? "bg-white text-blue-900 shadow ring-1 ring-white/80"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                {tf("benefits.freight", "Forwarders & Shippers")}
              </button>
            </div>
          </div>
        </div>

        {/* Benefits + Illustration */}
        <div
          className={`mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-start transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Left: benefits list */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {benefits.map((b, i) => (
                <div
                  key={`${audience}-${i}`}
                  className="relative overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10 border border-white/10 px-4 py-3 md:px-4 md:py-3 hover:bg-white/7 transition"
                  style={{ transitionDelay: `${120 + i * 50}ms` }}
                >
                  <div
                    className="pointer-events-none absolute -top-3 -left-3 h-14 w-14 rounded-full bg-[#67e8f9]/25 blur-xl"
                    aria-hidden
                  />
                  <h3 className="text-[15px] md:text-[16px] font-semibold tracking-tight uppercase">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/85 leading-relaxed">
                    {b.description}
                  </p>
                  <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: audience image */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10 border border-white/10 shadow-xl">
              <div className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute -inset-16 bg-[radial-gradient(600px_260px_at_85%_10%,rgba(103,232,249,0.15),transparent),radial-gradient(540px_220px_at_10%_90%,rgba(191,219,254,0.12),transparent)]" />
              </div>
              <Image
                src={
                  audience === "carrier"
                    ? "/images/fincargo_carrier.webp"
                    : "/images/fincargo_forwarder_shipper.webp"
                }
                alt={
                  audience === "carrier" ? "Carriers" : "Forwarders & Shippers"
                }
                width={900}
                height={600}
                className="relative w-full h-auto object-contain max-h-56 md:max-h-72"
                priority={false}
              />
            </div>
          </div>
        </div>

        {/* Separator to emphasize difference */}
        <div className="mt-10 mb-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-80" />

        {/* Testimonial — glass / transparent */}
        {testimonial && (
          <div
            className={`relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md px-6 py-8 md:px-8 md:py-10 border border-white/15 ring-1 ring-white/10 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${160 + benefits.length * 80}ms` }}
          >
            {/* Gradient edges */}
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-2xl" />
            </div>

            {/* Chip */}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              Testimonial
            </span>

            {/* Content */}
            <div className="mt-4 md:mt-5 flex flex-col md:flex-row md:items-start md:gap-6">
              {/* Avatar/initiales + meta */}
              <div className="flex items-center gap-3 md:min-w-64">
                <div>
                  <div className="text-base font-semibold text-white flex items-center gap-2">
                    <IconBuilding className="h-4 w-4 text-white/70" />
                    {testimonial.title}
                  </div>
                  {testimonial.location && (
                    <div className="text-sm text-white/70">
                      {testimonial.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mt-4 md:mt-0 relative text-white/90">
                <IconQuote className="absolute -left-2 -top-1 h-6 w-6 text-white/30" />
                <p className="pl-6 leading-relaxed">{testimonial.text}</p>
              </blockquote>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Utils & Icons ---------------- */

// function getInitials(name: string) {
//   const parts = name.trim().split(/\s+/).slice(0, 2);
//   return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
// }

// Compact mode: icons disabled (keep stub to avoid refactor)
function BenefitIcon() {
  return null;
}

// Icons retained below (not used in compact mode)
// function IconChf(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-label="Swiss franc (CHF)"
//       {...props}
//     >
//       {/* Symbole franc (₣) */}
//       <path d="M6 3v18" />
//       <path d="M6 7h12" />
//       <path d="M6 12h9" />

//       {/* Petite croix suisse en haut à droite */}
//       <path d="M18 8v4" />
//       <path d="M16 10h4" />
//     </svg>
//   );
// }

function IconClock() {
  return null as any;
}
function IconCheckCircle() {
  return null as any;
}
function IconShield() {
  return null as any;
}
function IconEye(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M1.5 12s3.5-6 10.5-6 10.5 6 10.5 6-3.5 6-10.5 6S1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
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
// function IconSearch(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       {...props}
//     >
//       <circle cx="11" cy="11" r="7" />
//       <path d="M21 21l-3.5-3.5" />
//     </svg>
//   );
// }
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
function IconReceiptCheck() {
  return null as any;
}
function IconCard() {
  return null as any;
}
function IconDocumentSearch() {
  return null as any;
}
function IconDatabase() {
  return null as any;
}
function IconQuote(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7.2 10.4c0-2.4 1.6-4.5 3.8-5.3.4-.1.7.2.7.6v1.2c0 .3-.2.5-.4.6-1.1.5-1.9 1.6-1.9 2.9 0 .4.3.7.7.7h1.1c.7 0 1.3.6 1.3 1.3v2.6c0 .7-.6 1.3-1.3 1.3H8.5a2.9 2.9 0 0 1-2.9-2.9v-2.9Zm8 0c0-2.4 1.6-4.5 3.8-5.3.4-.1.7.2.7.6v1.2c0 .3-.2.5-.4.6-1.1.5-1.9 1.6-1.9 2.9 0 .4.3.7.7.7h1.1c.7 0 1.3.6 1.3 1.3v2.6c0 .7-.6 1.3-1.3 1.3h-2.5a2.9 2.9 0 0 1-2.9-2.9v-2.9Z" />
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
