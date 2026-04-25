"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const phases = [
  {
    phase: "Phase 0",
    year: "2015",
    mode: "System & Human",
    points: [
      "Old systems (10+ years)",
      "Processes compliance",
      "6 months+ for bugs & features",
      "Static Master Data",
      "High cost and license",
    ],
    pricing: "License",
    dark: false,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    phase: "Phase 1",
    year: "2020",
    mode: "System & Human",
    points: [
      "Agile deployment",
      "More SaaS",
      "Behavioral analytics",
      "Lower cost of maintenance",
      "Easier connectivity",
    ],
    pricing: "Per seat",
    dark: false,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    phase: "Phase 2",
    year: "2026 onwards",
    mode: "Agents & Human oversight",
    points: [
      "AI agents run all processes",
      "Infinite deterministic & stochastic parameters",
      "24×7 availability",
      "High Velocity Master Data",
      "Human as oversight & exception management",
    ],
    pricing: "Per Virtual Employee™",
    dark: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
];

export default function SectionVirtualEmployee() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  useTranslation();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-white py-20 md:py-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-lightBlue/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`text-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-lightBlue/10 px-3 py-1 text-xs font-semibold text-lightBlue ring-1 ring-lightBlue/30">
            <span className="h-1.5 w-1.5 rounded-full bg-lightBlue" />
            THE AI PROMISE
          </span>

          <h2 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-darkBlue uppercase leading-tight">
            The move towards{" "}
            <span className="bg-gradient-to-r from-darkBlue to-lightBlue bg-clip-text text-transparent">
              Virtual Employee™
            </span>
          </h2>

          <p className="mt-4 mx-auto max-w-2xl text-lg md:text-xl text-darkBlue/60 leading-relaxed">
            Fincargo proposes Virtual Employees™ to its customers that can cover
            all key processes 24×7 and are capable of continuous learning.
          </p>
        </div>

        {/* Sub-title */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-100 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-lg md:text-xl font-bold tracking-widest text-darkBlue/70 uppercase">
            The evolution of enterprise software
          </h3>
        </div>

        {/* Phase cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 items-stretch">
          {phases.map((p, i) => (
            <div key={p.phase} className="flex items-stretch">
              <div
                className={`relative flex flex-col rounded-2xl border p-7 w-full transition-all duration-700 ease-out transform-gpu hover:-translate-y-1 hover:shadow-xl ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${
                  p.dark
                    ? "bg-darkBlue border-darkBlue text-white shadow-2xl shadow-darkBlue/30 ring-1 ring-lightBlue/20"
                    : "bg-white border-slate-200 text-darkBlue shadow-md hover:ring-1 hover:ring-lightBlue/30"
                }`}
                style={{ transitionDelay: `${150 + i * 100}ms` }}
              >
                {/* Phase header */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      p.dark
                        ? "bg-lightBlue/20 text-lightBlue"
                        : "bg-lightBlue/10 text-lightBlue"
                    }`}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <p className={`text-sm font-bold tracking-widest uppercase ${p.dark ? "text-lightBlue" : "text-lightBlue"}`}>
                      {p.phase}
                    </p>
                    <p className={`text-xs ${p.dark ? "text-white/50" : "text-darkBlue/40"}`}>
                      {p.year}
                    </p>
                  </div>
                </div>

                {/* Mode */}
                <p className={`mt-5 text-sm font-semibold ${p.dark ? "text-white/90" : "text-darkBlue/80"}`}>
                  {p.mode}
                </p>

                {/* Points */}
                <ul className="mt-3 space-y-2.5 flex-1">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <svg
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${p.dark ? "text-lightBlue" : "text-lightBlue"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className={`text-sm leading-snug ${p.dark ? "text-white/70" : "text-darkBlue/60"}`}>
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Pricing model */}
                <div className={`mt-6 pt-5 border-t ${p.dark ? "border-white/10" : "border-slate-100"}`}>
                  <p className={`text-xs font-semibold tracking-widest uppercase ${p.dark ? "text-white/40" : "text-darkBlue/40"}`}>
                    Pricing Model
                  </p>
                  <p className={`mt-1 text-base font-bold ${p.dark ? "text-white" : "text-darkBlue"}`}>
                    {p.pricing}
                  </p>
                </div>
              </div>

              {/* Arrow connector between cards */}
              {i < phases.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-8 flex-shrink-0">
                  <svg className="h-5 w-5 text-lightBlue/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
