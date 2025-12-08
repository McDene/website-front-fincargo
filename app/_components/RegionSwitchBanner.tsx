"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

type RegionChoice = "be" | "global";

const STORAGE_KEY = "fincargo-region";
const BE_HOSTS = new Set([
  "be.fincargo.ai",
  "fincargo.be",
  "www.fincargo.be",
  "be.localhost",
]);

function isBeHost(hostname: string): boolean {
  const h = (hostname || "").toLowerCase();
  if (BE_HOSTS.has(h)) return true;
  if (h.startsWith("be.")) return true;
  if (h.endsWith(".be.localhost")) return true;
  return false;
}

function readCookie(name: string): string | null {
  try {
    const match = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.toLowerCase().startsWith(name.toLowerCase() + "="));
    return match ? decodeURIComponent(match.split("=")[1]) : null;
  } catch {
    return null;
  }
}

function detectIsBelgianClient(): boolean {
  // Middleware-provided meta tag (optional)
  const meta =
    document.querySelector('meta[name="x-country"]')?.getAttribute("content") ||
    "";
  if (meta.toUpperCase().trim() === "BE") return true;

  // Cookie fallback (optional: if middleware sets it)
  const fromCookie =
    readCookie("x-country") ||
    readCookie("country") ||
    readCookie("NEXT_COUNTRY") ||
    readCookie("cf-ipcountry");
  if ((fromCookie || "").toUpperCase().trim() === "BE") return true;

  // URL param overrides (useful for testing or edge-cases)
  try {
    const u = new URL(window.location.href);
    const qp = (
      u.searchParams.get("x-country") ||
      u.searchParams.get("country") ||
      ""
    )
      .toUpperCase()
      .trim();
    if (qp === "BE") return true;
  } catch {}

  // Browser language
  const langs = Array.isArray(navigator.languages)
    ? navigator.languages
    : [navigator.language].filter(Boolean);
  return langs.some((l) => {
    const v = String(l || "").toLowerCase();
    return v.startsWith("fr-be") || v.startsWith("nl-be");
  });
}

/**
 * RegionSwitchBanner
 *
 * Small, non-blocking bottom banner shown only on the global site (www.fincargo.ai)
 * for users likely visiting from Belgium, inviting them to go to be.fincargo.ai.
 * - Never auto-redirects; only redirects upon explicit click.
 * - Persists the user's choice in localStorage ("fincargo-region" = "be" | "global").
 */
// Simple inline flags
function FlagBE({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden>
      <rect width="1" height="2" x="0" fill="#000000" />
      <rect width="1" height="2" x="1" fill="#FFD90C" />
      <rect width="1" height="2" x="2" fill="#EF3340" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15.3 15.3 0 0 1 0 18a15.3 15.3 0 0 1 0-18z" />
    </svg>
  );
}

export default function RegionSwitchBanner(): JSX.Element | null {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"suggest" | "chooser">("suggest");
  // Décalage bas dynamique pour éviter un chevauchement avec la bannière cookies
  const [bottomOffset, setBottomOffset] = useState<number>(16);

  useEffect(() => {
    try {
      const host = window.location.hostname || "";
      const path = window.location.pathname || "/";

      // 1) Never show on BE domain
      if (isBeHost(host)) return;

      // 2) Respect previous choice
      const saved = (localStorage.getItem(STORAGE_KEY) || "") as
        | RegionChoice
        | "";
      // Allow local debug reset via ?region-reset=1
      let reset = false;
      try {
        const u = new URL(window.location.href);
        reset = u.searchParams.get("region-reset") === "1";
      } catch {}
      if (!reset && (saved === "be" || saved === "global")) return;
      if (reset) localStorage.removeItem(STORAGE_KEY);

      // 3) Sur la homepage globale: proposer un choix de région même sans détection BE
      const isHome = path === "/" || path === "/fr" || path === "/en";
      if (isHome) {
        const belgian = detectIsBelgianClient();
        setMode(belgian ? "suggest" : "chooser");
        setShow(true);
        return;
      }

      // 4) Sinon, n'afficher que si BE détecté
      const belgian = detectIsBelgianClient();
      if (belgian) {
        setMode("suggest");
        setShow(true);
      }
    } catch {
      // Fail open: do not show banner on unexpected client errors
    }
  }, []);

  // Mesure la place prise par une éventuelle bannière cookies en bas de page
  useEffect(() => {
    if (!show) return;
    const selectors = [
      "[data-cookie-banner]",
      "#cookie-banner",
      "#cookies-banner",
      ".cookie-banner",
      ".cookies-banner",
      ".cc-window",
      ".cc-banner",
      '[aria-label*="cookie" i]',
      '[aria-label*="cookies" i]',
      '[id*="cookie" i]',
      '[class*="cookie" i]',
    ];

    const compute = () => {
      let offset = 16; // 16px par défaut
      try {
        for (const sel of selectors) {
          const nodes = document.querySelectorAll<HTMLElement>(sel);
          nodes.forEach((el) => {
            const style = window.getComputedStyle(el);
            if (
              style.display === "none" ||
              style.visibility === "hidden" ||
              style.opacity === "0"
            )
              return;
            const rect = el.getBoundingClientRect();
            // Si l'élément est collé en bas (bannière cookie typique)
            const nearBottom = rect.bottom > window.innerHeight - 20;
            if (rect.height > 0 && nearBottom) {
              offset = Math.max(offset, Math.round(16 + rect.height + 12));
            }
          });
        }
      } catch {}
      setBottomOffset(offset);
    };

    compute();
    const onResize = () => compute();
    window.addEventListener("resize", onResize);
    const mo = new MutationObserver(() => compute());
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });
    return () => {
      window.removeEventListener("resize", onResize);
      mo.disconnect();
    };
  }, [show]);

  const onGoBe = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "be");
    } catch {}
    window.location.assign("https://be.fincargo.ai");
  };

  const onStay = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "global");
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  const title =
    mode === "chooser" ? t("region.title.chooser") : t("region.title.suggest");
  const subtitle =
    mode === "chooser"
      ? t("region.subtitle.chooser")
      : t("region.subtitle.suggest");

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Belgium region suggestion"
      className="fixed z-50 w-[calc(100%-2rem)] max-w-md left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0"
      style={{ bottom: bottomOffset }}
    >
      <div className="rounded-xl border border-slate-200 bg-white/95 backdrop-blur p-4 shadow-xl ring-1 ring-slate-900/5">
        <div className="flex items-start gap-3">
          {/* Accent dot */}
          <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-400" />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-slate-900 uppercase">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              {subtitle}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onGoBe}
                data-analytics-action="click_button"
                data-analytics-category="RegionSwitch"
                data-analytics-label="Go_BE"
                className="inline-flex items-center gap-2.5 justify-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-blue-500/20 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label={t("region.go_be")}
              >
                <FlagBE className="h-3.5 w-5" />
                <span>{t("region.go_be")}</span>
              </button>
              <button
                type="button"
                onClick={onStay}
                data-analytics-action="click_button"
                data-analytics-category="RegionSwitch"
                data-analytics-label="Stay_Global"
                className="inline-flex items-center gap-2.5 justify-center rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                aria-label={t("region.stay")}
              >
                <IconGlobe className="h-4 w-4" />
                <span>{t("region.stay")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
