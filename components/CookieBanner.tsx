"use client";

import { useEffect, useState } from "react";
import { setCookie, hasCookie } from "cookies-next";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

// Provide a safe typing for GA global at module level
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface CookieBannerProps {
  message: string;
  acceptText: string;
  rejectText: string;
  moreInfoLink: string;
}

export default function CookieBanner({
  message,
  acceptText,
  rejectText,
  moreInfoLink,
}: CookieBannerProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!hasCookie("cookie_consent")) {
      const t = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const handleConsent = (consent: "accepted" | "rejected") => {
    setCookie("cookie_consent", consent, { maxAge: 365 * 24 * 60 * 60 });
    setIsVisible(false);
    document.body.style.overflow = "auto"; // Rétablit le scroll normal
    // Consent Mode v2 (best effort)
    try {
      if (window.gtag) {
        const granted = consent === "accepted";
        window.gtag("consent", "update", {
          ad_user_data: granted ? "granted" : "denied",
          ad_personalization: granted ? "granted" : "denied",
          ad_storage: granted ? "granted" : "denied",
          analytics_storage: granted ? "granted" : "denied",
          functionality_storage: "granted",
          security_storage: "granted",
        });
      }
    } catch {}
    // Notify listeners so GA can start without reload
    try {
      window.dispatchEvent(new CustomEvent("cookie-consent", { detail: consent }));
    } catch {}
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 md:bottom-6 z-50 flex justify-center pointer-events-none">
      {/* Boîte du Cookie Banner (non modale, compacte) */}
      <div
        className="pointer-events-auto bg-white/95 rounded-2xl shadow-lg ring-1 ring-slate-200 backdrop-blur px-4 py-3 md:px-5 md:py-4 max-w-xl w-[92%]"
        role="dialog"
        aria-live="polite"
        aria-label="Cookies & Privacy"
      >
        {/* Titre + Message */}
        <div className="text-slate-800">
          <p className="text-[13px] md:text-sm leading-5">{message}</p>
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleConsent("accepted")}
            className="inline-flex items-center justify-center rounded-full bg-darkBlue text-white text-sm px-4 py-2 hover:opacity-95 transition"
          >
            {acceptText}
          </button>
          <button
            onClick={() => handleConsent("rejected")}
            className="inline-flex items-center justify-center rounded-full text-slate-600 text-sm px-3 py-2 hover:text-slate-800 transition"
          >
            {rejectText}
          </button>
          <Link
            href="/cookies"
            className="ml-auto text-sm text-darkBlue underline underline-offset-4 hover:opacity-90"
            aria-label={t("learn_more_cookies")}
          >
            {moreInfoLink}
          </Link>
        </div>
      </div>
    </div>
  );
}
