import Header from "@/components/Header/Main";
import Footer from "@/components/Footer";

export const metadata = { title: "SCF for Insurers & Credit Insurers | Fincargo" };

const howItWorks = [
  "Operationally executed",
  "Contractually correct",
  "Fiscally compliant",
  "Digitally accepted",
];

const riskBenefits = [
  "Clear linkage between insured exposure and real activity",
  "Full audit trail from execution to invoice acceptance",
  "Reduced information asymmetry",
];

const sections = [
  {
    title: "Fraud & Dilution Risk Signals",
    body: "Combined execution, invoice, and acceptance data identifies early indicators of fraud or abnormal behaviour.",
    impact: "Early detection reduces loss ratios and strengthens preventive controls.",
  },
  {
    title: "Portfolio Monitoring & Exposure Control",
    body: "Insurers monitor exposure dynamically at counterparty, buyer, or transaction level.",
    impact: "Risk management becomes proactive, reducing surprise losses and improving capital efficiency.",
  },
  {
    title: "Intelligence Layer",
    body: "Deterministic rules enforce traceability and consistency, while machine learning analyses behaviour, disputes, and execution anomalies. All outputs are transparent and auditable.",
    impact: "Insurers improve underwriting precision and portfolio monitoring without altering core models or regulatory posture.",
  },
];

export default function SCFInsurersPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="bg-gradient-to-br from-darkBlue to-black text-white py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/20">
              Financial Institutions
            </span>
            <h1 className="mt-5 text-5xl md:text-7xl font-extrabold tracking-tight uppercase leading-tight">
              SCF for Insurers & Credit Insurers
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              Transaction-level risk visibility powered by verified operational and financial data.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">

            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">Supply Chain Finance</h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Our Supply Chain Finance platform enables insurers and credit insurers to assess, monitor, and protect risk using execution-backed transaction data, rather than static declarations or ex-post reporting.
              </p>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                By leveraging e-Waybill, Invoice Integrity and Automation, and e-Invoicing, insurers gain granular, auditable insight into real economic activity.
              </p>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                The platform is a technology and data orchestration layer only. It does not underwrite, distribute, or intermediate insurance products.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 uppercase">How it works</h2>
              <p className="mt-3 text-slate-600">Only transactions that are:</p>
              <ul className="mt-4 space-y-3">
                {howItWorks.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-slate-700">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-slate-600 leading-relaxed">
                are exposed through structured data feeds and workflows, enabling continuous, transaction-level risk assessment rather than periodic portfolio snapshots.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 text-white p-8">
              <h2 className="text-2xl font-bold uppercase">Risk Visibility Connector</h2>
              <p className="mt-2 text-white/70 font-medium">Execution-backed data for insurance decision-making</p>
              <p className="mt-4 text-white/80 leading-relaxed">
                The platform exposes verified transaction data via secure APIs and interfaces.
              </p>
              <ul className="mt-6 space-y-3">
                {riskBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white/80">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm font-semibold text-white/50 uppercase tracking-widest">Business impact</p>
                <p className="mt-2 text-white/80 leading-relaxed">Underwriting quality improves while uncertainty and loss volatility decrease.</p>
              </div>
            </div>

            {sections.map((s) => (
              <div key={s.title} className="border-t border-slate-100 pt-10">
                <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{s.body}</p>
                <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Business impact</p>
                  <p className="mt-1 text-slate-700 leading-relaxed">{s.impact}</p>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 text-center">
              <p className="text-indigo-700 font-semibold italic">
                "A transaction-level risk intelligence layer — not an underwriter, not a distributor."
              </p>
            </div>

            <div>
              <a href="/get-started" className="inline-flex items-center gap-2 rounded-full bg-darkBlue px-6 py-3 text-white font-semibold shadow hover:bg-lightBlue transition">
                Get started
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
