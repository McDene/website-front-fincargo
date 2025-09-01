// pricings_by_transaction.ts
export const PRICINGS_BY_TRANSACTION = {
  en: {
    "pricing.by_transaction.title": "See Fincargo in ACTION",
    "pricing.by_transaction.hero.caption":
      "Illustration reflects the TMS module as on the starting page.",

    "pricing.by_transaction.table.headers": [
      "Module / Service",
      "Fee for Forwarder & Shipper",
      "Fee for Carrier",
    ],
    "pricing.by_transaction.table.rows": [
      ["TMS Core", "CHF 0.50 per transaction", "–"],
      ["e-CMR", "CHF 0.50 per document", "–"],
      ["Audit (Payables)", "CHF 0.50 per invoice", "–"],
      ["e-Invoicing", "CHF 0.50 per invoice", "–"],
      [
        "Factoring (Payables)",
        "Free within agreed payment term",
        "0.10–0.15% per day + CHF 20 service fee per financed invoice",
      ],
    ],
    "pricing.by_transaction.disclaimer":
      "Transactional pricing is volume-dependent and starts from CHF 0.50 per module and shipment. Integration, calibration, and analytics services are available as optional add-ons to tailor the platform to your business needs, while factoring is available for accounts receivable of carriers and small forwarders.",
  },

  fr: {
    "pricing.by_transaction.title": "Découvrez Fincargo en action",
    "pricing.by_transaction.hero.caption":
      "L’illustration reflète le module TMS comme sur la page d’accueil.",

    "pricing.by_transaction.table.headers": [
      "Module / Service",
      "Tarif pour transitaire & expéditeur",
      "Tarif pour transporteur",
    ],
    "pricing.by_transaction.table.rows": [
      ["TMS Core", "CHF 0.50 par transaction", "–"],
      ["e-CMR", "CHF 0.50 par document", "–"],
      ["Audit (Payables)", "CHF 0.50 par facture", "–"],
      ["e-facturation", "CHF 0.50 par facture", "–"],
      [
        "Affacturage (Payables)",
        "Gratuit dans le délai de paiement convenu",
        "0.10–0.15% par jour + CHF 20 de frais de service par facture financée",
      ],
    ],
    "pricing.by_transaction.disclaimer":
      "Le prix transactionnel dépend des volumes et démarre à partir de CHF 0.50 par module et expédition. L’intégration, le calibrage et les services d’analytique sont disponibles en options pour adapter la plateforme à vos besoins, tandis que l’affacturage est proposé pour les créances des transporteurs et des petits transitaires.",
  },

  es: {
    "pricing.by_transaction.title": "Descubre Fincargo en acción",
    "pricing.by_transaction.hero.caption":
      "La ilustración refleja el módulo TMS como en la página de inicio.",

    "pricing.by_transaction.table.headers": [
      "Módulo / Servicio",
      "Tarifa para transitario y cargador",
      "Tarifa para transportista",
    ],
    "pricing.by_transaction.table.rows": [
      ["TMS Core", "CHF 0.50 por transacción", "–"],
      ["e-CMR", "CHF 0.50 por documento", "–"],
      ["Auditoría (Payables)", "CHF 0.50 por factura", "–"],
      ["e-Facturación", "CHF 0.50 por factura", "–"],
      [
        "Factoring (Payables)",
        "Gratuito dentro del plazo de pago acordado",
        "0.10–0.15% por día + CHF 20 de comisión por factura financiada",
      ],
    ],
    "pricing.by_transaction.disclaimer":
      "La tarificación por transacción depende del volumen y parte de CHF 0.50 por módulo y envío. La integración, calibración y analítica están disponibles como complementos opcionales para adaptar la plataforma a tu empresa, mientras que el factoring está disponible para cuentas por cobrar de transportistas y pequeños transitarios.",
  },

  de: {
    "pricing.by_transaction.title": "Fincargo in Aktion",
    "pricing.by_transaction.hero.caption":
      "Die Abbildung zeigt das TMS-Modul wie auf der Startseite.",

    "pricing.by_transaction.table.headers": [
      "Modul / Service",
      "Gebühr für Spediteur & Verlader",
      "Gebühr für Frachtführer",
    ],
    "pricing.by_transaction.table.rows": [
      ["TMS Core", "CHF 0.50 pro Transaktion", "–"],
      ["e-CMR", "CHF 0.50 pro Dokument", "–"],
      ["Audit (Payables)", "CHF 0.50 pro Rechnung", "–"],
      ["e-Rechnungsstellung", "CHF 0.50 pro Rechnung", "–"],
      [
        "Factoring (Payables)",
        "Kostenfrei innerhalb der vereinbarten Zahlungsfrist",
        "0.10–0.15% pro Tag + CHF 20 Servicegebühr pro finanzierter Rechnung",
      ],
    ],
    "pricing.by_transaction.disclaimer":
      "Die transaktionsbezogene Preisgestaltung ist volumenabhängig und beginnt bei CHF 0.50 pro Modul und Sendung. Integration, Kalibrierung und Analytics sind als optionale Add-ons verfügbar, um die Plattform an Ihre Bedürfnisse anzupassen; Factoring ist für Forderungen von Frachtführern und kleinen Spediteuren verfügbar.",
  },
} as const;
