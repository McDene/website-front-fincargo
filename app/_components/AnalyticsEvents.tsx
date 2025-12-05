"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const isExternal = (href: string) => {
  try {
    const url = new URL(href, location.origin);
    return url.origin !== location.origin;
  } catch {
    return false;
  }
};

export default function AnalyticsEvents() {
  const sentScrollForPath = useRef<Record<string, boolean[]>>({});

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-analytics-action], a, button");
      if (!el || !window.gtag) return;

      const actionAttr = el.getAttribute("data-analytics-action") || undefined;
      const categoryAttr = el.getAttribute("data-analytics-category") || undefined;
      const labelAttr = el.getAttribute("data-analytics-label") || undefined;

      // Anchors
      if (el instanceof HTMLAnchorElement) {
        const href = el.getAttribute("href") || "";
        const label = labelAttr || href;
        if (isExternal(href) || /^mailto:|^tel:/i.test(href)) {
          trackEvent({ action: actionAttr || "click_outbound_link", category: categoryAttr || "Outbound", label });
        } else {
          trackEvent({ action: actionAttr || "click_nav_link", category: categoryAttr || "Navigation", label });
        }
        return;
      }

      // Buttons
      if (el instanceof HTMLButtonElement || el.tagName.toLowerCase() === "button") {
        const label = labelAttr || (el.textContent || "").trim() || "button";
        trackEvent({ action: actionAttr || "click_button", category: categoryAttr || "UI", label });
        return;
      }
    };

    const onSubmit = (e: Event) => {
      if (!window.gtag) return;
      const form = e.target as HTMLFormElement | null;
      if (!form) return;
      const label = form.getAttribute("name") || form.getAttribute("id") || form.action || "form";
      trackEvent({ action: "form_submit", category: "Form", label });
    };

    const onScroll = () => {
      if (!window.gtag) return;
      const h = document.documentElement;
      const b = document.body;
      const scrollTop = h.scrollTop || b.scrollTop;
      const scrollHeight = Math.max(h.scrollHeight, b.scrollHeight);
      const clientHeight = h.clientHeight;
      const percent = Math.min(100, Math.round(((scrollTop + clientHeight) / scrollHeight) * 100));

      const path = location.pathname;
      const thresholds = [25, 50, 75, 100] as const;
      const sent = (sentScrollForPath.current[path] ||= [false, false, false, false]);
      thresholds.forEach((t, idx) => {
        if (!sent[idx] && percent >= t) {
          sent[idx] = true;
          trackEvent({ action: "scroll_depth", category: "Engagement", label: `${t}%` });
        }
      });
    };

    const clickOptions: AddEventListenerOptions = { capture: true, passive: true };
    document.addEventListener("click", onClick, clickOptions);
    document.addEventListener("submit", onSubmit, true);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}

