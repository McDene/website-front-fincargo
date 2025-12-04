"use client";

import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

type Integration = {
  name: string;
  href: string;
  src: string;
  alt: string;
};

const INTEGRATIONS: Integration[] = [
  {
    name: "Webfleet",
    href: "https://www.webfleet.com/de_ch/webfleet/",
    src: "/images/webfleet.webp",
    alt: "Webfleet",
  },
  {
    name: "Transporeon",
    href: "https://www.transporeon.com/en",
    src: "/images/transporeon.svg",
    alt: "Transporeon",
  },
  {
    name: "BlueRock TMS",
    href: "https://www.bluerocktms.com/",
    src: "/images/bluerock_logo.svg",
    alt: "BlueRock TMS",
  },
  {
    name: "Log-hub",
    href: "https://log-hub.com/",
    src: "/images/log_hub.webp",
    alt: "Log-hub",
  },
];

export default function SectionIntegrations() {
  const { t } = useTranslation();
  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const sectionLabel = tf("integrations.section", "Integrations");
  const title = tf(
    "integrations.title",
    "Connected with leading transport systems"
  );
  const subtitle = tf(
    "integrations.subtitle",
    "Selected ecosystem partners for telematics, TMS and logistics platforms"
  );
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Floating rounded container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-darkBlue to-black text-white ring-1 ring-white/10 shadow-2xl">
          <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen">
            <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_10%_-10%,rgba(103,232,249,0.10),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(191,219,254,0.10),transparent)]" />
          </div>

          <div className="relative px-6 py-12 md:px-10 md:py-14">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                {sectionLabel.toUpperCase()}
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight uppercase">
                {title}
              </h2>
              <p className="mt-2 text-white/80">{subtitle}</p>
            </div>

            <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {INTEGRATIONS.map((it) => (
                <li key={it.name} className="flex items-center justify-center">
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center w-full px-2 py-4 md:px-3 md:py-5 transition-all"
                    aria-label={it.name}
                    title={it.name}
                  >
                    <Image
                      src={it.src}
                      alt={it.alt}
                      width={220}
                      height={80}
                      className="opacity-90 group-hover:opacity-100 transition-opacity duration-200 object-contain"
                    />
                    <div className="pointer-events-none absolute -top-6 -left-6 h-14 w-14 rounded-full bg-cyan-400/10 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-6 -right-6 h-14 w-14 rounded-full bg-blue-300/10 blur-2xl" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
