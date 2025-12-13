"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const envGA = process.env.NEXT_PUBLIC_GA_ID;

export default function GAView() {
  const pathname = usePathname();
  const search = useSearchParams();
  const didSkipInitial = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Resolve GA ID either from env or from global injected in layout
    const GA_ID = envGA || (window as unknown as { GA_MEASUREMENT_ID?: string }).GA_MEASUREMENT_ID;
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
