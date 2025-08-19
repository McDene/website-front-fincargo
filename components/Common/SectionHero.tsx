"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ShieldCheckIcon,
  DocumentCheckIcon,
  ClipboardDocumentCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "@/hooks/useTranslation";

interface SectionHeroProps {
  title: string;
  paragraph: string;
  buttonText: string;
  buttonLink: string;
  videoUrl: string;
  imageAlt?: string;
  mockupSrc?: string;
}

export default function SectionHero({
  title,
  paragraph,
  buttonText,
  buttonLink,
  videoUrl,
  imageAlt = "Product preview on a laptop mockup",
  mockupSrc = "/images/login-mockup.png",
}: SectionHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2 }
    );

    const nodes = [titleRef.current, textRef.current, buttonRef.current];
    nodes.forEach((n) => n && observer.observe(n));
    return () => nodes.forEach((n) => n && observer.unobserve(n));
  }, []);

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen overflow-hidden">
      {/* Background transport video (truck in circulation) */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark + gradient overlays for SaaS readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent" />
      <div
        className="pointer-events-none absolute -inset-24 z-0 opacity-70 [filter:blur(80px)]"
        aria-hidden
      >
        <div className="absolute left-1/4 top-1/3 h-56 w-56 rounded-full bg-cyan-400/20" />
        <div className="absolute right-20 bottom-24 h-72 w-72 rounded-full bg-blue-500/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl">
            <div
              ref={titleRef}
              className={`transition-all duration-700 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              {/* <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Next-generation logistics
              </span> */}
              <h1 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
                {title}
              </h1>
            </div>

            <div
              ref={textRef}
              className={`mt-6 max-w-xl text-white/90 text-lg md:text-2xl font-medium leading-relaxed transition-all duration-700 ease-out delay-150 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              {paragraph}
            </div>

            <div
              className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-700 ease-out delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <a
                ref={buttonRef}
                href={buttonLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-black hover:bg-blue-500 px-6 py-3 text-white font-semibold shadow-lg ring-1 ring-white/10 backdrop-blur-sm transition-all"
              >
                {buttonText}
                <svg
                  className="size-5 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white/80 hover:text-white ring-1 ring-white/15 hover:ring-white/30 transition"
              >
                {t("hero.see_demo")}
              </a>
            </div>

            {/* advantages */}
            {/* advantages */}
            <div
              className={`mt-10 transition-all duration-700 ease-out delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <ul
                role="list"
                aria-label="Key advantages"
                className="flex flex-wrap items-center gap-3 text-sm"
              >
                {[
                  {
                    label: t("hero.bank_label"),
                    Icon: ShieldCheckIcon,
                    title: "Encryption in transit & at rest",
                  },
                  {
                    label: t("hero.efti_label"),
                    Icon: DocumentCheckIcon,
                    title: "Electronic Freight Transport Information",
                  },
                  {
                    label: t("hero.vida_lablel"),
                    Icon: ClipboardDocumentCheckIcon,
                    title: "EU VAT in the Digital Age (readiness)",
                  },
                  {
                    label: t("hero.all_label"),
                    Icon: BoltIcon,
                    title: "Always-on workflows",
                  },
                ].map(({ label, Icon, title }) => (
                  <li key={label}>
                    <span
                      title={title}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-white/90 ring-1 ring-white/15 backdrop-blur-sm hover:bg-white/15 hover:ring-white/25 transition"
                    >
                      <Icon
                        className="h-4 w-4 text-white/80"
                        aria-hidden="true"
                      />
                      <span className="font-medium">{label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Laptop-style mockup */}
          <div className="relative flex justify-center lg:justify-end">
            {/* glow */}
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-white/10 via-white/5 to-transparent blur-2xl"
              aria-hidden
            />

            {/* Mock laptop frame */}
            <div className="relative w-full max-w-[680px]">
              <div className="mx-auto aspect-[16/10] rounded-2xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur [perspective:1200px] ring-1 ring-white/10">
                {/* Bezel */}
                <div className="absolute left-0 right-0 top-0 h-8 rounded-t-2xl bg-gradient-to-b from-white/15 to-white/5 flex items-center justify-start px-4 gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>
                <div className="absolute inset-0 mt-8 overflow-hidden rounded-b-2xl">
                  <Image
                    src={mockupSrc}
                    alt={imageAlt}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover will-change-transform [transform:rotateX(0.5deg)]"
                    loading="eager"
                    unoptimized
                  />
                </div>
              </div>
              {/* Laptop base */}
              <div className="mx-auto mt-2 h-3 w-[92%] rounded-b-2xl bg-gradient-to-b from-white/20 to-white/5 shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
