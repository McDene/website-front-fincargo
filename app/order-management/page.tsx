import Header from "@/components/Header/Main";
import Footer from "@/components/Footer";

export const metadata = { title: "Order Management | Fincargo" };

const lifecycle = [
  {
    title: "Order Creation",
    desc: "Create transport orders manually or ingest them automatically from ERP, TMS, or EDI feeds. Structured data from the start ensures downstream accuracy.",
  },
  {
    title: "Carrier Assignment",
    desc: "Assign orders to carriers based on capacity, rate agreements, and performance history. Support for spot and contract allocation.",
  },
  {
    title: "Execution Tracking",
    desc: "Track pickup, transit, and delivery milestones in real-time. Capture proof of delivery, exceptions, and timestamp evidence automatically.",
  },
  {
    title: "Real-Time Status Updates",
    desc: "Automated status updates pushed to all stakeholders. No manual follow-ups needed — every party sees the same live data.",
  },
  {
    title: "Performance KPIs",
    desc: "Monitor on-time delivery rates, lead times, exception frequency, and carrier scorecards across your entire order portfolio.",
  },
  {
    title: "Smart Alerts & Exceptions",
    desc: "Proactive notifications for delays, route deviations, missing documents, and SLA breaches. Escalation workflows built in.",
  },
];

const visibility = [
  {
    title: "Live Shipment Tracking",
    desc: "GPS and telematics integration for real-time position tracking. ETA predictions powered by historical data and traffic intelligence.",
  },
  {
    title: "Document Flow Management",
    desc: "Attach, validate, and track all order-related documents — CMR, POD, customs declarations, and packing lists — in a single digital thread.",
  },
  {
    title: "Stakeholder Portal",
    desc: "Dedicated views for shippers, carriers, and consignees. Each party sees only what is relevant, with role-based access controls.",
  },
  {
    title: "Regulatory Compliance",
    desc: "Automatic compliance checks for cabotage rules, driver hours, vehicle certifications, and cross-border transport regulations.",
  },
];

const automation = [
  {
    title: "Workflow Automation",
    desc: "Rule-based triggers for invoice generation, payment release, and dispute escalation. Configure once, run automatically.",
  },
  {
    title: "ERP & TMS Connectors",
    desc: "Pre-built integrations with SAP, Oracle, Transporeon, and major TMS platforms. Bi-directional sync keeps systems aligned.",
  },
  {
    title: "Auto-Reconciliation",
    desc: "Three-way matching between orders, execution evidence, and invoices. Discrepancies flagged automatically before payment.",
  },
  {
    title: "Predictive Insights",
    desc: "AI-driven forecasting for order volumes, carrier capacity needs, and cash flow impact. Plan ahead with data, not guesswork.",
  },
];

function WorkflowDiagram() {
  const steps = [
    {
      label: "Order\nCreation", color: "#6366f1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      ),
    },
    {
      label: "Carrier\nAssignment", color: "#3b82f6",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
          <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
    {
      label: "Execution\nTracking", color: "#0ea5e9",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
    },
    {
      label: "Proof of\nDelivery", color: "#10b981",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      ),
    },
    {
      label: "Invoice\nGeneration", color: "#f59e0b",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M9 13h6M9 17h4" />
        </svg>
      ),
    },
    {
      label: "Payment &\nFinancing", color: "#8b5cf6",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
          <path d="M6 15h4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-lg p-8 md:p-12">
      <p className="text-center text-xs font-semibold tracking-widest text-slate-400 uppercase mb-10">
        Order-to-Cash Workflow
      </p>

      {/* Steps row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col md:flex-row items-center gap-2 md:gap-0 flex-1">
            {/* Step node */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-md"
                style={{ background: `${step.color}18`, border: `2px solid ${step.color}40`, color: step.color }}
              >
                {step.icon}
              </div>
              <p
                className="text-center text-xs font-semibold leading-tight whitespace-pre-line"
                style={{ color: step.color }}
              >
                {step.label}
              </p>
            </div>
            {/* Arrow */}
            {i < steps.length - 1 && (
              <div className="hidden md:flex items-center px-1">
                <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Connecting bar */}
      <div className="hidden md:block mt-6 relative h-1.5 rounded-full overflow-hidden bg-slate-100">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: "100%",
            background: "linear-gradient(to right, #6366f1, #3b82f6, #0ea5e9, #10b981, #f59e0b, #8b5cf6)",
          }}
        />
      </div>

      {/* Bottom labels */}
      <div className="mt-8 grid grid-cols-3 gap-4 md:grid-cols-3">
        {[
          { label: "Operations", desc: "Orders, carriers, tracking & delivery", color: "#6366f1" },
          { label: "Compliance", desc: "Validated, structured, audit-ready data", color: "#10b981" },
          { label: "Finance", desc: "Instant invoicing, reconciliation & liquidity", color: "#8b5cf6" },
        ].map((tag) => (
          <div
            key={tag.label}
            className="rounded-xl p-4 text-center"
            style={{ background: `${tag.color}0d`, border: `1px solid ${tag.color}25` }}
          >
            <p className="text-sm font-bold" style={{ color: tag.color }}>{tag.label}</p>
            <p className="mt-1 text-xs text-slate-500 leading-snug">{tag.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:ring-1 hover:ring-indigo-200 transition-all duration-200">
      <h4 className="font-bold text-slate-900">{title}</h4>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function OrderManagementPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-darkBlue to-black text-white py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/20">
              Solutions
            </span>
            <h1 className="mt-5 text-5xl md:text-7xl font-extrabold tracking-tight uppercase leading-tight">
              Order Management
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              End-to-end transport order lifecycle management — from creation to delivery confirmation, with full visibility and automated workflows.
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

        {/* Workflow Illustration */}
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <WorkflowDiagram />
          </div>
        </section>

        {/* Order Lifecycle */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                ORDER LIFECYCLE
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
                Complete order lifecycle from creation to delivery
              </h2>
              <p className="mt-3 text-lg text-slate-600 leading-relaxed">
                Manage the full transport order lifecycle in one place. From order creation and carrier assignment to execution tracking and proof of delivery, every step is captured, validated, and connected to your invoicing and finance workflows.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lifecycle.map((f) => <FeatureCard key={f.title} {...f} />)}
            </div>
          </div>
        </section>

        {/* Visibility & Control */}
        <section className="py-20 md:py-28 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                VISIBILITY & CONTROL
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
                Full visibility across your supply chain
              </h2>
              <p className="mt-3 text-lg text-slate-600 leading-relaxed">
                Gain a single source of truth for every order. Track documents, monitor compliance, and give every stakeholder — shippers, carriers, and finance teams — the visibility they need without the back-and-forth.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {visibility.map((f) => <FeatureCard key={f.title} {...f} />)}
            </div>
          </div>
        </section>

        {/* Automation */}
        <section className="py-20 md:py-28 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70 ring-1 ring-white/20">
                AUTOMATION
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight uppercase">
                Automate the order-to-invoice bridge
              </h2>
              <p className="mt-3 text-lg text-white/70 leading-relaxed">
                Eliminate manual handoffs between operations and finance. Orders flow seamlessly into invoicing, reconciliation, and payment — reducing errors, accelerating cash flow, and cutting administrative overhead.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {automation.map((f) => (
                <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
                  <h4 className="font-bold text-white">{f.title}</h4>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white text-center">
          <div className="mx-auto max-w-xl px-4">
            <h2 className="text-2xl font-extrabold text-slate-900 uppercase">Ready to streamline your operations?</h2>
            <p className="mt-3 text-slate-600">Connect your order management to invoicing, compliance, and financing in one platform.</p>
            <div className="mt-6">
              <a href="/get-started" className="inline-flex items-center gap-2 rounded-full bg-darkBlue px-8 py-3 text-white font-semibold shadow hover:bg-lightBlue transition">
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
