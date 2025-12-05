"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // fournie via env, sinon fallback GTM-only

export default function GAView() {
  const pathname = usePathname();
  const search = useSearchParams();
  const didSkipInitial = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pagePath = pathname + (search?.toString() ? `?${search.toString()}` : "");
    // GA direct
    if (GA_ID && window.gtag) {
      window.gtag("config", GA_ID, { page_path: pagePath });
      return;
    }
    // GTM-only fallback: pousse un "page_view" pour SPA (évite le double PV initial)
    if (!didSkipInitial.current) {
      didSkipInitial.current = true;
      return; // le tag GA4 Config (GTM) enverra le 1er page_view
    }
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });
    } catch {}
  }, [pathname, search]);

  return null;
}
