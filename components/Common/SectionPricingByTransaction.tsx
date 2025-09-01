"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

/* --------- Small inline icon --------- */
function IconInfo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01" />
      <path d="M10.8 12h2.4v5h-2.4z" />
    </svg>
  );
}

export default function SectionPricingByTransaction() {
  const { t, tl } = useTranslation();
  const [audience, setAudience] = useState<"fs" | "carrier">("fs");

  // helpers + fallbacks
  const tf = (key: string, fb = "") => (t(key) === key ? fb : t(key));
  const ta = (key: string, fb: string[] = []) => {
    const arr = tl(key);
    return Array.isArray(arr) && arr.length ? (arr as string[]) : fb;
  };

  // copy
  const title = tf("pricing.by_transaction.title", "See Fincargo in ACTION");
  const headers = ta("pricing.by_transaction.table.headers", [
    "Module / Service",
    "Fee for Forwarder & Shipper",
    "Fee for Carrier",
  ]);
  const H0 = headers[0] ?? "Module / Service";
  const H1 = headers[1] ?? "Fee for Forwarder & Shipper";
  const H2 = headers[2] ?? "Fee for Carrier";

  // rows: string[][]
  const rowsRaw = tl("pricing.by_transaction.table.rows");
  const rows: string[][] =
    Array.isArray(rowsRaw) && rowsRaw.every((r) => Array.isArray(r))
      ? (rowsRaw as unknown as string[][])
      : [];

  const disclaimer = tf(
    "pricing.by_transaction.disclaimer",
    "Transactional pricing is volume-dependent and starts from CHF 0.50 per module and shipment. Integration, calibration, and analytics services are optional add-ons; factoring available for carriers and small forwarders."
  );

  return (
    <section
      id="pricing-by-transaction"
      className="relative bg-white py-16 sm:py-24 md:py-32 overflow-x-hidden"
    >
      {/* soft accents */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute right-10 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-900/10">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
          PRICING
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
          {title}
        </h2>

        {/* Mobile audience toggle */}
        <div className="mt-4 lg:hidden">
          <div
            role="tablist"
            aria-label="Select audience"
            className="inline-flex rounded-xl bg-slate-100 p-1 ring-1 ring-slate-200"
          >
            <button
              type="button"
              role="tab"
              aria-selected={audience === "fs"}
              onClick={() => setAudience("fs")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                audience === "fs"
                  ? "bg-white text-slate-900 shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {H1}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={audience === "carrier"}
              onClick={() => setAudience("carrier")}
              className={`ml-1 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                audience === "carrier"
                  ? "bg-white text-slate-900 shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {H2}
            </button>
          </div>
        </div>

        {/* ===== Compact table for mobile & tablet (< lg) ===== */}
        <div className="mt-8 lg:hidden overflow-hidden rounded-2xl border border-slate-200 ring-1 ring-slate-900/5 bg-white shadow-sm">
          {/* Mobile table header: shows module and selected audience label once */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50/70 px-4 py-2">
            <div className="text-[11px] font-semibold uppercase text-slate-600">
              {H0}
            </div>
            <div className="text-right text-[11px] font-semibold uppercase text-slate-600">
              {audience === "fs" ? H1 : H2}
            </div>
          </div>
          {/* Rows */}
          <ul className="divide-y divide-slate-200">
            {rows.map((r, idx) => (
              <li key={idx} className="grid grid-cols-2 gap-3 px-4 py-3">
                <div className="text-sm font-medium text-slate-900">{r[0]}</div>
                <div className="text-sm text-slate-800 text-right break-words">
                  {audience === "fs" ? r[1] : r[2]}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Table for large screens (>= lg) ===== */}
        <div className="mt-8 hidden lg:block overflow-hidden rounded-2xl border border-slate-200 ring-1 ring-slate-900/5 bg-white shadow-sm">
          <div className="pointer-events-none -mt-px h-px w-full bg-gradient-to-r from-transparent via-slate-400/40 to-transparent" />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/60 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-50/60">
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className={`px-6 py-3 text-left text-xs font-semibold tracking-wide uppercase text-slate-700 ${
                        i === 0 ? "w-[32%] min-w-[240px]" : "min-w-[280px]"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rows.map((r, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {r[0]}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 whitespace-normal break-words">{r[1]}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 whitespace-normal break-words">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* disclaimer */}
        <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 sm:px-5 sm:py-4 ring-1 ring-slate-200">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
              <IconInfo className="h-4 w-4 text-slate-700" />
            </span>
            <p className="text-[13px] sm:text-sm md:text-[15px] leading-relaxed text-slate-700">
              {disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
