"use client";

import { useEffect, useRef, useState, useContext, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "@/context/LanguageContext";

interface ContentItem {
  id: number;
  Title: string;
  Content: string;
  Image: { id: number; url: string; alternativeText: string | null };
}

interface ProtectionPolicyCProps {
  carrierProtectionPolicyData: { id: number; Content: ContentItem[] };
}

export default function ProtectionPolicyC({
  carrierProtectionPolicyData,
}: ProtectionPolicyCProps) {
  const { language } = useContext(LanguageContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement | null>(null);

  // Assign refs to image cards (desktop only)
  const setImageRef = (index: number, el: HTMLDivElement | null) => {
    imageRefs.current[index] = el;
  };

  // Observe images to update the sticky text (desktop)
  useEffect(() => {
    setActiveIndex(0);

    // guard: only run on desktop to avoid mobile glitches
    if (typeof window === "undefined") return;
    const isDesktop =
      window.matchMedia && window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const els = imageRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const i = Number(visible.target.getAttribute("data-index"));
          if (!Number.isNaN(i)) setActiveIndex(i);
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75, 1],
        rootMargin: "-10% 0px -35% 0px",
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [carrierProtectionPolicyData, language]);

  const onDotClick = useCallback((i: number) => {
    const el = imageRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    // adjust for fixed header if needed
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.scrollBy({
          top: -60,
          left: 0,
          behavior: "instant" as ScrollBehavior,
        });
      }
    }, 260);
  }, []);

  const items = carrierProtectionPolicyData?.Content || [];
  const active = items[activeIndex];
  if (!items.length) return null;

  return (
    <section className="relative bg-gradient-to-b from-gray-100 via-white to-white py-16 md:py-24">
      {/* soft glows */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute right-16 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-1/4 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop layout */}
        <div className="hidden lg:grid grid-cols-12 gap-10">
          {/* Images rail */}
          <div className="col-span-6 space-y-24">
            {items.map((item, i) => (
              <div
                key={item.id}
                data-index={i}
                ref={(el) => setImageRef(i, el)}
                className="group scroll-mt-28"
              >
                <div
                  className={`relative overflow-hidden rounded-3xl border ${
                    activeIndex === i
                      ? "border-blue-300/60"
                      : "border-slate-200"
                  } bg-white shadow-sm ring-1 ring-slate-900/5 transition-colors`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.Image.url}
                      alt={item.Image.alternativeText || item.Title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 44rem, 100vw"
                      priority={i === 0}
                      unoptimized
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      activeIndex === i ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  />
                  <p className="text-sm text-slate-600">{item.Title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky text + scrollspy */}
          <div className="col-span-6 relative">
            <div ref={textRef} className="sticky top-24">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
                Carrier Protection Policy
              </span>

              <AnimatePresence mode="wait">
                <motion.h2
                  key={`title-${active?.id}-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-darkBlue"
                >
                  {active?.Title}
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`content-${active?.id}-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 text-lg md:text-xl leading-relaxed text-slate-800"
                >
                  {active?.Content}
                </motion.p>
              </AnimatePresence>

              {/* Scrollspy dots */}
              <nav aria-label="Sections" className="mt-8">
                <ol className="flex flex-wrap gap-2">
                  {items.map((_, i) => (
                    <li key={`dot-${i}`}>
                      <button
                        onClick={() => onDotClick(i)}
                        aria-label={`Go to section ${i + 1}`}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          i === activeIndex
                            ? "bg-blue-600"
                            : "bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile layout — switched to a tabbed/slider experience to avoid long scroll glitches */}
        <div className="lg:hidden">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Sections"
            className="sticky top-16 z-10 -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 py-2 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
          >
            {items.map((it, i) => (
              <button
                key={`tab-${it.id}`}
                role="tab"
                aria-selected={i === activeIndex}
                aria-controls={`m-panel-${i}`}
                id={`m-tab-${i}`}
                onClick={() => setActiveIndex(i)}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold ring-1 transition ${
                  i === activeIndex
                    ? "bg-blue-600 text-white ring-blue-600"
                    : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                }`}
              >
                {it.Title}
              </button>
            ))}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.article
              key={`panel-${activeIndex}`}
              id={`m-panel-${activeIndex}`}
              role="tabpanel"
              aria-labelledby={`m-tab-${activeIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5 overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={active.Image.url}
                  alt={active.Image.alternativeText || active.Title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-darkBlue">
                  {active.Title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-800">
                  {active.Content}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
