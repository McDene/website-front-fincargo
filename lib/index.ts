import { HERO } from "./hero";
import { GENERAL } from "./general";
import { SERVICES } from "./services";
import { BENEFITS } from "./benefits";
import { PRICINGS } from "./pricing";
import { DEMO } from "./demo";
import { ECMR } from "./ecmr";
import { TMS } from "./tms";
import { PRICINGS_BY_TRANSACTION } from "./pricing_by_transaction";
import { FREIGHT_AUDIT } from "./freightaudit";
import { INVOICING } from "./invoicing";
import { ANALYTIC } from "./analytic";
import { FACTORING } from "./factoring";
import { INTEGRATION } from "./integration";
import { GETSTARTED } from "./get_started";

type Lang = "en" | "fr" | "es" | "de";
type Value = string | readonly string[];
type Dict = Record<Lang, Record<string, Value>>;

const modules = [
  HERO,
  GENERAL,
  SERVICES,
  BENEFITS,
  PRICINGS,
  DEMO,
  ECMR,
  TMS,
  PRICINGS_BY_TRANSACTION,
  FREIGHT_AUDIT,
  INVOICING,
  ANALYTIC,
  FACTORING,
  INTEGRATION,
  GETSTARTED,
] as const;

const merge = <T extends Record<string, unknown>>(a: T, b: T): T =>
  Object.assign({}, a, b);

const emptyByLang: Dict = {
  en: {},
  fr: {},
  es: {},
  de: {},
};

const TRANSLATIONS: Dict = modules.reduce<Dict>((acc, mod) => {
  (Object.keys(acc) as Lang[]).forEach((lang) => {
    acc[lang] = merge(acc[lang], (mod as Partial<Dict>)[lang] ?? {});
  });
  return acc;
}, emptyByLang);

export default TRANSLATIONS;
