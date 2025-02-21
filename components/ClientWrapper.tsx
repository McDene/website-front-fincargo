"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import CookieBanner from "./CookieBanner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { fetchAPI } from "@/lib/utils";

interface CookieData {
  message: string;
  acceptText: string;
  rejectText: string;
  moreInfoLink: string;
}

export default function ClientWrapper() {
  const [cookieData, setCookieData] = useState<CookieData | null>(null);
  const [consent, setConsent] = useState<string | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    // Récupérer les données des cookies depuis Strapi côté client
    const fetchCookieData = async () => {
      try {
        const response = await fetchAPI("/api/cookie-setting?populate=*");

        console.log("Data:", response);

        if (response?.data) {
          const attributes = response.data;
          setCookieData({
            message: attributes.Message || "Charging...",
            acceptText: attributes.AcceptButtonText || "Accept",
            rejectText: attributes.RejectButtonText || "Reject",
            moreInfoLink: attributes.MoreInfoLink || "Learn more",
          });
        } else {
          setCookieData({
            message: "Charging...",
            acceptText: "Accept",
            rejectText: "Reject",
            moreInfoLink: "Learn more",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cookies:", error);
      }
    };

    fetchCookieData();

    // Vérifie si l'utilisateur a déjà accepté ou refusé les cookies
    const cookieConsent = getCookie("cookie_consent");
    if (!cookieConsent) {
      setIsBannerVisible(true);
    }
    setConsent(cookieConsent ? String(cookieConsent) : null);
  }, []);

  if (!cookieData) return null;

  return (
    <>
      {/* ✅ Google Analytics activé uniquement après acceptation */}
      {consent === "accepted" && <GoogleAnalytics gaId="G-VGSWFSGPXZ" />}

      {/* ✅ Affichage du bandeau de cookies uniquement si non accepté/rejeté */}
      {isBannerVisible && <CookieBanner {...cookieData} />}
    </>
  );
}
