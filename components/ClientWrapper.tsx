"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import CookieBanner from "./CookieBanner";
import { GoogleAnalytics } from "@next/third-parties/google";

interface ClientWrapperProps {
  message: string;
  policyLink: string;
  acceptText: string;
  rejectText: string;
  moreInfoText: string;
}

export default function ClientWrapper({
  message,
  policyLink,
  acceptText,
  rejectText,
  moreInfoText,
}: ClientWrapperProps) {
  const [consent, setConsent] = useState<string | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = getCookie("cookie_consent");
    if (!cookieConsent) {
      setIsBannerVisible(true);
    }
    setConsent(cookieConsent ? String(cookieConsent) : null);
  }, []);

  return (
    <>
      {/* ✅ Google Analytics activé uniquement après acceptation */}
      {consent === "accepted" && <GoogleAnalytics gaId="G-VGSWFSGPXZ" />}

      {/* ✅ Affichage du bandeau de cookies uniquement si non accepté/rejeté */}
      {isBannerVisible && (
        <CookieBanner
          message={message}
          policyLink={policyLink}
          acceptText={acceptText}
          rejectText={rejectText}
          moreInfoText={moreInfoText}
        />
      )}
    </>
  );
}
