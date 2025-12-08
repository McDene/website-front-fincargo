import type { LanguageCore } from "@/lib/i18n";

export interface BeEInvoicingContent {
  h1: string;
  subheading: string;
  intro: string[];

  regulation: {
    h2: string;
    bulletsTitle: string;
    bullets: string[];
    note: string;
  };

  whyPeppol: {
    h2: string;
    bulletsTitle: string;
    bullets: string[];
    note: string;
  };

  ecmr: {
    h2: string;
    tagline: string;
    bullets: string[];
    note: string;
    kpi: { title: string; value: string; subtitle: string; chips: string[] };
  };

  benefits: {
    h2: string;
    carriers: { title: string; items: string[] };
    forwarders: { title: string; items: string[] };
    shippers: { title: string; items: string[] };
  };

  capabilities: {
    h2: string;
    items: Array<{ title: string; desc: string }>;
  };
}

type Dict = Partial<Record<LanguageCore, BeEInvoicingContent>> & {
  en: BeEInvoicingContent;
  fr: BeEInvoicingContent;
};

export const EINVOICING_BE: Dict = {
  fr: {
    h1: "E-Invoicing en Belgique",
    subheading:
      "Facturation électronique Peppol & EN 16931 pour transporteurs, transitaires et chargeurs",
    intro: [
      "La Belgique accélère la transition vers la facturation électronique obligatoire en B2B. Le passage à une facture structurée (EN 16931), transmise via Peppol, devient un standard incontournable pour le secteur du transport et de la logistique.",
      "Fincargo fournit une plateforme spécialisée capable de générer, transmettre, recevoir et valider des factures électroniques entièrement conformes, tout en automatisant l'encaissement et le traitement fournisseur.",
    ],
    regulation: {
      h2: "Cadre réglementaire belge : facturation électronique obligatoire dès 2026",
      bulletsTitle: "Obligations clés",
      bullets: [
        "Facturation électronique B2G obligatoire depuis 2017",
        "Facturation électronique B2B obligatoire confirmée pour 2026 (loi fédérale)",
        "Format imposé : EN 16931 (facture structurée européenne)",
        "Transmission recommandée : réseau Peppol (BIS 3.0)",
        "Archivage légal obligatoire selon les normes belges",
        "Alignement complet avec ViDA (VAT in the Digital Age)",
      ],
      note: "Ce cadre est particulièrement important pour les entreprises actives dans le transport où les volumes de factures, d’avoirs et de documents associés (CMR, e-waybill, POD) sont élevés.",
    },
    whyPeppol: {
      h2: "Pourquoi Peppol est devenu incontournable pour le secteur du transport en Belgique",
      bulletsTitle: "Avantages pour les entreprises de transport :",
      bullets: [
        "Transmission directe",
        "Moins de rejets des autorités fiscales grâce au 100-FPA (First Past Acceptance) de Fincargo",
        "Traçabilité complète via les accusés de réception Peppol",
        "Réduction des litiges sur la TVA, montants ou doublons",
        "Reconnaissance des revenus plus rapide et réduction du DSO",
        "Plus besoin de conserver des PDF ni de gérer des tâches manuelles",
      ],
      note: "Fincargo est nativement compatible avec Peppol BIS 3.0, UBL 2.1, et toutes les extensions belges pertinentes.",
    },
    ecmr: {
      h2: "E-waybill & digitalisation des documents logistiques",
      tagline: "Un accélérateur pour l'e-invoicing transport en Belgique",
      bullets: [
        "l’automatisation du lien prestation → CMR → facture",
        "la validation automatique des éléments de transport",
        "la vérification des incohérences (date, lieu, poids, kilométrage)",
      ],
      note: "En combinant e-waybill + e-invoicing, les transporteurs belges peuvent réduire leurs cycles OTC (Order-to-Cash) de 95 %.",
      kpi: {
        title: "Impact sur le cycle OTC",
        value: "95%",
        subtitle: "de réduction du cycle Order‑to‑Cash",
        chips: ["Moins de litiges", "Validation + rapide"],
      },
    },
    benefits: {
      h2: "Avantages pour le transport, les transitaires et les chargeurs en Belgique",
      carriers: {
        title: "Pour les transporteurs :",
        items: [
          "Génération automatique de factures électroniques et de e-waybills structurées",
          "Transmission directe via Peppol",
          "Contrôles de conformité automatiques avant envoi",
          "Moins de rejets, moins de litiges",
          "Encaissement accéléré",
          "Archivage légal conforme aux normes belges",
        ],
      },
      forwarders: {
        title: "Pour les transitaires :",
        items: [
          "Traitement sans intervention des factures électroniques et e-waybills",
          "Rapprochement automatique (e-waybill, bons de transport, tarifs)",
          "Détection automatique des doublons et anomalies",
          "Vérification de la TVA et des identifiants d’entreprise",
          "Piste d’audit complète pour chaque facture",
        ],
      },
      shippers: {
        title: "Pour les chargeurs et expéditeurs :",
        items: [
          "Validation structurée des factures électroniques waybills entrantes",
          "Intégration API avec ERP / TMS / WMS",
          "Automatisation des contrôles documentaires",
          "Gestion unifiée des factures transport multi-prestataires",
        ],
      },
    },
    capabilities: {
      h2: "Capacités techniques Fincargo (spécifiques au marché belge)",
      items: [
        {
          title: "Norme EN 16931",
          desc: "Structure européenne obligatoire pour les factures électroniques B2B et B2G en Belgique.",
        },
        {
          title: "Peppol BIS 3.0",
          desc: "Profil belge standard pour l’échange sécurisé des factures.",
        },
        {
          title: "UBL 2.1",
          desc: "Format de données universel, support natif côté Fincargo.",
        },
        {
          title: "Contrôles TVA",
          desc: "Validation automatique des numéros TVA belges, vérification VIES.",
        },
        {
          title: "Signatures numériques",
          desc: "Garanties d’intégrité, horodatage et preuve légale.",
        },
        {
          title: "API ERP/TMS",
          desc: "Connecteurs vers SAP, Navision, Odoo, Transwide, Trimble, TAS-TMS, etc.",
        },
        {
          title: "Multi-langue",
          desc: "FR & NL (France/Belgique) totalement supportés.",
        },
      ],
    },
  },
  en: {
    h1: "E‑Invoicing in Belgium",
    subheading:
      "Peppol & EN 16931 e‑invoicing for carriers, forwarders and shippers",
    intro: [
      "Belgium is accelerating towards mandatory B2B e‑invoicing. Structured invoices (EN 16931), transmitted via Peppol, are becoming the de‑facto standard for the transport and logistics sector.",
      "Fincargo provides a specialised platform to generate, send, receive and validate fully compliant e‑invoices — while automating collections and supplier processing.",
    ],
    regulation: {
      h2: "Belgian regulatory framework: mandatory e‑invoicing from 2026",
      bulletsTitle: "Key obligations",
      bullets: [
        "B2G e‑invoicing mandatory since 2017",
        "B2B e‑invoicing confirmed for 2026 (federal law)",
        "Required format: EN 16931 (EU structured invoice)",
        "Recommended transmission: Peppol network (BIS 3.0)",
        "Legal archiving required under Belgian standards",
        "Full alignment with ViDA (VAT in the Digital Age)",
      ],
      note: "This framework matters especially in transport, where volumes of invoices, credit notes and related documents (CMR, e-waybill, POD) are high.",
    },
    whyPeppol: {
      h2: "Why Peppol has become essential for transport in Belgium",
      bulletsTitle: "Benefits for transport businesses:",
      bullets: [
        "Direct transmission",
        "Fewer tax-authority rejections thanks to Fincargo’s 100-FPA (First Past Acceptance)",
        "Full traceability via Peppol acknowledgements",
        "Fewer VAT/amount/duplicate disputes",
        "Fster revenue recognition, and a shorter DSO",
        "No need to keep PDFs or handle manual tasks anymore",
      ],
      note: "Fincargo is natively compatible with Peppol BIS 3.0, UBL 2.1 and all relevant Belgian extensions.",
    },
    ecmr: {
      h2: "e‑waybill & digitalisation of logistics documents",
      tagline: "A catalyst for transport e‑invoicing in Belgium",
      bullets: [
        "automation of service → CMR → invoice linkage",
        "automatic validation of transport elements",
        "consistency checks (date, location, weight, mileage)",
      ],
      note: "Combining e‑waybill + e‑invoicing helps Belgian carriers shorten OTC (Order‑to‑Cash) cycles by 95%.",
      kpi: {
        title: "Impact on the OTC cycle",
        value: "95%",
        subtitle: "reduction in Order‑to‑Cash cycle",
        chips: ["Fewer disputes", "Faster validation"],
      },
    },
    benefits: {
      h2: "Benefits for Belgian carriers, forwarders and shippers",
      carriers: {
        title: "For carriers:",
        items: [
          "Automatic generation of structured e‑invoices and e-waybill",
          "Direct transmission over Peppol",
          "Pre‑submission compliance checks",
          "Fewer rejections and disputes",
          "Faster collections",
          "Legal archiving compliant with Belgian rules",
        ],
      },
      forwarders: {
        title: "For forwarders:",
        items: [
          "Touchless processing of e-invoices and e-waybills",
          "Automatic matching (e‑waybill, transport orders, tariffs)",
          "Automatic duplicate/anomaly detection",
          "VAT and business ID verification",
          "Complete audit trail per invoice",
        ],
      },
      shippers: {
        title: "For shippers:",
        items: [
          "Structured validation of incoming e-invoices",
          "API integration with ERP / TMS / WMS",
          "Automated documentary checks",
          "Unified management of multi‑carrier transport invoices",
        ],
      },
    },
    capabilities: {
      h2: "Fincargo technical capabilities (Belgian market)",
      items: [
        {
          title: "EN 16931 standard",
          desc: "Mandatory EU structure for B2B/B2G e‑invoices in Belgium.",
        },
        {
          title: "Peppol BIS 3.0",
          desc: "Belgian‑standard profile for secure invoice exchange.",
        },
        {
          title: "UBL 2.1",
          desc: "Universal data format with native Fincargo support.",
        },
        {
          title: "VAT checks",
          desc: "Automatic validation of Belgian VAT numbers and VIES lookup.",
        },
        {
          title: "Digital signatures",
          desc: "Integrity guarantees, timestamping and legal proof.",
        },
        {
          title: "ERP/TMS API",
          desc: "Connectors for SAP, Navision, Odoo, Transwide, Trimble, TAS‑TMS, etc.",
        },
        {
          title: "Multi‑language",
          desc: "FR & NL (France/Belgium) fully supported.",
        },
      ],
    },
  },
};
