"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { detectClientRegion } from "@/lib/i18n";

/* -------------------- Inline Icons (no deps) -------------------- */
function IconBolt(props: React.SVGProps<SVGSVGElement>) {
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
function IconPercent(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 5L5 19" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  );
}
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
function IconDoc(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6M9 9h3" />
    </svg>
  );
}
// function IconClock(props: React.SVGProps<SVGSVGElement>) {
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
//       <path d="M12 7v6l4 2" />
//     </svg>
//   );
// }
function IconBank(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 10h18M5 10v8M10 10v8M14 10v8M19 10v8M2 22h20M12 2 2 7h20L12 2Z" />
    </svg>
  );
}
function IconSearch(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-3.5-3.5" />
    </svg>
  );
}
function IconLock(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function IconAlert(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
function IconScale(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 3v18M3 7h18" />
      <path d="M7 7l-4 7h8l-4-7Z" />
      <path d="M21 7l-4 7h8l-4-7Z" />
    </svg>
  );
}
function IconPhone(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.31 1.71.57 2.52a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.56-1.15a2 2 0 0 1 2.11-.45c.81.26 1.66.45 2.52.57A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={props.className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* -------------------- Component -------------------- */
export default function SectionFactoring() {
  const { t, tl, language } = useTranslation();
  const region = detectClientRegion();

  const tf = (k: string, fb = "") => (t(k) === k ? fb : t(k));
  const ta = (k: string, fb: string[] = []) => {
    const arr = tl(k);
    return Array.isArray(arr) && arr.length ? arr : fb;
  };

  // Visibility per section (supporte jusqu'à 6 sections)
  const [v, setV] = useState([false, false, false, false, false, false]);
  // refs stables
  const r0 = useRef<HTMLElement | null>(null); // Section 1 (intro/why)
  const r0b = useRef<HTMLElement | null>(null); // Section 2 (BE only, key benefits)
  const r1 = useRef<HTMLElement | null>(null); // Process
  const r2 = useRef<HTMLElement | null>(null); // Pricing
  const r3 = useRef<HTMLElement | null>(null); // Benefits by audience
  const r4 = useRef<HTMLElement | null>(null); // Risk management

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const list =
      region === "be" ? [r0, r0b, r1, r2, r3, r4] : [r0, r1, r2, r3, r4];
    const observers: IntersectionObserver[] = [];

    list.forEach((r, idx) => {
      const el = r.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) =>
          entries.forEach(
            (e) =>
              e.isIntersecting &&
              setV((old) => old.map((b, i) => (i === idx ? true : b)))
          ),
        { threshold: 0.12, rootMargin: "0px 0px 160px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [r0, r0b, r1, r2, r3, r4, region]); // ✅ deps stables, plus de warning

  /* -------------------- Section 1 (WHITE): Value -------------------- */
  let s1Title = tf("factoring.section1.title", "Accelerate Your Cash Flow");
  let s1Desc = tf(
    "factoring.section1.description",
    "Stop waiting for payments and focus on growing your transport business"
  );
  let s1Cards = [
    {
      icon: <IconBolt className="h-6 w-6" />,
      title: tf("factoring.section1.point1.title", "24-Hour Payment"),
      content: tf(
        "factoring.section1.point1.content",
        "Receive funds within 24 hours of invoice submission and approval"
      ),
      badge: "24h",
    },
    {
      icon: <IconPercent className="h-6 w-6" />,
      title: tf("factoring.section1.point2.title", "Competitive Rates"),
      content: tf(
        "factoring.section1.point2.content",
        "Low factoring rates from 0.10-0.15% per day plus minimal service fees"
      ),
      badge: "0.10–0.15%",
    },
    {
      icon: <IconShield className="h-6 w-6" />,
      title: tf("factoring.section1.point3.title", "Credit Protection"),
      content: tf(
        "factoring.section1.point3.content",
        "Built-in credit protection and risk assessment for your invoices"
      ),
      badge: "Protected",
    },
    {
      icon: <IconLayers className="h-6 w-6" />,
      title: tf("factoring.section1.point4.title", "Scalable Financing"),
      content: tf(
        "factoring.section1.point4.content",
        "Financing limits that grow with your business and transport volumes"
      ),
      badge: "Scalable",
    },
  ];
  let s1Bottom: string | undefined;
  let s1bTitle: string | undefined;
  let s1bDesc: string | undefined;
  let s1bCards: typeof s1Cards | undefined;

  /* -------------------- Section 2 (DARK): Process -------------------- */
  let s2Title = tf("factoring.section2.title", "Simple 3-Step Process");
  let s2Desc = tf(
    "factoring.section2.description",
    "From invoice to cash in your account within 24 hours"
  );
  let steps = [
    {
      n: 1,
      icon: <IconDoc className="h-5 w-5" />,
      title: tf("factoring.section2.step1.title", "Submit Invoice"),
      content: tf(
        "factoring.section2.step1.content",
        "Upload verified invoices via platform or API"
      ),
    },
    {
      n: 2,
      icon: <IconSearch className="h-5 w-5" />,
      title: tf("factoring.section2.step2.title", "Instant Approval"),
      content: tf(
        "factoring.section2.step2.content",
        "AI risk assessment and approval in minutes"
      ),
    },
    {
      n: 3,
      icon: <IconBank className="h-5 w-5" />,
      title: tf("factoring.section2.step3.title", "Get Paid"),
      content: tf(
        "factoring.section2.step3.content",
        "Funds wired to your bank within 24 hours"
      ),
    },
  ];

  /* -------------------- Section 3 (WHITE): Pricing -------------------- */
  let s3Title = tf("factoring.section3.title", "Transparent Pricing");
  let s3Desc = tf(
    "factoring.section3.description",
    "No hidden fees, no long-term contracts"
  );

  let rateTitle = tf("factoring.section3.factoring.title", "Factoring Rate");
  let rateData = tf("factoring.section3.factoring.data", "0.10% - 0.15%");
  let rateTime = tf("factoring.section3.factoring.time", "per day");
  let rateText = tf(
    "factoring.section3.factoring.content",
    "Competitive daily rates based on creditworthiness and invoice terms."
  );

  let feeTitle = tf("factoring.section3.service.title", "Service Fee");
  let feeData = tf("factoring.section3.service.data", "20 CHF");
  let feeTime = tf("factoring.section3.service.time", "per transaction");
  let feeText = tf(
    "factoring.section3.service.content",
    "One-time service fee per factored invoice."
  );

  let exTitle = tf("factoring.section3.exemple.title", "Example Calculation");
  let exD1 = tf("factoring.section3.exemple.data1", "10,000 CHF");
  let exC1 = tf("factoring.section3.exemple.content1", "Invoice Amount");
  let exD2 = tf("factoring.section3.exemple.data2", "35 CHF");
  let exC2 = tf(
    "factoring.section3.exemple.content2",
    "Total Cost (30 days @ 0.15%)"
  );
  let exD3 = tf("factoring.section3.exemple.data3", "9,945 CHF");
  let exC3 = tf("factoring.section3.exemple.content3", "You Receive");

  /* -------------------- Section 4 (DARK): Benefits by audience -------------------- */
  let s4Title = tf(
    "factoring.section4.title",
    "Benefits for Transport Companies"
  );
  let carriersTitle = tf("factoring.section4.carriers.title", "For Carriers");
  let carriersList = ta("factoring.section4.carriers.list", []);
  let fwdTitle = tf(
    "factoring.section4.forwarders.title",
    "For Forwarders & Shippers"
  );
  let fwdList = ta("factoring.section4.forwarders.list", []);

  /* -------------------- Section 5 (WHITE): Risk Management -------------------- */
  let s5Title = tf("factoring.section5.title", "Advanced Risk Management");
  let s5Desc = tf(
    "factoring.section5.description",
    "Comprehensive protection for both factoring clients and invoice payers"
  );
  let riskItems = [
    {
      icon: <IconScale className="h-6 w-6" />,
      title: tf("factoring.section5.item1.title", "Credit Assessment"),
      content: tf(
        "factoring.section5.item1.content",
        "Real-time creditworthiness evaluation of invoice payers"
      ),
    },
    {
      icon: <IconSearch className="h-6 w-6" />,
      title: tf("factoring.section5.item2.title", "Invoice Verification"),
      content: tf(
        "factoring.section5.item2.content",
        "AI-powered validation of invoice authenticity and accuracy"
      ),
    },
    {
      icon: <IconLock className="h-6 w-6" />,
      title: tf("factoring.section5.item3.title", "Payment Protection"),
      content: tf(
        "factoring.section5.item3.content",
        "Built-in protection against non-payment and defaults"
      ),
    },
    {
      icon: <IconAlert className="h-6 w-6" />,
      title: tf("factoring.section5.item4.title", "Fraud Detection"),
      content: tf(
        "factoring.section5.item4.content",
        "Advanced algorithms to detect and prevent fraudulent invoices"
      ),
    },
    {
      icon: <IconShield className="h-6 w-6" />,
      title: tf("factoring.section5.item5.title", "Legal Compliance"),
      content: tf(
        "factoring.section5.item5.content",
        "Full compliance with EU financial services regulations"
      ),
    },
    {
      icon: <IconPhone className="h-6 w-6" />,
      title: tf("factoring.section5.item6.title", "Collection Support"),
      content: tf(
        "factoring.section5.item6.content",
        "Professional collection services for overdue payments"
      ),
    },
  ];

  // --------- Region-specific override: Belgium (fr-BE / en-BE) ---------
  if (region === "be") {
    const isFr = language === "fr";
    // Section 1: Pourquoi l’affacturage est devenu stratégique en Belgique
    s1Title = isFr
      ? "Pourquoi l’affacturage est devenu stratégique pour les entreprises de transport en Belgique"
      : "Why factoring has become strategic for transport companies in Belgium";
    s1Desc = isFr
      ? "Le secteur belge du transport fait face à :"
      : "Belgian transport companies are facing:";
    s1Cards = [
      {
        icon: <IconDoc className="h-6 w-6" />,
        title: isFr ? "Délais de paiement longs" : "Long payment terms",
        content: isFr
          ? "Chez de nombreux chargeurs, 45–60 jours sont fréquents"
          : "For many shippers, 45–60 days are common",
        badge: isFr ? "Paiements" : "Payments",
      },
      {
        icon: <IconPercent className="h-6 w-6" />,
        title: isFr ? "Coûts en hausse" : "Rising costs",
        content: isFr
          ? "Carburant et charges d’exploitation impactent la marge"
          : "Fuel and operating expenses squeeze margins",
        badge: isFr ? "Coûts" : "Costs",
      },
      {
        icon: <IconShield className="h-6 w-6" />,
        title: isFr ? "Pression de trésorerie" : "Cash pressure",
        content: isFr
          ? "PME et TPE particulièrement exposées"
          : "SMEs and microbusinesses particularly exposed",
        badge: isFr ? "Trésorerie" : "Cash",
      },
      {
        icon: <IconLayers className="h-6 w-6" />,
        title: isFr ? "Marché fragmenté" : "Fragmented market",
        content: isFr
          ? "Sous‑traitance élevée et flux complexes"
          : "Heavy subcontracting and complex flows",
        badge: isFr ? "Marché" : "Market",
      },
      {
        icon: <IconSearch className="h-6 w-6" />,
        title: isFr ? "Conformité plus stricte" : "Stricter compliance",
        content: isFr ? "Peppol, EN 16931, e‑CMR" : "Peppol, EN 16931, e‑CMR",
        badge: isFr ? "Réglementaire" : "Compliance",
      },
    ];
    s1Bottom = isFr
      ? "L’affacturage digital devient une alternative fiable au crédit bancaire, surtout pour les transporteurs dont la croissance dépend de la capacité à financer les trajets à l’avance."
      : "Digital factoring is a reliable alternative to bank credit, especially for carriers whose growth depends on financing trips upfront.";

    // Section 2 (ajoutée): Accélérer la trésorerie — Avantages clés
    s1bTitle = isFr
      ? "Accélérez votre trésorerie en 24 heures"
      : "Accelerate your cash flow in 24 hours";
    s1bDesc = isFr
      ? "Un financement conçu pour les factures de transport. Ce modèle permet d’absorber les délais de paiement tout en maintenant une croissance stable."
      : "Financing purpose‑built for transport invoices. Absorb payment terms while maintaining stable growth.";
    s1bCards = [
      {
        icon: <IconBolt className="h-6 w-6" />,
        title: isFr ? "Paiement en 24h" : "24‑hour payment",
        content: isFr
          ? "Versement sous 24h après validation de la facture"
          : "Funds in 24h after invoice validation",
        badge: "24h",
      },
      {
        icon: <IconPercent className="h-6 w-6" />,
        title: isFr ? "Taux compétitifs" : "Competitive rates",
        content: isFr ? "0,10% à 0,15% par jour" : "0.10% to 0.15% per day",
        badge: isFr ? "Taux" : "Rates",
      },
      {
        icon: <IconShield className="h-6 w-6" />,
        title: isFr ? "Protection du crédit" : "Credit protection",
        content: isFr
          ? "Incluse pour limiter les défauts de paiement"
          : "Included to limit payment defaults",
        badge: isFr ? "Protégé" : "Protected",
      },
      {
        icon: <IconLayers className="h-6 w-6" />,
        title: isFr ? "Limites évolutives" : "Scalable limits",
        content: isFr
          ? "Évoluent avec le volume de transport"
          : "Scale with transport volume",
        badge: isFr ? "Scalable" : "Scalable",
      },
      {
        icon: <IconSearch className="h-6 w-6" />,
        title: isFr ? "Contrôles rigoureux" : "Rigorous checks",
        content: isFr
          ? "Basés sur e‑CMR, POD, OTIF, tarifs"
          : "Based on e‑CMR, POD, OTIF, tariffs",
        badge: isFr ? "Contrôles" : "Checks",
      },
      {
        icon: <IconDoc className="h-6 w-6" />,
        title: isFr ? "Conformité complète" : "Full compliance",
        content: isFr
          ? "Réglementations belges et européennes"
          : "Belgian and EU regulations",
        badge: isFr ? "Conforme" : "Compliant",
      },
    ];

    // Section 2: Process 3 steps (as provided)
    s2Title = isFr
      ? "Processus de financement en 3 étapes"
      : "3-step financing process";
    s2Desc = isFr
      ? "De la facture au paiement sur votre compte bancaire en moins de 24 heures"
      : "From invoice to settlement in your bank account in under 24 hours";
    steps = [
      {
        n: 1,
        icon: <IconDoc className="h-5 w-5" />,
        title: isFr ? "Soumettre la facture" : "Submit the invoice",
        content: isFr
          ? "Téléchargez vos factures de transport validées via la plateforme ou par API. Les documents associés (e‑CMR, POD, contrats, tarifs) sont rapprochés automatiquement."
          : "Upload validated transport invoices via the platform or API. Related docs (e‑CMR, POD, contracts, tariffs) are automatically matched.",
      },
      {
        n: 2,
        icon: <IconSearch className="h-5 w-5" />,
        title: isFr ? "Approbation instantanée" : "Instant approval",
        content: isFr
          ? "Le moteur évalue la solvabilité du débiteur, l’authenticité de la facture, la cohérence des données transport et les risques de double financement."
          : "Engine checks debtor creditworthiness, invoice authenticity, transport data consistency and double‑financing risks.",
      },
      {
        n: 3,
        icon: <IconBank className="h-5 w-5" />,
        title: isFr ? "Recevoir le paiement" : "Receive payment",
        content: isFr
          ? "Les fonds sont versés directement sur votre compte bancaire dans les 24h, moins les frais convenus."
          : "Funds are transferred to your bank account within 24h, minus agreed service fees.",
      },
    ];

    // Section 3: Pricing
    s3Title = isFr
      ? "Tarification transparente & sans engagement"
      : "Transparent, no‑commitment pricing";
    s3Desc = isFr
      ? "Pas de frais cachés, pas de minimums, pas de contrats longs"
      : "No hidden fees, no minimums, no long‑term contracts";
    rateTitle = isFr ? "Taux de factoring" : "Factoring rate";
    rateData = isFr ? "0,10% à 0,15%" : "0.10% to 0.15%";
    rateTime = isFr ? "par jour" : "per day";
    rateText = isFr
      ? "Basés sur la solvabilité du payeur, l’historique de paiement et la qualité des données (CMR, POD, tarifs)."
      : "Based on payer creditworthiness, payment history and data quality (CMR, POD, tariffs).";

    feeTitle = isFr ? "Frais de service" : "Service fee";
    feeData = isFr ? "20 CHF" : "CHF 20";
    feeTime = isFr ? "par facture" : "per invoice";
    feeText = isFr
      ? "Aucun abonnement, aucun volume minimum."
      : "No subscription, no minimum volume.";

    exTitle = isFr ? "Exemple" : "Example";
    exD1 = isFr ? "Facture : 10’000 CHF" : "Invoice: CHF 10,000";
    exC1 = isFr ? "Montant" : "Invoice amount";
    exD2 = isFr ? "Coût total : 300 CHF" : "Total cost: CHF 300";
    exC2 = isFr ? "30 jours @ 0,15%" : "30 days @ 0.15%";
    exD3 = isFr ? "Montant reçu : 9’680 CHF" : "Amount received: CHF 9,680";
    exC3 = isFr ? "Vous recevez" : "You receive";

    // Section 4: Benefits
    s4Title = isFr
      ? "Avantages pour le transport, les transitaires et les chargeurs belges"
      : "Benefits for Belgian carriers, forwarders and shippers";
    carriersTitle = isFr ? "Pour les transporteurs" : "For carriers";
    carriersList = isFr
      ? [
          "Débloquez des liquidités en moins de 48h",
          "Financez trajets et carburant sans pression de trésorerie",
          "Protection contre les débiteurs en difficulté",
          "Aucune dette bancaire — financement basé sur les factures",
          "Évitez le double financement grâce aux contrôles Fincargo",
        ]
      : [
          "Unlock liquidity in under 48h",
          "Finance trips and fuel without cash stress",
          "Protection against distressed debtors",
          "No bank debt — invoice‑based financing",
          "Avoid double‑financing via Fincargo controls",
        ];
    fwdTitle = isFr
      ? "Pour les transitaires & expéditeurs"
      : "For forwarders & shippers";
    fwdList = isFr
      ? [
          "Améliorez le DPO sans détériorer la relation fournisseur",
          "Sécurisez l’approvisionnement",
          "Paiement anticipé des sous‑traitants, fiabilisation",
          "Automatisation du rapprochement (e‑CMR, bons, tarifs)",
          "Piste d’audit complète pour chaque facture",
          "Validation structurée des factures entrantes",
          "Intégration API avec ERP / TMS / WMS",
        ]
      : [
          "Improve DPO without harming supplier relations",
          "Secure supply",
          "Early payment of subcontractors to build reliability",
          "Automatic matching (e‑CMR, orders, tariffs)",
          "Complete audit trail per invoice",
          "Structured validation of incoming invoices",
          "API integration with ERP / TMS / WMS",
        ];

    // Section 5: Risk management
    s5Title = isFr ? "Gestion des risques avancée" : "Advanced risk management";
    s5Desc = isFr
      ? "Contrôles financiers + vérifications documentaires pour sécuriser chaque opération d’affacturage"
      : "Financial controls + documentary checks to secure every factoring operation";
    riskItems = [
      {
        icon: <IconScale className="h-6 w-6" />,
        title: isFr ? "Évaluation du crédit" : "Credit evaluation",
        content: isFr
          ? "Score débiteur, historiques de paiement, vérification TVA (VIES/BCE)"
          : "Debtor score, payment history, VAT/VIES checks",
      },
      {
        icon: <IconSearch className="h-6 w-6" />,
        title: isFr ? "Vérification des factures" : "Invoice verification",
        content: isFr
          ? "Contrôles IA de cohérence (e‑CMR, POD, tarifs, montants, dates, références)"
          : "AI consistency checks (e‑CMR, POD, tariffs, amounts, dates, refs)",
      },
      {
        icon: <IconAlert className="h-6 w-6" />,
        title: isFr ? "Détection de fraude" : "Fraud detection",
        content: isFr
          ? "Doublons, factures fictives, validation identité payeur"
          : "Duplicates, fake invoices, payer identity validation",
      },
      {
        icon: <IconLock className="h-6 w-6" />,
        title: isFr ? "Protection des paiements" : "Payment protection",
        content: isFr
          ? "Garantie contre défauts, suivi temps réel, escalade en retard"
          : "Guarantee vs defaults, real‑time tracking, escalation on delay",
      },
      {
        icon: <IconShield className="h-6 w-6" />,
        title: isFr ? "Conformité" : "Compliance",
        content: isFr
          ? "Conformité complète avec les réglementations belges et européennes"
          : "Full compliance with Belgian and EU regulations",
      },
      {
        icon: <IconPhone className="h-6 w-6" />,
        title: isFr ? "Recouvrement" : "Collections support",
        content: isFr
          ? "Relance et recouvrement professionnels, dossiers auditables"
          : "Professional dunning and recovery, auditable files",
      },
    ];
  }

  return (
    <>
      {/* ========== Section 1 (variant by region) ========== */}
      {region !== "be" ? (
        <section ref={r0} className="relative bg-white py-20 md:py-28">
          <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
            <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`max-w-3xl transition-all duration-700 ${
                v[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/10">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
                FACTORING
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
                {s1Title}
              </h2>
              <p className="mt-3 text-lg md:text-xl text-slate-700">{s1Desc}</p>
            </div>

            <div
              className={`mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
                v[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {s1Cards.map((c, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition"
                  style={{ transitionDelay: `${120 + i * 80}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                      {c.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {c.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm md:text-base text-slate-700">
                        {c.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {s1Bottom ? (
              <p className="mt-8 max-w-3xl text-base sm:text-lg md:text-xl text-slate-700">
                {s1Bottom}
              </p>
            ) : null}
          </div>
        </section>
      ) : (
        <section
          ref={r0}
          className="relative bg-gradient-to-b from-darkBlue to-black py-20 md:py-28 text-white overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
            <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`max-w-3xl transition-all duration-700 ${
                v[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                {language === "fr" ? "POURQUOI" : "WHY FACTORING"}
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
                {s1Title}
              </h2>
              <p className="mt-3 text-lg md:text-xl text-white/80">{s1Desc}</p>
            </div>

            <div
              className={`mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${
                v[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {s1Cards.map((c, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ transitionDelay: `${120 + i * 80}ms` }}
                >
                  {/* corner glow */}
                  <div
                    className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl"
                    aria-hidden
                  />
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                      {c.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold">{c.title}</h3>
                      <p className="mt-2 text-sm md:text-base text-white/85">
                        {c.content}
                      </p>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    aria-hidden
                  />
                </div>
              ))}
            </div>

            {s1Bottom ? (
              <p className="mt-8 max-w-3xl text-base sm:text-lg md:text-xl text-white/85">
                {s1Bottom}
              </p>
            ) : null}
          </div>
        </section>
      )}

      {/* ========== Section 2 (WHITE, BE only) ========== */}
      {region === "be" && s1bTitle && s1bCards ? (
        <section ref={r0b} className="relative bg-white py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
            <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`max-w-3xl transition-all duration-700 ${
                v[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/10">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
                {language === "fr" ? "AVANTAGES CLÉS" : "KEY BENEFITS"}
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
                {s1bTitle}
              </h2>
              {s1bDesc ? (
                <p className="mt-3 text-lg md:text-xl text-slate-700">
                  {s1bDesc}
                </p>
              ) : null}
            </div>

            <div
              className={`mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${
                v[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {s1bCards.map((c, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl bg-white px-6 py-7 md:px-8 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition"
                  style={{ transitionDelay: `${120 + i * 80}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                      {c.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {c.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm md:text-base text-slate-700">
                        {c.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ========== Section 2 (DARK) ========== */}
      <section
        className="relative bg-gradient-to-b from-darkBlue to-black py-20 md:py-28 text-white overflow-hidden"
        ref={r1}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div
            className={`max-w-3xl transition-all duration-700 ${
              (region === "be" ? v[2] : v[1])
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              PROCESS
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {s2Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/80">{s2Desc}</p>
          </div>

          {/* Steps */}
          <ol
            className={`mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${
              (region === "be" ? v[2] : v[1])
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {steps.map((s, i) => (
              <li
                key={i}
                className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-8 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl text-center transition-transform duration-300 hover:-translate-y-0.5"
                style={{ transitionDelay: `${120 + i * 80}ms` }}
                aria-label={`Step ${s.n}: ${s.title}`}
              >
                {/* Number badge centered */}
                <div className="relative mx-auto mb-5 h-16 w-16">
                  <div
                    className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"
                    aria-hidden
                  />
                  <div className="relative grid h-full w-full place-items-center rounded-full bg-white/10 ring-1 ring-white/20 text-2xl font-black">
                    {s.n}
                  </div>
                </div>

                {/* Icon centered */}
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  {s.icon}
                </div>

                {/* Title + content */}
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm md:text-base text-white/85">
                  {s.content}
                </p>

                {/* Subtle bottom sheen */}
                <div
                  className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  aria-hidden
                />
              </li>
            ))}
          </ol>

          {/* Optional: mini progress dots sous la grille (mobile only) */}
          <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
            {steps.map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-6 rounded-full bg-white/15"
                style={{ opacity: 0.9 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 3 (WHITE) ========== */}

      <section
        ref={r2}
        className="relative bg-white py-24 md:py-28"
        // Pour une césure correcte en allemand, assure-toi que <html lang="de"> ou ici lang="de" selon la langue courante
      >
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Header */}
          <div
            className={`max-w-4xl transition-all duration-700 ${
              (region === "be" ? v[3] : v[2])
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/10">
              PRICING
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase [text-wrap:balance]">
              {s3Title}
            </h2>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-700 [text-wrap:balance]">
              {s3Desc}
            </p>
          </div>

          {/* Cards */}
          {/* Pricing cards (2 colonnes en haut, l'exemple plein large en dessous) */}
          <div
            className={`mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 transition-all duration-700 ${
              v[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Rate */}
            <div className="relative overflow-hidden rounded-2xl bg-white px-7 py-8 md:px-9 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                  <IconPercent className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-slate-900 break-words hyphens-auto">
                    {rateTitle}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
                    <div className="text-3xl md:text-4xl font-black tracking-tight">
                      <span className="bg-gradient-to-r from-lightBlue to-black bg-clip-text text-transparent">
                        {rateData}
                      </span>
                    </div>
                    <span className="text-sm md:text-base font-semibold text-slate-500 break-words hyphens-auto">
                      {rateTime}
                    </span>
                  </div>
                  <p className="mt-3 text-sm md:text-base text-slate-700 leading-relaxed break-words hyphens-auto">
                    {rateText}
                  </p>
                </div>
              </div>
            </div>

            {/* Service Fee */}
            <div className="relative overflow-hidden rounded-2xl bg-white px-7 py-8 md:px-9 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                  <IconDoc className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-slate-900 break-words hyphens-auto">
                    {feeTitle}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
                    <div className="text-3xl md:text-4xl font-black tracking-tight">
                      <span className="bg-gradient-to-r from-lightBlue to-black bg-clip-text text-transparent">
                        {feeData}
                      </span>
                    </div>
                    <span className="text-sm md:text-base font-semibold text-slate-500 break-words hyphens-auto">
                      {feeTime}
                    </span>
                  </div>
                  <p className="mt-3 text-sm md:text-base text-slate-700 leading-relaxed break-words hyphens-auto">
                    {feeText}
                  </p>
                </div>
              </div>
            </div>

            {/* Example — passe en dessous sur toute la largeur */}
            <div className="relative overflow-hidden rounded-2xl bg-white px-7 py-8 md:px-9 md:py-10 border border-slate-200 ring-1 ring-slate-900/5 shadow-sm md:col-span-2">
              <h3 className="text-xl font-bold text-slate-900 break-words hyphens-auto">
                {exTitle}
              </h3>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-xs font-medium text-slate-600 break-words hyphens-auto">
                    {exC1}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold tracking-tight">
                    {exD1}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-xs font-medium text-slate-600 break-words hyphens-auto">
                    {exC2}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold tracking-tight">
                    {exD2}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-xs font-medium text-slate-600 break-words hyphens-auto">
                    {exC3}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold tracking-tight">
                    {exD3}
                  </div>
                </div>
              </div>

              {/* <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm text-slate-500 [text-wrap:balance] break-words hyphens-auto">
                <IconClock className="h-4 w-4 flex-none" />
                <span>
                  Illustrative example; actual pricing varies by risk profile.
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ========== Section 4 (DARK) ========== */}
      <section
        className="relative bg-gradient-to-b from-darkBlue to-black py-20 md:py-28 text-white overflow-hidden"
        ref={r3}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_15%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(34,211,238,0.2),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              v[3] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              BENEFITS
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {s4Title}
            </h2>
          </div>

          <div
            className={`mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 transition-all duration-700 ${
              (region === "be" ? v[4] : v[3])
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {/* Carriers */}
            <article className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl">
              <h3 className="text-xl font-bold text-white">{carriersTitle}</h3>
              <ul className="mt-4 space-y-2">
                {carriersList.map((li, idx) => (
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
            </article>
            {/* Forwarders & Shippers */}
            <article className="relative overflow-hidden rounded-2xl bg-white/5 px-6 py-7 md:px-8 md:py-10 border border-white/10 ring-1 ring-white/10 shadow-2xl">
              <h3 className="text-xl font-bold text-white">{fwdTitle}</h3>
              <ul className="mt-4 space-y-2">
                {fwdList.map((li, idx) => (
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
            </article>
          </div>
        </div>
      </section>

      {/* ========== Section 5 (WHITE) ========== */}
      <section ref={r4} className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute right-12 -top-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              (region === 'be' ? v[5] : v[4]) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/10">
              RISK
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {s5Title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-slate-700">{s5Desc}</p>
          </div>

          {/* Stacked list layout (clean, not grid-like) */}
          <div
            className={`mt-8 transition-all duration-700 ${
              (region === 'be' ? v[5] : v[4]) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } md:columns-2 md:gap-6`}
          >
            {riskItems.map((it, i) => (
              <article
                key={i}
                className={`inline-block w-full align-top mb-3 break-inside-avoid relative overflow-hidden rounded-xl border border-slate-200 ring-1 ring-slate-900/5 shadow-sm bg-white px-5 py-4 md:px-5 md:py-5 hover:shadow transition ${
                  i % 2 === 1 ? 'bg-slate-50/70' : ''
                }`}
                style={{ transitionDelay: `${120 + (i % 6) * 60}ms` }}
              >
                <div className="flex items-start gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                    {it.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-slate-900">{it.title}</h3>
                    <p className="mt-1 text-sm md:text-[15px] leading-relaxed text-slate-700">{it.content}</p>
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
