"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { getCookie } from "cookies-next";

interface SectionDemoProps {
  title?: string;
  subtitle?: string;
  contactHref?: string; // ex: "/contact"
  gradientFromClass?: string;
  gradientToClass?: string;
}

export default function SectionDemo({
  title,
  subtitle,
  contactHref = "/contact",
  gradientFromClass = "from-darkBlue",
  gradientToClass = "to-black",
}: SectionDemoProps) {
  // Use a build-time origin for deterministic SSR/CSR match (avoid hydration mismatch)
  const SITE_ORIGIN = (() => {
    try {
      const url = process.env.NEXT_PUBLIC_SITE_URL || "";
      return url ? new URL(url).origin : "";
    } catch {
      return "";
    }
  })();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [allowVideo, setAllowVideo] = useState(false);
  const { t, tl } = useTranslation();

  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const sectionLabel = tf("demo.section", "Demo");
  const heading = title ?? tf("demo.title", "See Fincargo in action");
  const desc =
    subtitle ??
    tf("demo.description", "Book a live demo and explore the product.");

  const ctaLive = tf("demo.button.live_demo", "Book a live demo");
  const ctaUnmute = tf("demo.button.video", "Activer le son");

  // bullets: s'assure d'un tableau
  const rawBullets = tl("demo.list");
  const bullets: string[] = Array.isArray(rawBullets) ? rawBullets : [];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // After hydration, read cookie consent and enable video if accepted.
  useEffect(() => {
    try {
      const v = getCookie("cookie_consent");
      if (v === "accepted") setAllowVideo(true);
    } catch {}
  }, []);

  // Unmute handler: requires a user gesture
  const handleUnmute = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const post = (func: string, args: unknown[] = []) => {
      // Match the iframe origin (privacy enhanced mode)
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "https://www.youtube-nocookie.com"
      );
    };
    // Ask player to unmute, set volume and play
    post("unMute");
    post("setVolume", [80]);
    post("playVideo");
    setMuted(false);
  };

  return (
    <section
      id="demo"
      ref={ref}
      className={`relative bg-gradient-to-b ${gradientFromClass} ${gradientToClass} py-24 md:py-32 text-white overflow-hidden`}
    >
      {/* accents de fond */}
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_10%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          {/* Texte */}
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
            </div>

            {/* Puces traduites */}
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

          {/* Vidéo YouTube en boucle (remplace l'image) */}
          <div
            className={`relative ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } transition-all duration-700 ease-out delay-150`}
          >
            <div className="relative w-full max-w-[860px] mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 ring-1 ring-white/10 bg-black/40 shadow-2xl">
                {allowVideo ? (
                  <iframe
                    ref={iframeRef}
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/MPJlhXj5Zi0?autoplay=1&mute=1&loop=1&playlist=MPJlhXj5Zi0&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1${
                      SITE_ORIGIN ? `&origin=${encodeURIComponent(SITE_ORIGIN)}` : ""
                    }`}
                    title="Fincargo Demo"
                    frameBorder="0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="origin-when-cross-origin"
                    loading="lazy"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setAllowVideo(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                    aria-label="Enable YouTube video"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/95 text-black px-4 py-2 text-sm font-medium shadow-lg">
                      ▶ Enable video
                    </span>
                  </button>
                )}
                { allowVideo && muted && (
                  <button
                    type="button"
                    onClick={handleUnmute}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                    aria-label={ctaUnmute}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 text-black px-4 py-2 text-sm font-medium shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                        aria-hidden
                      >
                        <path d="M11.25 5.25a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.28.53L7.72 15H5.25A2.25 2.25 0 0 1 3 12.75v-1.5A2.25 2.25 0 0 1 5.25 9h2.47l3-2.78a.75.75 0 0 1 .53-.22Z" />
                        <path d="M15.53 8.47a.75.75 0 0 1 1.06 0 4.5 4.5 0 0 1 0 6.36.75.75 0 1 1-1.06-1.06 3 3 0 0 0 0-4.24.75.75 0 0 1 0-1.06Z" />
                        <path d="M17.65 6.35a.75.75 0 0 1 1.06 0 7.5 7.5 0 0 1 0 10.6.75.75 0 1 1-1.06-1.06 6 6 0 0 0 0-8.48.75.75 0 0 1 0-1.06Z" />
                      </svg>
                      {ctaUnmute}
                    </span>
                  </button>
                )}
                {/* barre de fenêtre en haut */}
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
