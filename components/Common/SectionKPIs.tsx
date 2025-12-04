"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import type { Region } from "@/lib/i18n";

interface Props {
  region?: Region; // reserved for future regional variants
}

export default function SectionKPIs({}: Props) {
  const { tl, language } = useTranslation();
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.12, rootMargin: "0px 0px 160px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const titlesTl = tl("kpis.titles");
  const descTl = tl("kpis.desc");
  const titles =
    Array.isArray(titlesTl) && titlesTl.length
      ? (titlesTl as string[])
      : [
          "24 Hours",
          "90 → 1 Days",
          "99.5% Approval",
          "70% Less Admin",
          "0 Hidden Fees",
        ];
  const desc =
    Array.isArray(descTl) && descTl.length
      ? (descTl as string[])
      : [
          "Cash approval, fast liquidity when it’s needed most",
          "DSO acceleration with instant payment on delivery",
          "First-pass invoice acceptance with clean data capture",
          "Automation reduces workload and errors",
          "Transparent pricing and fair access to capital",
        ];

  const items = titles.map((t, i) => ({ title: t, desc: desc[i] ?? "" }));

  const nf = useMemo(
    () => new Intl.NumberFormat(language || "en", { maximumFractionDigits: 1 }),
    [language]
  );

  type Spec =
    | {
        kind: "number";
        from: number;
        to: number;
        decimals?: number;
        suffix?: string;
        labelRest?: string;
      }
    | {
        kind: "range";
        from: number;
        to: number;
        decimals?: number;
        endLabel?: string;
        labelRest?: string;
      };

  const parseSpec = (title: string): Spec => {
    // Normalize and be resilient to invisible chars and varied arrows
    const s0 = title
      .replace(/\u200B|\u2009|\u00A0/g, " ") // zero‑width, thin space, nbsp → space
      .trim();

    // Robust range parse: first two numbers + trailing label when arrow present (→ or ->)
    if (/[→\-]>/u.test(s0) || /→/u.test(s0)) {
      const nums = s0.match(/\d+[\.,]?\d*/g);
      if (nums && nums.length >= 2) {
        const fromStr = nums[0];
        const toStr = nums[1];
        const from = parseFloat(fromStr.replace(",", "."));
        const to = parseFloat(toStr.replace(",", "."));
        // label is whatever comes after the second number occurrence
        const secondIndex = s0.indexOf(toStr, s0.indexOf(fromStr) + fromStr.length);
        const rest = secondIndex >= 0 ? s0.slice(secondIndex + toStr.length).trim() : "";
        return {
          kind: "range",
          from,
          to,
          decimals: Number.isInteger(to) && Number.isInteger(from) ? 0 : 1,
          endLabel: nf.format(to),
          labelRest: rest,
        };
      }
    }

    // Fallback: single number with optional % and trailing label
    const m = s0.match(/^(\d+[\.,]?\d*)(\s*%?)(.*)$/u);
    if (m) {
      const val = parseFloat(m[1].replace(",", "."));
      const hasPct = !!m[2]?.includes("%");
      const rest = (m[3] || "").trim();
      return {
        kind: "number",
        from: 0,
        to: val,
        decimals: Number.isInteger(val) ? 0 : 1,
        suffix: hasPct ? " %" : "",
        labelRest: rest,
      };
    }
    return { kind: "number", from: 0, to: 0 };
  };

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const Count = ({ spec, run }: { spec: Spec; run: boolean }) => {
    const [val, setVal] = useState(spec.kind === "range" ? spec.from : 0);
    useEffect(() => {
      if (!run) return;
      let raf = 0;
      const start = performance.now();
      const dur = 1400;
      const from =
        spec.kind === "range"
          ? spec.from
          : (spec as { from: number }).from ?? 0;
      const to =
        spec.kind === "range" ? spec.to : (spec as { to: number }).to ?? 0;
      const step = () => {
        const t = Math.min(1, (performance.now() - start) / dur);
        const k = easeOut(t);
        const cur = from + (to - from) * k;
        setVal(cur);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, [run, spec]);

    const decimals = (spec as { decimals?: number }).decimals ?? 0;
    const formatted = nf.format(Number(val.toFixed(decimals)));
    if (spec.kind === "range") {
      // Afficher la valeur de départ (ex: 90) à gauche en statique,
      // et la valeur cible à droite après la flèche (ex: → 1).
      const startLabel = nf.format((spec as { from: number }).from ?? 0);
      const endLabel = (spec as { endLabel?: string }).endLabel ?? nf.format((spec as { to: number }).to ?? 0);
      return (
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#67e8f9] to-[#bfdbfe]">
            {startLabel}
          </span>
          <span className="text-white/70 text-sm md:text-base">→ {endLabel}</span>
        </div>
      );
    }
    return (
      <span className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#67e8f9] to-[#bfdbfe]">
        {formatted}
        {(spec as { suffix?: string }).suffix || ""}
      </span>
    );
  };

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-darkBlue to-black py-14 md:py-18 text-white"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_10%_-10%,rgba(103,232,249,0.12),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(191,219,254,0.12),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {items.map((it, i) => (
            <li
              key={i}
              className="relative px-0 py-2 md:py-3 lg:border-l lg:border-white/15 lg:pl-6"
              style={{ transitionDelay: `${80 + i * 60}ms` }}
            >
              <div className="relative">
                <Count spec={parseSpec(it.title)} run={visible} />
                {/* label from title remainder */}
                {(() => {
                  const s = parseSpec(it.title);
                  const label = (s as { labelRest?: string }).labelRest;
                  return label ? (
                    <div className="mt-1 text-xs md:text-sm text-white/80">
                      {label}
                    </div>
                  ) : null;
                })()}
                <p className="mt-2 text-sm md:text-base text-white/85 leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
