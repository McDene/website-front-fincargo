import type { LanguageCore } from "@/lib/i18n";
import type { Region } from "@/lib/i18n";

export interface RegionConfig {
  allowedLanguages: readonly LanguageCore[];
}

const DEFAULT_LANGS: readonly LanguageCore[] = ["en", "fr", "es", "de"] as const;

const MAP: Record<Region, RegionConfig> = {
  global: {
    allowedLanguages: DEFAULT_LANGS,
  },
  be: {
    // Belgique: EN aujourd'hui, FR prochainement (déjà listé pour anticiper)
    allowedLanguages: ["en", "fr"],
  },
};

export const getRegionConfig = (region: Region): RegionConfig => MAP[region] ?? { allowedLanguages: DEFAULT_LANGS };

