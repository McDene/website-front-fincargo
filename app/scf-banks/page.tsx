import Header from "@/components/Header/Main";
import Footer from "@/components/Footer";

export const metadata = { title: "SCF for Banks | Fincargo" };

const howItWorks = [
  "Operationally executed",
  "Contractually correct",
  "Fiscally compliant",
  "Digitally accepted",
];

const factorBenefits = [
  "Transaction-level factoring and reverse factoring",
  "Verified execution and invoice acceptance signals",
  "Explainable eligibility criteria and audit-ready data",
  "Seamless integration with core banking systems",
];

const sections = [
  {
    title: "Trade Finance Connectivity",
    body: "Trade-related transactions are enriched with digital execution evidence, aligning financing with real physical flows.",
    impact: "Banks gain earlier visibility and reduced documentary friction while maintaining full control over trade risk decisions.",
  },
  {
    title: "Insurance & Risk Visibility",
    body: "Structured data supports credit insurance usage and internal risk mitigation, without insurance distribution or underwriting.",
    impact: "Risk teams gain higher-quality signals to support limits, coverage decisions, and capital allocation.",
  },
  {
    title: "Intelligence Layer",
    body: "Deterministic rules enforce eligibility and compliance, while machine learning enriches transactions with behavioural and performance insights.",
    impact: "Higher origination efficiency without compromising governance or regulatory expectations.",
  },
];

export default function SCFBanksPage() {
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
              SCF for Banks
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              Transaction-level origination powered by verified data — compliant, explainable, and scalable.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">

            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">Supply Chain Finance</h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Our Supply Chain Finance platform enables banks to originate and service receivables- and trade-finance transactions using verified, execution-backed data, rather than manual documentation or aggregated programs.
              </p>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                By leveraging e-Waybill, Invoice Integrity and Automation, and e-Invoicing, only clean, validated, and fiscally accepted transactions are exposed — supporting disciplined credit decisions and regulatory compliance.
              </p>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                The platform acts strictly as a technology and orchestration agent. All underwriting, pricing, credit decisions, and balance-sheet exposure remain entirely with the bank.
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
                are exposed to banks via <strong>Factor Connector™</strong>, under a standardised and auditable workflow. The platform does <strong>not</strong> intermediate credit or assume risk. It accelerates origination and servicing using structured, decision-ready data.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 text-white p-8">
              <h2 className="text-2xl font-bold uppercase">Factor Connector™</h2>
              <p className="mt-2 text-white/70 font-medium">Originate factoring and reverse factoring with execution-grade data</p>
              <p className="mt-4 text-white/80 leading-relaxed">
                Factor Connector™ is a web-based and API-based connector that exposes eligible Accounts Receivable to banks as a stream of transaction-level financing opportunities.
              </p>
              <ul className="mt-6 space-y-3">
                {factorBenefits.map((b) => (
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
                <p className="mt-2 text-white/80 leading-relaxed">Banks reduce onboarding and servicing costs while originating higher-quality, lower-risk short-term assets without changing their risk frameworks.</p>
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
                "A transaction-origination accelerator — not a lender, not a financial intermediary."
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
