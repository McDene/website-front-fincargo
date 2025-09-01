// pricings_by_transaction.ts
export const PRICINGS_BY_TRANSACTION = {
  en: {
    "pricing.by_transaction.title": "Transparent and Variable Pricing",
    "pricing.by_transaction.hero.caption":
      "Transactional pricing is volume-dependent and starts from CHF 0.50 per module and shipment.",

    "pricing.by_transaction.table.headers": [
      "Module / Service",
      "Fee for Forwarder & Shipper",
      "Fee for Carrier",
    ],
    "pricing.by_transaction.table.rows": [
      ["TMS Core", "CHF 0.50 per transaction", "Free"],
      ["e-CMR", "CHF 0.50 per document", "Free"],
      ["Audit (Payables)", "CHF 0.50 per invoice", "Free"],
      ["e-Invoicing", "CHF 0.50 per invoice", "Free"],
      [
        "Factoring (Payables)",
        "Free within agreed payment term",
        "0.10–0.15% per day + CHF 20 service fee per financed invoice",
      ],
      ["Support", "Iris Support", "Iris Support"],
    ],
    "pricing.by_transaction.disclaimer":
      "Integration, calibration, and analytics services are available as optional add-ons to tailor the platform to your business needs, while factoring is available for accounts receivable of carriers and small forwarders.",
  },

  fr: {
    "pricing.by_transaction.title":
      "Transparente et variable pour le transport routier",
    "pricing.by_transaction.hero.caption":
      "Le prix transactionnel dépend des volumes et démarre à partir de CHF 0.50 par module et expédition. ",

    "pricing.by_transaction.table.headers": [
      "Module / Service",
      "Tarif pour transitaire & expéditeur",
      "Tarif pour transporteur",
    ],
    "pricing.by_transaction.table.rows": [
      ["TMS Core", "CHF 0.50 par transaction", "Free"],
      ["e-CMR", "CHF 0.50 par document", "Free"],
      ["Audit (Payables)", "CHF 0.50 par facture", "Free"],
      ["e-facturation", "CHF 0.50 par facture", "Free"],
      [
        "Affacturage (Payables)",
        "Gratuit dans le délai de paiement convenu",
        "0.10–0.15% par jour + CHF 20 de frais de service par facture financée",
      ],
      ["Support", "Iris Support", "Iris Support"],
    ],
    "pricing.by_transaction.disclaimer":
      "L’intégration, le calibrage et les services d’analytique sont disponibles en options pour adapter la plateforme à vos besoins, tandis que l’affacturage est proposé pour les créances des transporteurs et des petits transitaires.",
  },

  es: {
    "pricing.by_transaction.title":
      "Transparente y variable para el transporte por carretera",
    "pricing.by_transaction.hero.caption":
      "La tarificación por transacción depende del volumen y parte de CHF 0.50 por módulo y envío.",

    "pricing.by_transaction.table.headers": [
      "Módulo / Servicio",
      "Tarifa para transitario y cargador",
      "Tarifa para transportista",
    ],
    "pricing.by_transaction.table.rows": [
      ["TMS Core", "CHF 0.50 por transacción", "Free"],
      ["e-CMR", "CHF 0.50 por documento", "Free"],
      ["Auditoría (Payables)", "CHF 0.50 por factura", "Free"],
      ["e-Facturación", "CHF 0.50 por factura", "Free"],
      [
        "Factoring (Payables)",
        "Gratuito dentro del plazo de pago acordado",
        "0.10–0.15% por día + CHF 20 de comisión por factura financiada",
      ],
      ["Soporte", "Iris Support", "Iris Support"],
    ],
    "pricing.by_transaction.disclaimer":
      " La integración, calibración y analítica están disponibles como complementos opcionales para adaptar la plataforma a tu empresa, mientras que el factoring está disponible para cuentas por cobrar de transportistas y pequeños transitarios.",
  },

  de: {
    "pricing.by_transaction.title": "Transparente und variable Preisgestaltung",
    "pricing.by_transaction.hero.caption":
      "Die transaktionsbezogene Preisgestaltung ist volumenabhängig und beginnt bei CHF 0.50 pro Modul und Sendung.",

    "pricing.by_transaction.table.headers": [
      "Modul / Service",
      "Gebühr für Spediteur & Verlader",
      "Gebühr für Frachtführer",
    ],
    "pricing.by_transaction.table.rows": [
      ["TMS Core", "CHF 0.50 pro Transaktion", "Frei"],
      ["e-CMR", "CHF 0.50 pro Dokument", "Frei"],
      ["Audit (Payables)", "CHF 0.50 pro Rechnung", "Frei"],
      ["e-Rechnungsstellung", "CHF 0.50 pro Rechnung", "Frei"],
      [
        "Factoring (Payables)",
        "Kostenfrei innerhalb der vereinbarten Zahlungsfrist",
        "0.10–0.15% pro Tag + CHF 20 Servicegebühr pro finanzierter Rechnung",
      ],
      ["Support", "Iris Support", "Iris Support"],
    ],
    "pricing.by_transaction.disclaimer":
      "Integration, Kalibrierung und Analytics sind als optionale Add-ons verfügbar, um die Plattform an Ihre Bedürfnisse anzupassen; Factoring ist für Forderungen von Frachtführern und kleinen Spediteuren verfügbar.",
  },
} as const;
