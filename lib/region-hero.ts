import type { Region } from "@/lib/i18n";

export type HeroRightType = "chips" | "peppol-card" | "none";

export interface HeroFeature {
  icon: "ShieldCheckIcon" | "ClipboardDocumentCheckIcon" | "BoltIcon" | "DocumentCheckIcon";
  title: string;
  desc: string;
}

export interface HeroCardConfig {
  headerChips?: Array<{ text: string; tone?: "primary" | "success" | "neutral" }>;
  title: string;
  leads?: string[];
  features?: HeroFeature[];
  cta?: { href: string; label: string; ariaLabel?: string };
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
      title: "Peppol E‑Invoicing for the Transport Industry in Belgium",
      leads: [
        "EN 16931‑compliant electronic invoices with automated validation and delivery over the Peppol network.",
        "Fincargo streamlines and secures the entire process for carriers, freight forwarders, and shippers.",
      ],
      features: [
        { icon: "ShieldCheckIcon", title: "Compliance by design", desc: "EN 16931 rules kept up‑to‑date." },
        { icon: "ClipboardDocumentCheckIcon", title: "Automated validation", desc: "Detects errors before delivery." },
        { icon: "BoltIcon", title: "Peppol delivery", desc: "Fast and secure network routing." },
        { icon: "DocumentCheckIcon", title: "Built for transport", desc: "Carriers, forwarders and shippers." },
      ],
      cta: { href: "/e-invoicing", label: "Learn more", ariaLabel: "Learn more about E‑Invoicing in Belgium" },
    },
  },
};

export const getHeroVariant = (region: Region): HeroVariant => VARIANTS[region] ?? VARIANTS.global;

