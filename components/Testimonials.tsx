"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useTranslation } from "@/hooks/useTranslation";

type Language = "en" | "fr" | "es" | "de";

type Localized = Record<Language, string>;

interface Testimonial {
  name: string;
  city: string;
  role: Localized;
  text: Localized;
  kind: "carrier" | "client"; // to allow filtering by audience
}

const carrier1: Testimonial = {
  name: "VISEOL LOGISTICA S.L.",
  city: "Barcelona",
  kind: "carrier",
  role: {
    en: "Road Carrier",
    fr: "Transporteur routier",
    de: "Straßentransportunternehmen",
    es: "Transportista por carretera",
  },
  text: {
    en: `Submitting invoices is quick and easy thanks to Fincargo’s automated process. We now get paid in less than 24 hours, without having to chase payments or deal with delays, which gives us the liquidity we need to keep operating with peace of mind.`,
    fr: `Déposer nos factures est devenu simple et rapide grâce au process automatisé de Fincargo. Nous sommes maintenant payés en moins de 24h, sans avoir à relancer ou subir de retards, ce qui nous donne la trésorerie nécessaire pour travailler sereinement.`,
    de: `Das Einreichen von Rechnungen ist dank des automatisierten Prozesses von Fincargo schnell und einfach. Wir werden jetzt in weniger als 24 Stunden bezahlt, ohne Zahlungen hinterherlaufen zu müssen oder mit Verzögerungen konfrontiert zu werden. Das verschafft uns die nötige Liquidität, um unseren Betrieb sorgenfrei aufrechtzuerhalten.`,
    es: `Presentar facturas es rápido y sencillo gracias al proceso automatizado de Fincargo. Ahora cobramos en menos de 24 horas, sin tener que perseguir los pagos ni lidiar con retrasos, lo que nos da la liquidez necesaria para operar con tranquilidad.`,
  },
};

const client1: Testimonial = {
  name: "OT Logistica",
  city: "Barcelona",
  kind: "client",
  role: {
    en: "Warehousing & Distribution (Freight Forwarder)",
    fr: "Entreposage & Distribution (Commissionnaire de transport)",
    de: "Lagerhaltung & Distribution (Spediteur)",
    es: "Almacenaje y distribución (Transitario)",
  },
  text: {
    en: `Fincargo has streamlined our subcontractor invoice inflow and offered us early payment options that helps balancing the extended payment terms of our shippers, especially in spot or project logistics. This flexibility strengthens our cash flow and enhances our ability to commit to reliable subcontractor capacity.`,
    fr: `Fincargo a fluidifié l'arrivée des factures de nos sous-traitants et nous a proposé des options de paiement anticipé, ce qui nous permet d'équilibrer les délais de paiement prolongés de nos clients expéditeurs, notamment sur la logistique spot ou projet. Cette flexibilité renforce notre trésorerie et notre capacité à garantir la disponibilité de sous-traitants fiables.`,
    de: `Fincargo hat den Eingang unserer Subunternehmerrechnungen optimiert und uns Frühzahlungsoptionen angeboten, was hilft, die verlängerten Zahlungsziele unserer Auftraggeber auszugleichen – insbesondere im Spot- oder Projektgeschäft. Diese Flexibilität stärkt unseren Cashflow und unsere Fähigkeit, zuverlässige Subunternehmerkapazitäten zu sichern.`,
    es: `Fincargo ha agilizado la gestión de facturas de nuestros subcontratistas y nos ha ofrecido opciones de pago anticipado, lo que nos ayuda a equilibrar los plazos de pago extendidos de nuestros clientes cargadores, especialmente en logística spot o de proyectos. Esta flexibilidad fortalece nuestro flujo de caja y nuestra capacidad de garantizar capacidad de subcontratistas fiable.`,
  },
};

// Added third testimonial (fictional example) — can be replaced later
const carrier2: Testimonial = {
  name: "Alpine Transports SA",
  city: "Geneva",
  kind: "carrier",
  role: {
    en: "Cross-border Road Carrier",
    fr: "Transporteur routier transfrontalier",
    de: "Grenzüberschreitender Straßentransporteur",
    es: "Transportista por carretera transfronterizo",
  },
  text: {
    en: `With E‑CMR and automated checks, PODs sync directly to our invoices. Disputes dropped, payouts sped up, and our team reclaimed hours every week.`,
    fr: `Avec l’E‑CMR et les contrôles automatisés, les preuves de livraison se synchronisent directement avec nos factures. Moins de litiges, paiements accélérés et plusieurs heures gagnées chaque semaine.`,
    de: `Mit E‑CMR und automatischen Prüfungen werden PODs direkt mit unseren Rechnungen synchronisiert. Weniger Streitfälle, schnellere Auszahlungen und jede Woche gewonnene Stunden.`,
    es: `Con E‑CMR y controles automáticos, los POD se sincronizan directamente con nuestras facturas. Menos disputas, pagos más rápidos y horas recuperadas cada semana.`,
  },
};

const titles: Record<
  Language,
  { all: string; carriers: string; clients: string }
> = {
  en: {
    all: "What our customers say",
    carriers: "What our carriers say",
    clients: "What our clients say",
  },
  fr: {
    all: "Ce que disent nos clients",
    carriers: "Ce que disent nos transporteurs",
    clients: "Ce que disent nos clients",
  },
  de: {
    all: "Das sagen unsere Kunden",
    carriers: "Das sagen unsere Transportunternehmen",
    clients: "Das sagen unsere Kunden",
  },
  es: {
    all: "Lo que dicen nuestros clientes",
    carriers: "Lo que dicen nuestros transportistas",
    clients: "Lo que dicen nuestros clientes",
  },
};

interface SectionTestimonialsProps {
  variant?: "all" | "carriers" | "clients";
  contactHref?: string; // optional CTA under grid
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function useLang(): Language {
  const { language } = useTranslation();
  const lang2 = (language || "en").slice(0, 2) as Language;
  return (["en", "fr", "es", "de"].includes(lang2) ? lang2 : "en") as Language;
}

export default function SectionTestimonials({
  variant = "all",
  contactHref = "/contact-sales",
}: SectionTestimonialsProps) {
  const lang = useLang();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const data = useMemo(() => {
    const all = [carrier1, client1, carrier2];
    if (variant === "carriers") return all.filter((t) => t.kind === "carrier");
    if (variant === "clients") return all.filter((t) => t.kind === "client");
    return all;
  }, [variant]);

  const heading = titles[lang][variant];

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-white via-gray-100 to-gray-200"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-4xl md:text-5xl uppercase font-extrabold text-center text-darkBlue tracking-tight">
            {heading}
          </h2>
        </div>

        {/* Grid + mobile slider */}
        <div
          className={`mt-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((t, idx) => (
              <article
                key={t.name + idx}
                className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col items-stretch group transition hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600/15 to-cyan-500/15 ring-1 ring-slate-200 flex items-center justify-center text-slate-700 font-bold">
                    {getInitials(t.name)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {t.city} — {t.role[lang]}
                    </div>
                  </div>
                  <FormatQuoteIcon
                    fontSize="small"
                    className="text-darkBlue/70"
                  />
                </div>

                <p className="mt-5 text-slate-800 leading-relaxed italic">
                  “{t.text[lang]}”
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* CTA under grid */}
        {contactHref && (
          <div
            className={`mt-12 flex justify-center transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <a
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-semibold hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60"
            >
              Book a live demo
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

// Convenience wrappers if you want separate sections by audience
export function TestimonialsCarriers() {
  return <SectionTestimonials variant="carriers" />;
}
export function TestimonialsClients() {
  return <SectionTestimonials variant="clients" />;
}
