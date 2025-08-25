"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface SectionDemoProps {
  title?: string;
  subtitle?: string;
  videoUrl?: string; // e.g. https://www.youtube.com/watch?v=UcwK1SGyDhg
  contactHref?: string; // e.g. "/contact-sales"
  gradientFromClass?: string;
  gradientToClass?: string;
}

function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
    /[?&]v=([a-zA-Z0-9_-]{6,})/,
    /embed\/([a-zA-Z0-9_-]{6,})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m && m[1]) return m[1];
  }
  if (/^[a-zA-Z0-9_-]{6,}$/.test(url)) return url;
  return null;
}

export default function SectionDemo({
  title,
  subtitle,
  videoUrl = "https://www.youtube.com/watch?v=UcwK1SGyDhg",
  contactHref = "/contact",
  gradientFromClass = "from-darkBlue",
  gradientToClass = "to-black",
}: SectionDemoProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const { t, tl } = useTranslation();

  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const sectionLabel = tf("demo.section", "Demo");
  const heading = title ?? tf("demo.title", "See Fincargo in action");
  const desc =
    subtitle ??
    tf(
      "demo.description",
      "Book a live demo or watch the 2-minute product tour."
    );
  const ctaLive = tf("demo.button.live_demo", "Book a live demo");
  const ctaWatch = tf("demo.button.watch_tour", "Watch product tour");
  const bullets = tl("demo.list"); // array

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const videoId = useMemo(() => extractYouTubeId(videoUrl), [videoUrl]);
  const embedSrc = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&color=white`
    : undefined;

  return (
    <section
      id="demo"
      ref={ref}
      className={`relative bg-gradient-to-b ${gradientFromClass} ${gradientToClass} py-24 md:py-32 text-white overflow-hidden`}
    >
      {/* subtle background accents */}
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_10%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          {/* Copy */}
          <div
            className={`max-w-2xl transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              {sectionLabel.toUpperCase()}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {heading}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/80">{desc}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={contactHref}
                className="group inline-flex items-center gap-2 rounded-full bg-blue-500/90 hover:bg-blue-500 px-6 py-3 text-white font-semibold shadow-lg ring-1 ring-white/10 backdrop-blur-sm transition-all"
                aria-label={ctaLive}
              >
                {ctaLive}
                <svg
                  className="size-5 transition-transform group-hover:translate-x-0.5"
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
              </a>
              {embedSrc && (
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white/80 hover:text-white ring-1 ring-white/15 hover:ring-white/30 transition"
                  aria-label={ctaWatch}
                >
                  {ctaWatch}
                </a>
              )}
            </div>

            {/* Bullets (translated list) */}
            {bullets.length > 0 && (
              <ul className="mt-8 space-y-2 text-white/80 text-sm">
                {bullets.map((line, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-none"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {line}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Video embed */}
          <div
            className={`relative ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } transition-all duration-700 ease-out delay-150`}
          >
            <div className="relative w-full max-w-[860px] mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 ring-1 ring-white/10 bg-black/40 shadow-2xl">
                {embedSrc ? (
                  <iframe
                    src={embedSrc}
                    title={heading}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/70">
                    {/* fallback minimal i18n */}
                    {tf("demo.invalid_url", "Invalid YouTube URL")}
                  </div>
                )}

                {/* top window bar */}
                <div className="absolute left-0 right-0 top-0 h-8 rounded-t-2xl bg-gradient-to-b from-white/10 to-white/0 flex items-center px-4 gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>
              </div>
              <div className="mx-auto mt-2 h-3 w-[92%] rounded-b-2xl bg-gradient-to-b from-white/20 to-white/5 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
