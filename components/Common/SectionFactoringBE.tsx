"use client";

import { useEffect, useRef, useState } from "react";
import { EINVOICING_BE } from "@/lib/e-invoicing-be";
import type { LanguageCore, Region } from "@/lib/i18n";
import Image from "next/image";
import {
  DocumentCheckIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  CurrencyEuroIcon,
  PencilSquareIcon,
  ServerStackIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import BenefitsSwitcher from "@/components/Common/BenefitsSwitcher";

interface Props {
  region: Region;
  language: LanguageCore;
  regulationImage?: { src: string; alt: string };
}

export default function SectionFactoringBE({
  region,
  language,
  regulationImage,
}: Props) {
  const t = EINVOICING_BE[language] || EINVOICING_BE.en;

  const img = regulationImage; // supprimer l'image si non fournie

  // Effets au chargement (IntersectionObserver)
  const [v, setV] = useState([false, false, false, false]);
  const r0 = useRef<HTMLElement | null>(null);
  const r1 = useRef<HTMLElement | null>(null);
  const r2 = useRef<HTMLElement | null>(null);
  const r3 = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const refs = [r0, r1, r2, r3];
    const observers: IntersectionObserver[] = [];
    refs.forEach((r, idx) => {
      const el = r.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setV((old) => old.map((b, i) => (i === idx ? true : b)))),
        { threshold: 0.12, rootMargin: "0px 0px 160px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (region !== "be") return null;

  return (
    <>
      {/* Regulation (white) */}
      <section ref={r0} className="relative bg-white py-16 md:py-24">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Accent chips */}
          <div className={`flex flex-wrap items-center gap-2 transition-all duration-700 ${v[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            {["B2B 2026", "EN 16931", "Peppol BIS 3.0", "ViDA"].map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-lightBlue" />
                {c}
              </span>
            ))}
          </div>

          <h2 className={`mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase transition-all duration-700 ${v[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            {t.regulation.h2}
          </h2>

          <div
            className={`mt-6 grid grid-cols-1 ${
              img ? "md:grid-cols-12 md:items-center gap-6" : "gap-4"
            } transition-all duration-700 ${v[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          >
            {/* Text side */}
            <div className={img ? "md:col-span-7 xl:col-span-8" : ""}>
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
                {t.regulation.bulletsTitle}
              </h3>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.regulation.bullets.map((b, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white px-4 py-4 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow md:transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="relative top-[1px] inline-flex h-2.5 w-2.5 rounded-full bg-lightBlue" />
                      <span className="text-slate-800">{b}</span>
                    </div>
                  </div>
                ))}
              </div>

              {t.regulation.note && (
                <p className="mt-4 text-slate-700 max-w-3xl">
                  {t.regulation.note}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Peppol (dark) */}
      <section ref={r1} className="relative bg-gradient-to-b from-darkBlue to-black py-16 md:py-24 text-white">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight uppercase transition-all duration-700 ${v[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            {t.whyPeppol.h2}
          </h2>
          <div className={`mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:items-center transition-all duration-700 ${v[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            {/* Left: bullets */}
            <div className="md:col-span-8">
              <h3 className="text-base font-semibold text-white/95 tracking-wide">
                {t.whyPeppol.bulletsTitle}
              </h3>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.whyPeppol.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3 hover:bg-white/7.5 transition"
                  >
                    <span className="text-white/90">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-white/85 max-w-4xl">{t.whyPeppol.note}</p>
            </div>

            {/* Right: Peppol logo card */}
            <aside className="md:col-span-4">
              <div className="relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 shadow-2xl">
                <div className="absolute -inset-6 opacity-40 [mask-image:radial-gradient(60%_60%_at_70%_30%,black,transparent)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                </div>
                <div className="relative aspect-[3/2] flex items-center justify-center">
                  <Image
                    src="/images/peppol_logo.webp"
                    alt="Peppol logo"
                    fill
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 320px, 85vw"
                    className="object-contain p-4"
                    priority={false}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* e-CMR (white) */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-8 -top-6 h-40 w-40 rounded-full bg-lightBlue/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-darkBlue/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
            {t.ecmr.h2}
          </h2>
          <p className="mt-2 text-slate-700">{t.ecmr.tagline}</p>

          {/* Flow chips: prestation → CMR → facture */}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            {["Prestation", "CMR / e‑CMR", "Facture EN 16931"].map(
              (label, idx, arr) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200 text-slate-800">
                    <span className="h-2 w-2 rounded-full bg-lightBlue" />
                    {label}
                  </span>
                  {idx < arr.length - 1 && (
                    <svg
                      className="h-4 w-4 text-slate-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              )
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls panel */}
            <article className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 ring-1 ring-slate-900/5 shadow-sm lg:col-span-7 xl:col-span-8">
              <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-lightBlue to-darkBlue" />
              <div className="p-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Contrôles automatiques
                </h3>
                <ul className="mt-3 space-y-2">
                  {t.ecmr.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-800"
                    >
                      <span className="relative top-[1px] inline-flex h-2 w-2 rounded-full bg-darkBlue" />
                      <span className="text-sm md:text-base">{b}</span>
                    </li>
                  ))}
                </ul>
                {t.ecmr.note && (
                  <p className="mt-4 text-slate-700">{t.ecmr.note}</p>
                )}
              </div>
            </article>

            {/* KPI card */}
            <aside className="lg:col-span-5 xl:col-span-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-darkBlue to-black text-white ring-1 ring-white/10 p-6">
                <div className="absolute -inset-10 opacity-40 [mask-image:radial-gradient(60%_60%_at_70%_30%,black,transparent)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                </div>
                <p className="relative text-xs uppercase tracking-widest text-white/80">{t.ecmr.kpi.title}</p>
                <p className="relative mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">{t.ecmr.kpi.value}</span>
                </p>
                <p className="relative mt-1 text-white/85">{t.ecmr.kpi.subtitle}</p>
                <div className="relative mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2">{t.ecmr.kpi.chips[0]}</div>
                  <div className="rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2">{t.ecmr.kpi.chips[1]}</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Benefits (dark) */}
      <section ref={r2} className="relative bg-gradient-to-b from-darkBlue to-black py-16 md:py-24 text-white">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight uppercase transition-all duration-700 ${v[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            {t.benefits.h2}
          </h2>
          <div className={`mt-6 transition-all duration-700 ${v[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <BenefitsSwitcher
              groups={[
                { key: 'carriers', title: t.benefits.carriers.title, items: t.benefits.carriers.items },
                { key: 'forwarders', title: t.benefits.forwarders.title, items: t.benefits.forwarders.items },
                { key: 'shippers', title: t.benefits.shippers.title, items: t.benefits.shippers.items },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Capabilities (white) */}
      <section ref={r3} className="relative bg-white py-16 md:py-24">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase transition-all duration-700 ${v[3] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            {t.capabilities.h2}
          </h2>

          <div className={`mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${v[3] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            {t.capabilities.items.map((c, i) => {
              const ICONS = [
                DocumentCheckIcon, // EN 16931
                GlobeAltIcon, // Peppol BIS 3.0
                CodeBracketIcon, // UBL 2.1
                CurrencyEuroIcon, // TVA
                PencilSquareIcon, // Signatures / preuves
                ServerStackIcon, // API ERP/TMS
                LanguageIcon, // Multi-langue
              ];
              const Icon = ICONS[i % ICONS.length];
              return (
                <article
                  key={i}
                  className="rounded-2xl bg-white border border-slate-200 ring-1 ring-slate-900/5 shadow-sm px-6 py-6 hover:shadow-md transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
                      <p className="mt-2 text-slate-700">{c.desc}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* end */}
    </>
  );
}
