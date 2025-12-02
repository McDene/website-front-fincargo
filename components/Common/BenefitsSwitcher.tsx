"use client";

import { useMemo, useState } from "react";

interface Group {
  key: string;
  title: string;
  items: string[];
}

interface BenefitsSwitcherProps {
  groups: Group[];
}

export default function BenefitsSwitcher({ groups }: BenefitsSwitcherProps) {
  const [active, setActive] = useState(0);
  const max = groups.length - 1;
  const current = useMemo(() => groups[active], [groups, active]);

  const next = () => setActive((i) => (i >= max ? 0 : i + 1));
  const prev = () => setActive((i) => (i <= 0 ? max : i - 1));

  return (
    <div className="w-full">
      {/* Segmented control */}
      <div className="inline-flex rounded-full bg-white/5 ring-1 ring-white/10 p-1">
        {groups.map((g, i) => (
          <button
            key={g.key}
            onClick={() => setActive(i)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
              i === active ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10"
            }`}
            aria-pressed={i === active}
          >
            {g.title}
          </button>
        ))}
      </div>

      {/* Content card */}
      <div className="mt-5 relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
        <div className="absolute -inset-8 opacity-40 [mask-image:radial-gradient(60%_60%_at_70%_30%,black,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
        </div>

        <div className="relative">
          <h3 className="text-lg font-bold text-white">{current.title}</h3>

          <ul className="mt-3 space-y-2">
            {current.items.map((it, idx) => (
              <li key={idx} className="flex items-start gap-2 text-white/90">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-white/50" />
                <span className="text-sm md:text-base">{it}</span>
              </li>
            ))}
          </ul>

          {/* Nav */}
          <div className="mt-4 flex items-center justify-between text-sm text-white/80">
            <button
              onClick={prev}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/10 hover:bg-white/15 ring-1 ring-white/20"
              aria-label="Previous"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5m6 7l-7-7 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Prev
            </button>
            <span className="opacity-80">{active + 1} / {groups.length}</span>
            <button
              onClick={next}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/10 hover:bg-white/15 ring-1 ring-white/20"
              aria-label="Next"
            >
              Next
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14m-6-7l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

