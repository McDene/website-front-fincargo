import { headers } from "next/headers";

export type MetaLang = "en" | "fr" | "es" | "de";

export const detectLangFromHeaders = async (): Promise<MetaLang> => {
  try {
    const h = await headers();
    const al = (h.get("accept-language") || "").toLowerCase();
    const order = ["fr", "de", "es", "en"]; // prioritize common EU langs, default en
    for (const code of order) {
      if (al.includes(code)) return code as MetaLang;
      if (code === "es" && al.includes("es-es")) return "es";
    }
    return "en";
  } catch {
    return "en";
  }
};
