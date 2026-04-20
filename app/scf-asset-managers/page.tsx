import Header from "@/components/Header/Main";
import Footer from "@/components/Footer";

export const metadata = { title: "SCF for Asset Managers & Credit Funds | Fincargo" };

const discretion = [
  "Asset selection",
  "Pricing",
  "Risk appetite",
  "Portfolio construction",
];

const factorBenefits = [
  "Short-duration, self-liquidating assets",
  "Granular exposure at invoice level",
  "Transparent data lineage and economics",
  "Scalable deployment without origination build-out",
];

const sections = [
  {
    title: "Trade Finance Assets",
    body: "Trade-related transactions are linked to physical execution evidence.",
    impact: "Asset risk aligns more closely with real economic activity, supporting diversification and structured portfolios.",
  },
  {
    title: "Insurance & Credit Enhancement Signals",
    body: "Structured data supports insurance, guarantees, or internal enhancement mechanisms.",
    impact: "Improved structuring flexibility without opaque assumptions.",
  },
  {
    title: "Intelligence Layer",
    body: "Rules ensure baseline eligibility, while machine learning enriches asset scoring using payment behaviour, disputes, and counterparty patterns.",
    impact: "Improved asset selection and monitoring with minimal operational overhead.",
  },
];

export default function SCFAssetManagersPage() {
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
              SCF for Asset Managers & Credit Funds
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              Access to short-duration, data-verified assets — scalable, transparent, and repeatable.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">

            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">Supply Chain Finance</h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Our Supply Chain Finance platform enables asset managers and credit funds to access transaction-level receivables and trade assets, backed by verified execution and invoice acceptance data.
              </p>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                By leveraging e-Waybill, Invoice Integrity and Automation, and e-Invoicing, the platform surfaces clean, self-liquidating assets suitable for private credit, structured finance, and alternative debt strategies.
              </p>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                The platform operates as a neutral connector, not a lender, arranger, or fund.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 uppercase">How it works</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Eligible transactions generated from real economic activity are exposed continuously via Factor Connector™. Asset managers retain full discretion over:
              </p>
              <ul className="mt-4 space-y-3">
                {discretion.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-slate-700">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-slate-900 text-white p-8">
              <h2 className="text-2xl font-bold uppercase">Factor Connector™</h2>
              <p className="mt-2 text-white/70 font-medium">Continuous access to granular receivable assets</p>
              <p className="mt-4 text-white/80 leading-relaxed">
                Factor Connector™ connects funds to a stream of verified, transaction-level receivables through APIs or a secure interface.
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
                <p className="mt-2 text-white/80 leading-relaxed">Funds access repeatable deal flow with reduced sourcing friction and strong data transparency.</p>
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
                &ldquo;A data-driven access layer to short-term private credit — not a fund, not a balance sheet.&rdquo;
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
