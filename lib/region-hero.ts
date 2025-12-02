import type { Region, LanguageCore } from "@/lib/i18n";

export type HeroRightType = "chips" | "peppol-card" | "none";

export interface HeroFeature {
  icon: "ShieldCheckIcon" | "ClipboardDocumentCheckIcon" | "BoltIcon" | "DocumentCheckIcon";
  title: string;
  desc: string;
}

type Localized<T> = Partial<Record<LanguageCore, T>> & { en: T };

export interface HeroCardConfig {
  headerChips?: Array<{ text: string; tone?: "primary" | "success" | "neutral" }>;
  title: string | Localized<string>;
  leads?: string[] | Localized<string[]>;
  features?: HeroFeature[];
  cta?: { href: string; label: string | Localized<string>; ariaLabel?: string | Localized<string> };
}

export interface HeroVariant {
  key: Region;
  showMock: boolean;
  showGlow: boolean;
  right: HeroRightType;
  card?: HeroCardConfig;
}

const VARIANTS: Record<Region, HeroVariant> = {
  global: {
    key: "global",
    showMock: true,
    showGlow: true,
    right: "chips",
  },
  be: {
    key: "be",
    showMock: false,
    showGlow: false,
    right: "peppol-card",
    card: {
      headerChips: [
        { text: "Belgium • Peppol", tone: "neutral" },
        { text: "EN 16931", tone: "success" },
      ],
      title: {
        en: "Peppol E‑Invoicing for the Transport Industry in Belgium",
        fr: "Facturation électronique Peppol pour le secteur du transport en Belgique",
      },
      leads: {
        en: [
          "EN 16931‑compliant electronic invoices with automated validation and delivery over the Peppol network.",
          "Fincargo streamlines and secures the entire process for carriers, freight forwarders, and shippers.",
        ],
        fr: [
          "Factures électroniques conformes à la norme EN 16931 avec validation automatisée et envoi via le réseau Peppol.",
          "Fincargo fluidifie et sécurise tout le processus pour les transporteurs, transitaires et chargeurs.",
        ],
      },
      features: [
        { icon: "ShieldCheckIcon", title: "Compliance by design", desc: "EN 16931 rules kept up‑to‑date." },
        { icon: "ClipboardDocumentCheckIcon", title: "Automated validation", desc: "Detects errors before delivery." },
        { icon: "BoltIcon", title: "Peppol delivery", desc: "Fast and secure network routing." },
        { icon: "DocumentCheckIcon", title: "Built for transport", desc: "Carriers, forwarders and shippers." },
      ],
      cta: {
        href: "/e-invoicing",
        label: { en: "Learn more", fr: "En savoir plus" },
        ariaLabel: {
          en: "Learn more about E‑Invoicing in Belgium",
          fr: "En savoir plus sur la facturation électronique en Belgique",
        },
      },
    },
  },
};

// Resolve localized values using the given language with fallback to EN
const resolve = <T,>(v: T | Localized<T>, lang: LanguageCore): T => {
  if (typeof v === "object" && v !== null && (v as any).en !== undefined) {
    const dict = v as Localized<T>;
    return dict[lang] ?? dict.en;
  }
  return v as T;
};

export interface ResolvedHeroVariant extends Omit<HeroVariant, "card"> {
  card?: Omit<HeroCardConfig, "title" | "leads" | "cta"> & {
    title: string;
    leads?: string[];
    cta?: { href: string; label: string; ariaLabel?: string };
  };
}

export const getHeroVariant = (region: Region, lang: LanguageCore = "en"): ResolvedHeroVariant => {
  const base = VARIANTS[region] ?? VARIANTS.global;
  if (!base.card) return base as ResolvedHeroVariant;
  const { card } = base;
  return {
    ...base,
    card: {
      ...card,
      title: resolve(card.title, lang),
      leads: card.leads ? resolve(card.leads as any, lang) : undefined,
      cta: card.cta
        ? {
            href: card.cta.href,
            label: resolve(card.cta.label, lang),
            ariaLabel: card.cta.ariaLabel ? resolve(card.cta.ariaLabel, lang) : undefined,
          }
        : undefined,
    },
  } as ResolvedHeroVariant;
};
