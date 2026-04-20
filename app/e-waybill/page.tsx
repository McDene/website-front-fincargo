import Header from "@/components/Header/Main";
import Footer from "@/components/Footer";

export const metadata = { title: "E-Waybill — Execution Truth | Fincargo" };

const points = [
  "Transport execution captured digitally at source",
  "Secure and auditable record of what actually happened",
  "Replaces paper documents with trusted, non-repudiable evidence",
  "eFTI compliant and cross-border ready",
  "Feeds clean execution data into Invoice Integrity & e-Invoicing",
];

export default function EWaybillPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-darkBlue to-black text-white py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/20">
              Execution Truth
            </span>
            <h1 className="mt-5 text-5xl md:text-7xl font-extrabold tracking-tight uppercase leading-tight">
              E-Waybill
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              Transport execution is captured digitally at source, creating a secure and auditable record of what actually happened. Execution truth replaces paper documents with trusted, non-repudiable evidence.
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
              Every transport event — pickup, delivery, signature — is captured as a structured digital record at the point of execution. This data becomes the foundation for invoice generation, compliance, and financing.
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
                By digitising execution at source, Fincargo eliminates the manual document chase that delays invoicing and financing. Every downstream step — invoice validation, e-invoicing, and liquidity access — is accelerated because the underlying data is already trusted and structured.
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
