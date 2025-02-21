"use client";

import { useEffect, useState } from "react";
import { setCookie, hasCookie } from "cookies-next";
import Link from "next/link";

interface CookieBannerProps {
  message: string;
  policyLink: string;
  acceptText: string;
  rejectText: string;
  moreInfoText: string;
}

export default function CookieBanner({
  message,
  policyLink,
  acceptText,
  rejectText,
  moreInfoText,
}: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!hasCookie("cookie_consent")) {
      setIsVisible(true);
      document.body.style.overflow = "hidden"; // Empêche le scroll en arrière-plan
    }
  }, []);

  const handleConsent = (consent: "accepted" | "rejected") => {
    setCookie("cookie_consent", consent, { maxAge: 365 * 24 * 60 * 60 });
    setIsVisible(false);
    document.body.style.overflow = "auto"; // Rétablit le scroll normal
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Boîte du Cookie Banner */}
      <div className="bg-gray-200  rounded-lg p-6 border border-gray-200 w-80 md:w-96 transform transition-all duration-500">
        {/* Titre + Message */}
        <div className="text-gray-800">
          <p className="text-xl font-semibold">🍪 Cookies & Privacy</p>
          <p className="text-sm mt-3">{message}</p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col space-y-2">
          <button
            onClick={() => handleConsent("accepted")}
            className="w-full bg-gray-900 text-white font-medium py-2 rounded-full hover:bg-gray-700 transition-all"
          >
            {acceptText}
          </button>
          <button
            onClick={() => handleConsent("rejected")}
            className="w-full text-gray-500 font-medium py-2 rounded-md hover:text-gray-700 transition-all"
          >
            {rejectText}
          </button>
          <Link
            href={policyLink}
            className="text-sm text-gray-900 underline hover:text-darkBlue text-center"
          >
            {moreInfoText}
          </Link>
        </div>
      </div>
    </div>
  );
}
