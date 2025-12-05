"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = "G-VGSWFSGPXZ"; // already used in ClientWrapper

export default function GAView() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    const pagePath = pathname + (search?.toString() ? `?${search.toString()}` : "");
    window.gtag("config", GA_ID, { page_path: pagePath });
  }, [pathname, search]);

  return null;
}
