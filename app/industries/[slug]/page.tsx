import Header from "@/components/Header/Main";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

const industries: Record<string, Industry> = {
  "transport-logistics": {
    title: "Transport & Logistics",
    tagline: "Digitising execution. Securing revenue. Accelerating cash flow.",
    intro: "Transport and logistics sit at the core of fragmented, multi-party supply chains where execution evidence, invoice accuracy, and payment predictability are critical.",
    solutions: [
      "e-Waybill to digitise transport execution and replace paper-based consignment notes",
      "Invoice Integrity & Automation to validate billed services against executed events",
      "e-Invoicing for compliant, structured billing",
      "Supply Chain Finance to accelerate payments based on verified execution",
      "Analytics to monitor performance, exceptions, and risk patterns",
      "Integration with TMS, ERP, and financial systems",
    ],
    impact: [
      "Reduced disputes, claims, and fraud exposure",
      "Faster billing and payment cycles",
      "Higher operational transparency across carriers, forwarders, and shippers",
    ],
  },
  "government": {
    title: "Government & Public Authorities",
    tagline: "Enabling policy decisions and compliant digital transformation.",
    intro: "Public authorities play a key role in the transition toward paperless transport and electronic invoicing. We support governments and public bodies across the full lifecycle — from strategic assessment to operational deployment.",
    solutions: [
      "e-Waybill & e-Invoicing model assessment aligned with regulatory frameworks (eFTI, national mandates)",
      "Feasibility studies and diagnostic analytics to assess readiness, gaps, and impact",
      "Decision support and roadmap definition for policy and implementation planning",
      "Technology consulting and deployment planning",
      "Analytics for adoption monitoring, compliance oversight, and impact measurement",
      "Integration with existing public and private systems",
    ],
    impact: [
      "Informed policy decisions backed by data",
      "Reduced regulatory friction for market participants",
      "Scalable, future-proof digital infrastructure for transport and invoicing",
    ],
  },
  "wholesale-distribution": {
    title: "Wholesale & Distribution",
    tagline: "Controlling complexity across high-volume trade flows.",
    intro: "Wholesale and distribution environments are characterised by high transaction volumes, tight margins, and complex partner networks. Data consistency and automation are essential to maintain control and profitability.",
    solutions: [
      "Invoice Integrity & Automation to validate invoices against delivery and execution data",
      "e-Invoicing for compliant, high-volume billing",
      "Analytics to monitor discrepancies, performance, and payment behaviour",
      "Integration across ERP, warehouse, transport, and finance systems",
      "Supply Chain Finance to improve liquidity without increasing balance-sheet pressure",
    ],
    impact: [
      "Reduced invoice disputes and reconciliation effort",
      "Improved cash-flow predictability",
      "Better visibility across suppliers, distributors, and customers",
    ],
  },
  "manufacturing": {
    title: "Manufacturing",
    tagline: "Linking execution, compliance, and financial performance.",
    intro: "Manufacturers operate complex, multi-tier supply chains where execution accuracy, traceability, and financial alignment are critical.",
    solutions: [
      "e-Waybill to capture and structure transport execution data",
      "Invoice Integrity & Automation to align logistics services with contractual terms",
      "e-Invoicing to ensure compliance across jurisdictions",
      "Analytics to analyse performance, delays, and risk exposure",
      "Integration with ERP, MES, logistics, and finance platforms",
      "Supply Chain Finance to support suppliers while preserving working capital",
    ],
    impact: [
      "Stronger control over inbound and outbound logistics",
      "Fewer discrepancies between operations and finance",
      "More resilient and predictable supply chain performance",
    ],
  },
  "consumer-goods": {
    title: "Consumer Goods",
    tagline: "Speed, scale, and accuracy across fast-moving supply chains.",
    intro: "Consumer goods supply chains demand speed, scalability, and precision. Small inefficiencies quickly translate into margin erosion at scale.",
    solutions: [
      "e-Waybill to digitise execution at scale",
      "Invoice Integrity & Automation to handle high invoice volumes reliably",
      "e-Invoicing for structured, compliant billing",
      "Analytics to identify exceptions, trends, and operational bottlenecks",
      "Integration across retail, logistics, and finance systems",
      "Supply Chain Finance to support supplier liquidity",
    ],
    impact: [
      "Faster execution-to-cash cycles",
      "Reduced operational noise and exception handling",
      "Improved scalability without proportional cost increases",
    ],
  },
  "healthcare": {
    title: "Healthcare",
    tagline: "Precision, traceability, and compliance where it matters most.",
    intro: "Healthcare supply chains require high levels of accuracy, traceability, and regulatory compliance, while operating under cost and reliability constraints.",
    solutions: [
      "e-Waybill to ensure traceable, auditable transport execution",
      "Invoice Integrity & Automation to validate services and deliveries",
      "e-Invoicing aligned with public and private healthcare requirements",
      "Analytics to monitor performance, anomalies, and compliance indicators",
      "Integration with healthcare, logistics, and financial systems",
      "Supply Chain Finance to support suppliers without disrupting procurement rules",
    ],
    impact: [
      "Enhanced traceability and audit readiness",
      "Reduced disputes and administrative burden",
      "More reliable and transparent supply chain operations",
    ],
  },
};

interface Industry {
  title: string;
  tagline: string;
  intro: string;
  solutions: string[];
  impact: string[];
}

export async function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries[slug];
  if (!industry) return {};
  return { title: `${industry.title} | Fincargo` };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries[slug];
  if (!industry) notFound();

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-darkBlue to-black text-white py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/20">
              Industries
            </span>
            <h1 className="mt-5 text-5xl md:text-6xl font-extrabold tracking-tight uppercase leading-tight">
              {industry.title}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-lightBlue font-medium italic">
              {industry.tagline}
            </p>
            <p className="mt-4 text-lg text-white/70 max-w-2xl leading-relaxed">
              {industry.intro}
            </p>
            <div className="mt-8">
              <a
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-blue-950 font-semibold shadow hover:bg-slate-100 transition"
              >
                Get started
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* How we support */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              How we support the industry
            </h2>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {industry.solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 hover:border-indigo-200 hover:bg-indigo-50/50 transition">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700 text-base leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Business impact */}
        <section className="py-16 md:py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight uppercase">Business impact</h2>
            <ul className="mt-8 space-y-4">
              {industry.impact.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/80 text-lg leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing line */}
        <section className="py-14 bg-white text-center">
          <div className="mx-auto max-w-2xl px-4">
            <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-400 to-blue-500" />
            <p className="text-slate-600 text-lg leading-relaxed italic font-medium">
              Across industries, our platform delivers a single, coherent operating model that connects execution, compliance, intelligence, and finance — enabling organisations to digitise with confidence, control risk, and scale sustainably.
            </p>
            <div className="mt-6">
              <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-darkBlue px-8 py-3 text-white font-semibold shadow hover:bg-lightBlue transition">
                Talk to us
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
