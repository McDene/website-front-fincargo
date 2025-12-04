"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

interface CTA {
  label: string;
  href: string;
}

interface SectionHeroImageProps {
  title: string; // small overline
  subtitle: string; // main headline (uppercase)
  paragraph: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  imageUrl: string;
  imageAlt: string;
  buttonText?: string;
  buttonLink?: string | null;
  /** Layout controls */
  align?: "left" | "center"; // default left
  overlayStrength?: number; // 0..100, default 60 (as percent opacity)
  /** Height presets to avoid full-viewport hero trap */
  heightMode?: "full" | "balanced" | "compact"; // default: balanced
  /** Show the small overline badge above the H1 */
  showOverline?: boolean; // default true
  /** Tailwind classes to control background image object-position */
  imageObjectPosition?: string; // e.g., "object-left md:object-center"
}

export default function SectionHeroImage({
  title,
  subtitle,
  paragraph,
  primaryCta,
  secondaryCta,
  imageUrl,
  imageAlt,
  align = "left",
  overlayStrength = 60,
  heightMode = "balanced",
  showOverline = true,
  imageObjectPosition = "object-center",
}: SectionHeroImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setIsVisible(true)),
      { threshold: 0.2 }
    );
    if (contentRef.current) obs.observe(contentRef.current);
    return () => obs.disconnect();
  }, []);

  const contentAlign =
    align === "center" ? "items-center text-center" : "items-start text-left";

  // Compute a sensible min-height using CSS functions to avoid oversizing on huge screens
  const minHeight = useMemo(() => {
    switch (heightMode) {
      case "full":
        return "min(100vh, 900px)"; // still capped for very tall monitors
      case "compact":
        return "min(60vh, 680px)";
      case "balanced":
      default:
        return "min(78vh, 820px)"; // recommended default
    }
  }, [heightMode]);

  return (
    <section className="relative overflow-hidden" style={{ minHeight }}>
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          className={`object-cover ${imageObjectPosition}`}
        />
        {/* Dark overlay for readability (configurable strength). Hide if 0 */}
        {overlayStrength > 0 && (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(120deg, rgba(0,0,0,${
                overlayStrength / 100
              }) 20%, rgba(0,0,0,${
                overlayStrength / 160
              }) 60%, rgba(0,0,0,0.15) 100%)`,
            }}
          />
        )}
        {/* Soft glows to match brand style */}
        <div
          className="pointer-events-none absolute -inset-24 opacity-70 [filter:blur(80px)]"
          aria-hidden
        >
          <div className="absolute left-1/5 top-1/3 h-56 w-56 rounded-full bg-cyan-400/20" />
          <div className="absolute right-16 bottom-24 h-72 w-72 rounded-full bg-blue-500/20" />
        </div>
      </div>

      <div
        ref={contentRef}
        className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col ${contentAlign}`}
      >
        {/* Header */}
        <div
          className={`max-w-3xl transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {showOverline && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              {title}
            </span>
          )}
          <h1 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            {subtitle}
          </h1>
        </div>

        {/* Paragraph */}
        <div
          className={`mt-6 max-w-xl md:max-w-2xl text-white/90 text-lg md:text-2xl font-medium leading-relaxed transition-all duration-700 ease-out delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {paragraph}
        </div>

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <div
            className={`mt-8 flex flex-wrap gap-4 transition-all duration-700 ease-out delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {primaryCta && (
              <a
                href={primaryCta.href}
                target={/^https?:\/\//i.test(primaryCta.href) ? "_blank" : undefined}
                rel={/^https?:\/\//i.test(primaryCta.href) ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2 rounded-full bg-blue-500/90 hover:bg-blue-500 px-6 py-3 text-white font-semibold shadow-lg ring-1 ring-white/10 backdrop-blur-sm transition-all"
              >
                {primaryCta.label}
                <svg
                  className="size-5 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                target={/^https?:\/\//i.test(secondaryCta.href) ? "_blank" : undefined}
                rel={/^https?:\/\//i.test(secondaryCta.href) ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white/80 hover:text-white ring-1 ring-white/15 hover:ring-white/30 transition"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Decorative bottom shine */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent"
        aria-hidden
      />
    </section>
  );
}
