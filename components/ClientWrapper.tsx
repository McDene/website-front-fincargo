"use client";

import { useEffect, useState, useContext } from "react";
import { getCookie } from "cookies-next";
import CookieBanner from "./CookieBanner";
import GAView from "@/app/_components/GAView";
import AnalyticsEvents from "@/app/_components/AnalyticsEvents";
import { GoogleAnalytics } from "@next/third-parties/google";
import { fetchAPI } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

interface CookieData {
  message: string;
  acceptText: string;
  rejectText: string;
  moreInfoLink: string;
}

export default function ClientWrapper() {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const [cookieData, setCookieData] = useState<CookieData | null>(null);
  const [consent, setConsent] = useState<string | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    // Récupérer les données des cookies depuis Strapi côté client
    const fetchCookieData = async () => {
      try {
        const response = await fetchAPI(
          "/api/cookie-setting?populate=*",
          language
        );

        console.log("Data:", response);

        if (response?.data) {
          const attributes = response.data;
          setCookieData({
            message: attributes.Message || "Charging...",
            acceptText: attributes.AcceptButtonText || "Accept",
            rejectText: attributes.RejectButtonText || "Reject",
            moreInfoLink: attributes.MoreInfoLink || t("learn_more_cookies"),
          });
        } else {
          setCookieData({
            message: "Charging...",
            acceptText: "Accept",
            rejectText: "Reject",
            moreInfoLink: t("learn_more_cookies"),
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
    // Listen to consent changes (so we can start GA without reload)
    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent).detail as string | undefined;
      if (detail === "accepted" || detail === "rejected") {
        setConsent(detail);
        setIsBannerVisible(false);
      }
    };
    window.addEventListener("cookie-consent", onConsent as EventListener);
    return () => window.removeEventListener("cookie-consent", onConsent as EventListener);
  }, [language, t]);

  if (!cookieData) return null;

  return (
    <>
      {/* ✅ Google Analytics activé uniquement après acceptation */}
      {consent === "accepted" && (
        <>
          <GoogleAnalytics gaId="G-VGSWFSGPXZ" />
          <GAView />
          <AnalyticsEvents />
        </>
      )}

      {/* ✅ Affichage du bandeau de cookies uniquement si non accepté/rejeté */}
      {isBannerVisible && <CookieBanner {...cookieData} />}
    </>
  );
}
