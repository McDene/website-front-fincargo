"use client";

import React, { useState, useEffect, useRef } from "react";

type Audience = "carrier" | "freight";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface Group {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
}

interface SectionFaqProps {
  /** Mode simple */
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];

  /** Mode toggle : si `groups` est fourni, on ignore title/subtitle/faqs */
  groups?: Partial<Record<Audience, Group>>;
  initialAudience?: Audience;
}

export default function SectionFaq({
  title,
  subtitle,
  faqs = [],
  groups,
  initialAudience = "carrier",
}: SectionFaqProps) {
  const hasToggle = !!groups && (!!groups.carrier || !!groups.freight);
  const [audience, setAudience] = useState<Audience>(initialAudience);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const current: Group | undefined = hasToggle
    ? (groups?.[audience] as Group | undefined)
    : { title: title || "", subtitle: subtitle || "", faqs };

  const toggleAccordion = (index: number) =>
    setActiveIndex((prev) => (prev === index ? null : index));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setIsVisible(true)),
      { threshold: 0.2 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  // reset l’item ouvert quand on change d’audience
  useEffect(() => setActiveIndex(null), [audience]);

  if (!current || !Array.isArray(current.faqs) || current.faqs.length === 0) {
    return null;
  }

  return (
    <section id="faqs" className="relative bg-white py-20 md:py-28 px-6">
      {/* accents très discrets */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div
        ref={contentRef}
        className={`relative z-10 mx-auto max-w-5xl transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Head */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
            FAQ
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            {current.title}
          </h2>
          {current.subtitle && (
            <p className="mt-3 text-lg md:text-xl text-slate-600">
              {current.subtitle}
            </p>
          )}

          {hasToggle && (
            <div className="mt-6">
              <div
                role="tablist"
                aria-label="Choose audience"
                className="inline-flex rounded-xl bg-slate-100 p-1 ring-1 ring-slate-200"
              >
                <button
                  role="tab"
                  aria-selected={audience === "carrier"}
                  onClick={() => setAudience("carrier")}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${
                    audience === "carrier"
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Carriers
                </button>
                <button
                  role="tab"
                  aria-selected={audience === "freight"}
                  onClick={() => setAudience("freight")}
                  className={`ml-1 px-4 py-1.5 text-sm font-medium rounded-lg transition ${
                    audience === "freight"
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Forwarders &amp; Shippers
                </button>
              </div>
            </div>
          )}
        </div>

        {/* List */}
        <div className="mt-10 space-y-4">
          {current.faqs.map((faq, index) => {
            const open = activeIndex === index;
            const contentId = `faq-panel-${faq.id}`;
            const buttonId = `faq-button-${faq.id}`;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  open
                    ? "border-blue-300 ring-1 ring-blue-200 bg-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                <button
                  id={buttonId}
                  aria-controls={contentId}
                  aria-expanded={open}
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-4"
                >
                  <span className="text-lg md:text-xl font-semibold text-slate-900">
                    {faq.question}
                  </span>
                  <span
                    className={`inline-flex items-center justify-center h-9 w-9 rounded-full ring-1 transition-all duration-300 ${
                      open
                        ? "bg-blue-50 ring-blue-200 text-blue-700"
                        : "bg-slate-50 ring-slate-200 text-slate-600"
                    }`}
                    aria-hidden
                  >
                    <ChevronIcon open={open} />
                  </span>
                </button>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`overflow-hidden transition-[grid-template-rows] duration-300 ease-out grid ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <div className="px-5 pb-5 pt-0 text-slate-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* micro-note */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Can’t find your answer?{" "}
          <a
            href="/contact-sales"
            className="font-semibold text-slate-900 hover:underline"
          >
            Contact sales
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 transform transition-transform duration-300 ${
        open ? "rotate-45" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Plus qui devient “croix” en open (rotation 45°) */}
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
