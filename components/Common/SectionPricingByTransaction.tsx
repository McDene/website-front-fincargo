"use client";
import { useTranslation } from "@/hooks/useTranslation";

/* --------- Small inline icon --------- */
// function IconInfo(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       {...props}
//     >
//       <circle cx="12" cy="12" r="9" />
//       <path d="M12 8h.01" />
//       <path d="M10.8 12h2.4v5h-2.4z" />
//     </svg>
//   );
// }

export default function SectionPricingByTransaction() {
  const { t, tl } = useTranslation();

  // helpers + fallbacks
  const tf = (key: string, fb = "") => (t(key) === key ? fb : t(key));
  const ta = (key: string, fb: string[] = []) => {
    const arr = tl(key);
    return Array.isArray(arr) && arr.length ? (arr as string[]) : fb;
  };

  // copy
  const title = tf("pricing.by_transaction.title", "See Fincargo in ACTION");
  const desc = tf(
    "pricing.by_transaction.hero.caption",
    "Transactional pricing is volume-dependent and starts from CHF 0.50 per module and shipment."
  );
  const headers = ta("pricing.by_transaction.table.headers", [
    "Plan / Item",
    "From‑Price",
    "Unit",
    "What’s included",
  ]);
  const H0 = headers[0] ?? "Plan / Item";
  const H1 = headers[1] ?? "From‑Price";
  const H2 = headers[2] ?? "Unit";
  const H3 = headers[3] ?? "What’s included";

  // rows: string[][]
  const fallbackRows: string[][] = [
    [
      "e‑Waybill / e‑CMR",
      "CHF 0.05",
      "per transaction",
      "Multi-party e‑Waybill; tamper‑proof; and additional anti‑fraud features",
    ],
    [
      "e‑Invoicing",
      "CHF 0.05",
      "per invoice",
      "Collection & payment; authority‑ready formats; multi‑rail delivery",
    ],
    [
      "Pre/Post‑Billing Audit",
      "CHF 0.15",
      "per invoice",
      "AI‑assisted checks; buyer profile optimization; explainable reasons",
    ],
    [
      "Financing — Factoring",
      "0.033–0.15% / day + fixed CHF fee",
      "per financed invoice",
      "Advance rate and fee depend on buyer risk and ageing",
    ],
    [
      "Enterprise & Integrations",
      "Custom",
      "one-off",
      "Standardized connectors, bi-directional.",
    ],
  ];
  const rowsRaw = tl("pricing.by_transaction.table.rows");
  const rowsTrans: string[][] =
    Array.isArray(rowsRaw) && rowsRaw.every((r) => Array.isArray(r))
      ? (rowsRaw as unknown as string[][])
      : [];
  const rows: string[][] = rowsTrans.length ? rowsTrans : fallbackRows;

  // const example = tf(
  //   "pricing.by_transaction.example",
  //   "Illustrative example (simple‑interest): at 0.12%/day for 30 days, fees ≈ 3.6% of face value + fixed service fee. Actual costs depend on eligibility, program terms, and days outstanding."
  // );
  const notes = tf(
    "pricing.by_transaction.notes",
    "Notes: Prices are indicative and subject to underwriting, volume, compliance and taxes. Financing subject to eligibility and program agreements."
  );

  return (
    <section
      id="pricing"
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
        <p className="mt-3 text-lg md:text-xl text-slate-600">{desc}</p>

        {/* ===== Mobile: stacked cards (no horizontal scroll) ===== */}
        <div className="mt-8 grid gap-3 lg:hidden">
          {rows.map((r, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white px-4 py-4 ring-1 ring-slate-200 border border-slate-200 shadow-sm"
            >
              <div className="text-base font-semibold text-slate-900">
                {r[0]}
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <div>
                  <div className="text-[11px] font-semibold uppercase text-slate-500">
                    {H1}
                  </div>
                  <div className="text-sm text-slate-700">{r[1]}</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase text-slate-500">
                    {H2}
                  </div>
                  <div className="text-sm text-slate-700">{r[2]}</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase text-slate-500">
                    {H3}
                  </div>
                  <div className="text-sm text-slate-700">{r[3]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Desktop: 4-column table ===== */}
        <div className="mt-8 hidden lg:block overflow-hidden rounded-2xl border border-slate-200 ring-1 ring-slate-900/5 bg-white shadow-sm">
          <div className="pointer-events-none -mt-px h-px w-full bg-gradient-to-r from-transparent via-slate-400/40 to-transparent" />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/60 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-50/60">
                <tr>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold tracking-wide uppercase text-slate-700 w-[26%] min-w-[220px]">
                    {H0}
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold tracking-wide uppercase text-slate-700 min-w-[160px]">
                    {H1}
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold tracking-wide uppercase text-slate-700 min-w-[160px]">
                    {H2}
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold tracking-wide uppercase text-slate-700 min-w-[360px]">
                    {H3}
                  </th>
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
                    <td className="px-6 py-4 text-sm text-slate-700 whitespace-normal break-words">
                      {r[1]}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 whitespace-normal break-words">
                      {r[2]}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 whitespace-normal break-words">
                      {r[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Example */}
        {/* <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 sm:px-5 sm:py-4 ring-1 ring-slate-200">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
              <IconInfo className="h-4 w-4 text-slate-700" />
            </span>
            <p className="text-[13px] sm:text-sm md:text-[15px] leading-relaxed text-slate-700">
              {example}
            </p>
          </div>
        </div> */}
        {/* Notes */}
        <p className="mt-3 text-[12px] sm:text-[13px] text-slate-600">
          {notes}
        </p>
      </div>
    </section>
  );
}
