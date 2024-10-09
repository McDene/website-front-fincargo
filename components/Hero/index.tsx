"use client";

import SectionHero from "@/components/Common/SectionHero";
import SectionHeroMobile from "@/components/Common/SectionHeroMobile";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <SectionHeroMobile
          title="Secure your Fast Payment"
          paragraph="If you have an established relationship with Freight Forwarders in Fincargo’s network, we expedite the payment of your invoices. If your Freight Forwarder is not yet part of Fincargo’s network, you can invite them to join our platform."
          buttonText="Get started"
          imageUrl="/images/truck_fincargo_carrier.jpeg"
          imageAlt="Image de logistique"
        />
      ) : (
        <SectionHero
          title="Secure your Fast Payment"
          paragraph="If you have an established relationship with Freight Forwarders in Fincargo’s network, we expedite the payment of your invoices. If your Freight Forwarder is not yet part of Fincargo’s network, you can invite them to join our platform."
          buttonText="Get started"
          imageUrl="/images/truck_fincargo_carrier.jpeg"
          imageAlt="Image de logistique"
        />
      )}
    </>
  );
}
