"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

/* -------------------- Inline Icons (no deps) -------------------- */
function IconShield(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4Z" />
      <path d="M9.5 12.5l2 2 3.5-3.5" />
    </svg>
  );
}
function IconLayers(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m12 2 9 5-9 5L3 7l9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}
function IconGlobe(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M2 12h20M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}
function IconLightning(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}
function IconBook(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4v15.5A2.5 2.5 0 0 1 6.5 22H20V6a2 2 0 0 0-2-2H6" />
    </svg>
  );
}
function IconNetwork(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="19" cy="12" r="2.5" />
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="12" cy="19" r="2.5" />
      <path d="M7 12h10M12 7v10" />
    </svg>
  );
}
function IconSignature(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 21s3-6 7-6 3 5 7 5 4-3 4-3" />
      <path d="M3 17c2-3 4-5 7-5 3 0 4 2 6 2 2 0 5-2 5-2" />
    </svg>
  );
}
function IconApi(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 7h4v10H4zM10 7h4v10h-4zM16 7h4v10h-4z" />
    </svg>
  );
}
function IconTranslate(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 5h16M9 5c0 7-5 9-5 14" />
      <path d="M12 12h7m-3-3 3 3-3 3" />
    </svg>
  );
}
function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* -------------------- Component -------------------- */
export default function SectionInvoicing() {
  const { t, tl } = useTranslation();

  // Visibility animations
  const [v1, setV1] = useState(false);
  const [v2, setV2] = useState(false);
  const [v3, setV3] = useState(false);
  const [v4, setV4] = useState(false);
  const r1 = useRef<HTMLElement | null>(null);
  const r2 = useRef<HTMLElement | null>(null);
  const r3 = useRef<HTMLElement | null>(null);
  const r4 = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mk = (setter: (b: boolean) => void, el: HTMLElement | null) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && setter(true)),
        { threshold: 0.15 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    };
    const a = mk(setV1, r1.current);
    const b = mk(setV2, r2.current);
    const c = mk(setV3, r3.current);
    const d = mk(setV4, r4.current);
    return () => {
      a && a();
      b && b();
      c && c();
      d && d();
    };
  }, []);

  // i18n helpers (respecte la typo "invocing")
  const tf = (k: string, fb = "") => (t(k) === k ? fb : t(k));
  const ta = (k: string, fb: string[] = []) => {
    const arr = tl(k);
    return Array.isArray(arr) && arr.length ? arr : fb;
  };

  /* -------------------- Section 1 -------------------- */
  const s1Title = tf(
    "invocing.section1.title",
    "Next-Generation Digital Invoicing"
  );
  const s1Desc = tf(
    "invocing.section1.description",
    "Fully automated, compliant, and ready for the European digital transformation"
  );
  const s1Cards = [
    {
      icon: <IconShield className="h-6 w-6" />,
      title: tf("invocing.section1.point1.title", "ViDA Compliant"),
      content: tf(
        "invocing.section1.point1.content",
        "100% compliant with EU's ViDA (VAT in the Digital Age) regulation"
      ),
      badge: "2028-ready",
    },
    {
      icon: <IconLayers className="h-6 w-6" />,
      title: tf("invocing.section1.point2.title", "Structured Data"),
      content: tf(
        "invocing.section1.point2.content",
        "Machine-readable invoices with standardized formats and data fields"
      ),
      badge: "EN 16931",
    },
    {
      icon: <IconGlobe className="h-6 w-6" />,
      title: tf("invocing.section1.point3.title", "Cross-Border Ready"),
      content: tf(
        "invocing.section1.point3.content",
        "Seamless processing across all EU member states and jurisdictions"
      ),
      badge: "EU-wide",
    },
    {
      icon: <IconLightning className="h-6 w-6" />,
      title: tf("invocing.section1.point4.title", "Instant Processing"),
      content: tf(
        "invocing.section1.point4.content",
        "Automated invoice generation and delivery with real-time status tracking"
      ),
      badge: "Real-time",
    },
  ];

  /* -------------------- Section 2 -------------------- */
  const s2Title = tf("invocing.section2.title", "ViDA Regulation Compliance");
  const s2Desc = tf(
    "invocing.section2.description",
    "Stay ahead of the European Union's digital invoicing requirements"
  );
  const vidaTitle = tf("invocing.section2.vida.title", "What is ViDA?");
  const vidaDesc = tf(
    "invocing.section2.vida.description",
    "ViDA (VAT in the Digital Age) is the EU initiative to modernize VAT reporting. From 2028, structured e-invoicing will be required for cross-border B2B."
  );
  const vidaList = ta("invocing.section2.vida.list", [
    "Mandatory for cross-border B2B transactions from 2028",
    "Structured data format requirements (EN 16931)",
    "Real-time VAT reporting and compliance",
    "Enhanced fraud prevention and tax collection",
  ]);
  const benefitTitle = tf("invocing.section2.benefit.title", "Key Benefits");
  const benefitList = ta("invocing.section2.benefit.list", [
    "Reduced compliance costs",
    "Faster payment processing",
    "Automatic VAT validation",
    "Simplified audit trails",
    "Enhanced data security",
    "Future-proof operations",
  ]);

  /* -------------------- Section 3 -------------------- */
  const s3Title = tf(
    "invocing.section3.title",
    "Benefits for Transport Industry"
  );
  const s3CarriersTitle = tf(
    "invocing.section3.carriers.title",
    "For Carriers"
  );
  const s3CarriersList = ta("invocing.section3.carriers.list", [
    "Automated invoice generation from transport data",
    "Faster payment cycles with instant delivery",
    "Reduced errors and manual processing",
    "Automatic VAT compliance across EU borders",
  ]);
  const s3FwdTitle = tf(
    "invocing.section3.forwarders.title",
    "For Forwarders & Shippers"
  );
  const s3FwdList = ta("invocing.section3.forwarders.list", [
    "Streamlined accounts payable processes",
    "Enhanced audit trails and compliance reporting",
    "Automatic invoice validation and matching",
    "Real-time visibility into invoice status",
  ]);

  /* -------------------- Section 4 -------------------- */
  const s4Title = tf("invocing.section4.title", "Technical Capabilities");
  const s4Items = [
    {
      icon: <IconBook className="h-6 w-6" />,
      title: tf("invocing.section4.technical1.title", "EN 16931 Standard"),
      content: tf(
        "invocing.section4.technical1.content",
        "European standard for electronic invoice core elements"
      ),
    },
    {
      icon: <IconLayers className="h-6 w-6" />,
      title: tf("invocing.section4.technical2.title", "UBL 2.1 Format"),
      content: tf(
        "invocing.section4.technical2.content",
        "Universal Business Language for structured data exchange"
      ),
    },
    {
      icon: <IconNetwork className="h-6 w-6" />,
      title: tf("invocing.section4.technical3.title", "PEPPOL Network"),
      content: tf(
        "invocing.section4.technical3.content",
        "Pan-European public procurement online connectivity"
      ),
    },
    {
      icon: <IconSignature className="h-6 w-6" />,
      title: tf("invocing.section4.technical4.title", "Digital Signatures"),
      content: tf(
        "invocing.section4.technical4.content",
        "Advanced electronic signatures for legal validity"
      ),
    },
    {
      icon: <IconApi className="h-6 w-6" />,
      title: tf("invocing.section4.technical5.title", "API Integration"),
      content: tf(
        "invocing.section4.technical5.content",
        "Seamless connection with existing ERP and TMS systems"
      ),
    },
    {
      icon: <IconTranslate className="h-6 w-6" />,
      title: tf("invocing.section4.technical6.title", "Multi-language"),
      content: tf(
        "invocing.section4.technical6.content",
        "Support for all EU languages and regional requirements"
      ),
    },
  ];

  return (
    <>
      {/* ---------------- Section 1 (DARK): Product Value ---------------- */}
      <section
        id="invoicing"
        ref={r1}
        className="relative bg-gradient-to-b from-darkBlue to-black py-24 md:py-32 text-white overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              INVOICING
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {s1Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/80">{s1Desc}</p>
          </div>

          <div
            className={`mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
              v1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {s1Cards.map((c, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-white/[0.05] px-6 py-7 md:px-7 md:py-8 border border-white/10 ring-1 ring-white/10 shadow-2xl transition-all hover:bg-white/[0.07] hover:border-white/20"
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                <div
                  className="pointer-events-none absolute -inset-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 blur-2xl" />
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    {c.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                          {c.title}
                        </span>
                      </h3>
                      {/* <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold ring-1 ring-white/15">
                        {c.badge}
                      </span> */}
                    </div>
                    <p className="mt-2 text-sm text-white/80 leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Section 2 (WHITE): ViDA ---------------- */}
      <section ref={r2} className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
              ViDA
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {s2Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-slate-700">{s2Desc}</p>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 transition-all duration-700 ${
              v2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* What is ViDA? */}
            <article className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-slate-900">{vidaTitle}</h3>
              <p className="mt-2 text-slate-700">{vidaDesc}</p>
              <ul className="mt-4 space-y-2">
                {vidaList.map((li, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-slate-700"
                  >
                    <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-slate-50 ring-1 ring-slate-200 p-1">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm md:text-base">{li}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Key Benefits */}
            <article className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-slate-900">
                {benefitTitle}
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefitList.map((li, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200"
                  >
                    <span className="inline-flex items-center justify-center rounded-md bg-white ring-1 ring-slate-200 p-1">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm md:text-base text-slate-800">
                      {li}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ---------------- Section 3 (DARK): Benefits by audience ---------------- */}
      <section
        ref={r3}
        className="relative bg-gradient-to-b from-darkBlue to-black py-20 md:py-28 text-white overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              BENEFITS
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {s3Title}
            </h2>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 transition-all duration-700 ${
              v3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Carriers */}
            <div className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl">
              <h3 className="text-xl font-bold text-white">
                {s3CarriersTitle}
              </h3>
              <ul className="mt-4 space-y-2">
                {s3CarriersList.map((li, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-white/90"
                  >
                    <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15 p-1">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm md:text-base">{li}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Forwarders & Shippers */}
            <div className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl">
              <h3 className="text-xl font-bold text-white">{s3FwdTitle}</h3>
              <ul className="mt-4 space-y-2">
                {s3FwdList.map((li, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-white/90"
                  >
                    <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15 p-1">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm md:text-base">{li}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Section 4 (WHITE): Technical capabilities ---------------- */}
      <section ref={r4} className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
              CAPABILITIES
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {s4Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-slate-700">
              {/* Petite phrase d'ancrage UX */}
              Standards, interopérabilité et conformité intégrés par défaut.
            </p>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${
              v4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {s4Items.map((it, i) => (
              <article
                key={i}
                className="relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition"
                style={{ transitionDelay: `${120 + (i % 6) * 60}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                    {it.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {it.title}
                    </h3>
                    <p className="mt-2 text-slate-700">{it.content}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
