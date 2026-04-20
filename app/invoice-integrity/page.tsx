import Header from "@/components/Header/Main";
import Footer from "@/components/Footer";

export const metadata = { title: "Invoice Integrity & Automation — Economic Truth | Fincargo" };

const points = [
  "Execution data converted into clean receivables and verified payables",
  "Only services actually delivered and agreed are billed and paid",
  "Duplicate and anomaly detection before money leaves the door",
  "Buyer-aware validation with explainable checks",
  "Audit-ready evidence bound to every invoice line",
];

export default function InvoiceIntegrityPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-darkBlue to-black text-white py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/20">
              Economic Truth
            </span>
            <h1 className="mt-5 text-5xl md:text-7xl font-extrabold tracking-tight uppercase leading-tight">
              Invoice Integrity & Automation
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              Execution data is converted into clean receivables and verified payables. Economic truth ensures that only services actually delivered, under agreed conditions, are billed and paid.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
              How it works
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Every invoice is matched against its underlying execution record. Amounts, conditions, and delivery proofs are validated automatically before the invoice is sent or paid — eliminating disputes and reducing rejection rates.
            </p>
            <ul className="mt-8 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900">Business impact</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Fewer invoice rejections, faster collection, and higher first-pass acceptance. By ensuring economic truth at the invoice level, Fincargo reduces back-and-forth between buyers and sellers and accelerates the path to payment and financing.
              </p>
            </div>

            <div className="mt-10">
              <a
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-full bg-darkBlue px-6 py-3 text-white font-semibold shadow hover:bg-lightBlue transition"
              >
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
