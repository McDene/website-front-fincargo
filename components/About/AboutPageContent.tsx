"use client";

import SectionKPIs from "@/components/Common/SectionKPIs";
import { useTranslation } from "@/hooks/useTranslation";
import { detectClientRegion, type Region } from "@/lib/i18n";
import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  whoWeAre?: string;
  mission?: string;
  vision?: string;
}

export default function AboutPageContent({ whoWeAre, mission, vision }: Props) {
  const { t, tl } = useTranslation();
  const region: Region = detectClientRegion();

  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const titleWho = tf("about.who_we_are.title", "Qui sommes‑nous");
  const titleSites = tf("about.our_sites.title", "Nos sites");
  const titleVision = tf("about.our_vision.title", "Notre vision");
  const titleMission = tf("about.our_mission.title", "Notre mission");
  const titleJoin = tf("about.join_team.title", "Veux‑tu rejoindre l’équipe ?");

  // valeurs remplacées par Vision & Mission

  const careersHref =
    region === "be" ? "https://www.fincargo.ai/careers" : "/careers";
  const ctaJoin = tf("about.join_team.cta", "Voir nos offres");

  // Mise en forme du texte "Qui sommes‑nous"
  const whoSentences = (whoWeAre || "").split(/(?<=[.!?])\s+/).filter(Boolean);
  const highlights = [
    /clean,?\s*ethical,?\s*and\s*optimized\s*financial\s*solutions/i,
    /liquidity/i,
    /extended\s*payment\s*terms/i,
    /reliable,?\s*high[- ]quality\s*service/i,
  ];
  const renderHighlighted = (text: string) => {
    // Applique une mise en valeur légère sur les expressions clés
    const parts: (string | JSX.Element)[] = [text];
    highlights.forEach((re, idx) => {
      for (let i = 0; i < parts.length; i++) {
        const chunk = parts[i];
        if (typeof chunk !== "string") continue;
        const m = chunk.match(re);
        if (!m) continue;
        const start = m.index ?? 0;
        const end = start + m[0].length;
        parts.splice(
          i,
          1,
          chunk.slice(0, start),
          <span
            key={`${idx}-${start}`}
            className="font-semibold text-slate-900"
          >
            {chunk.slice(start, end)}
          </span>,
          chunk.slice(end)
        );
        i += 2;
      }
    });
    return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>);
  };

  // Effets au chargement (IntersectionObserver) pour chaque section
  const whoRef = useRef<HTMLElement | null>(null);
  const sitesRef = useRef<HTMLElement | null>(null);
  const vmRef = useRef<HTMLElement | null>(null);
  const joinRef = useRef<HTMLElement | null>(null);
  // Afficher immédiatement la première section (au-dessus de la ligne de flottaison)
  const [whoVisible, setWhoVisible] = useState(true);
  const [sitesVisible, setSitesVisible] = useState(false);
  const [joinVisible, setJoinVisible] = useState(false);

  useEffect(() => {
    // Sécurité: si IntersectionObserver indisponible, afficher tout
    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
      setSitesVisible(true);
      setJoinVisible(true);
      return;
    }
    const mk = (cb: (v: boolean) => void) =>
      new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && cb(true)),
        { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
      );
    const o1 = mk(setWhoVisible);
    const o2 = mk(setSitesVisible);
    const o4 = mk(setJoinVisible);
    if (whoRef.current) o1.observe(whoRef.current);
    if (sitesRef.current) o2.observe(sitesRef.current);
    // Vision/Mission affiché sans observer
    if (joinRef.current) o4.observe(joinRef.current);

    // Fallback: si pas déclenché au bout de 1s, forcer visible
    const t = window.setTimeout(() => {
      setSitesVisible((v) => v || true);
      setJoinVisible((v) => v || true);
    }, 1000);

    return () => {
      o1.disconnect();
      o2.disconnect();
      o4.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <>
      {/* Qui sommes‑nous */}
      {whoWeAre && (
        <section ref={whoRef} className="relative bg-white py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]">
            <div className="absolute -top-10 right-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-2xl" />
            <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
          </div>
          <div className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${whoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-slate-900">
                  {titleWho}
                </h2>
                <div className="mt-5 space-y-4 text-lg md:text-2xl leading-relaxed text-slate-700 max-w-4xl">
                  {whoSentences.map((s, i) => (
                    <p key={i}>{renderHighlighted(s)}</p>
                  ))}
                </div>
              </div>
              <aside className="lg:col-span-4 lg:mt-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    {tf("about.who_we_are.highlights", "Nos engagements")}
                  </div>
                  <ul className="mt-3 space-y-2 text-slate-700 text-base md:text-lg">
                    <li className="grid grid-cols-[14px_1fr] items-start gap-x-3">
                      <span className="block h-2 w-2 rounded-full bg-cyan-500 translate-y-[6px] md:translate-y-[7px]" />
                      <span className="leading-relaxed">
                        {tf(
                          "about.who.point1",
                          "Financement propre, éthique et optimisé"
                        )}
                      </span>
                    </li>
                    <li className="grid grid-cols-[14px_1fr] items-start gap-x-3">
                      <span className="block h-2 w-2 rounded-full bg-blue-500 translate-y-[6px] md:translate-y-[7px]" />
                      <span className="leading-relaxed">
                        {tf(
                          "about.who.point2",
                          "Liquidité pour accélérer la croissance"
                        )}
                      </span>
                    </li>
                    <li className="grid grid-cols-[14px_1fr] items-start gap-x-3">
                      <span className="block h-2 w-2 rounded-full bg-cyan-500 translate-y-[6px] md:translate-y-[7px]" />
                      <span className="leading-relaxed">
                        {tf(
                          "about.who.point3",
                          "Se concentrer sur un service fiable et de qualité"
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* KPIs */}
      <SectionKPIs context="about" />

      {/* Nos sites */}
      <section ref={sitesRef} className="relative bg-white py-16 md:py-24">
        <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${sitesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-slate-900">
              {titleSites}
            </h2>
            <p className="mt-2 text-slate-600">
              {tf(
                "about.our_sites.subtitle",
                "Deux présences pour mieux servir nos clients"
              )}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Adresses à gauche */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm">
                  <div className="pointer-events-none absolute -top-10 -left-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />
                  <div className="flex items-center gap-2 text-slate-900">
                    <div className="inline-flex items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-700 ring-1 ring-cyan-500/20 p-2">
                      <svg
                        className="size-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M12 21s-6-5.33-6-10a6 6 0 1112 0c0 4.67-6 10-6 10z" />
                        <circle cx="12" cy="11" r="2.5" />
                      </svg>
                    </div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                      {tf("about.sites.global", "Site global")}
                    </div>
                  </div>
                  <address className="not-italic mt-3 text-slate-800 leading-relaxed">
                    {(
                      tl("about.address.ch") || [
                        "Fincargo SA",
                        "Rue de L’Industrie 23",
                        "1950 Sion",
                        tf("country.ch", "Switzerland"),
                      ]
                    ).map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </address>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm">
                  <div className="pointer-events-none absolute -top-10 -left-10 h-28 w-28 rounded-full bg-blue-400/10 blur-3xl" />
                  <div className="flex items-center gap-2 text-slate-900">
                    <div className="inline-flex items-center justify-center rounded-lg bg-blue-400/10 text-blue-700 ring-1 ring-blue-500/20 p-2">
                      <svg
                        className="size-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M12 21s-6-5.33-6-10a6 6 0 1112 0c0 4.67-6 10-6 10z" />
                        <circle cx="12" cy="11" r="2.5" />
                      </svg>
                    </div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                      {tf("about.sites.es", "Site Espagne")}
                    </div>
                  </div>
                  <address className="not-italic mt-3 text-slate-800 leading-relaxed">
                    {(
                      tl("about.address.es") || [
                        "Fincargo Iberia SL",
                        "Avenida Diagonal, 598",
                        "08021 Barcelona",
                        tf("country.es", "Spain"),
                      ]
                    ).map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </address>
                </div>
              </div>
            </div>

            {/* Carte alignée à droite */}
            <div className="lg:col-span-6 flex lg:justify-end">
              <Image
                src="/images/fincargo_map.png"
                alt={tf("about.map_alt", "Carte des implantations Fincargo")}
                width={1200}
                height={800}
                className="w-full h-auto object-right max-w-[420px] md:max-w-[520px] lg:max-w-[460px]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission ensemble */}
      {(vision || mission) && (
        <section ref={vmRef} className="relative bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-10">
              <div className="lg:col-span-6">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-slate-900">
                  {titleVision}
                </h2>
                {vision && (
                  <p className="mt-5 text-lg md:text-2xl leading-relaxed text-slate-700">
                    {vision}
                  </p>
                )}
              </div>
              <div className="lg:col-span-6">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-slate-900">
                  {titleMission}
                </h2>
                {mission && (
                  <p className="mt-5 text-lg md:text-2xl leading-relaxed text-slate-700">
                    {mission}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* (ancienne section mission supprimée au profit du bloc combiné) */}

      {/* Rejoindre l’équipe */}
      <section ref={joinRef} className="relative py-16 md:py-24">
        <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${joinVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-darkBlue to-black text-white ring-1 ring-white/10 shadow-2xl px-6 py-12 md:px-10 md:py-16">
            <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen">
              <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_10%_-10%,rgba(103,232,249,0.12),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(191,219,254,0.12),transparent)]" />
            </div>
            <div className="relative">
              <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight">
                {titleJoin}
              </h2>
              <p className="mt-2 text-white/85 max-w-2xl">
                {tf(
                  "about.join_team.desc",
                  "Nous cherchons des profils passionnés par le transport, la donnée et l’impact client."
                )}
              </p>
              <a
                href={careersHref}
                target={careersHref.startsWith("http") ? "_blank" : undefined}
                rel={
                  careersHref.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-white/80 hover:bg-white/95"
              >
                {ctaJoin}
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
