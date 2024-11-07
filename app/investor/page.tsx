"use client";

// import { useEffect, useState } from "react";
// import ClipLoader from "react-spinners/ClipLoader";

import HeaderSecondary from "@/components/Header/Secondary";
import HeroInvestor from "@/components/Hero/HeroInvestor";
import Footer from "@/components/Footer";
// import { fetchAPI } from "@/lib/utils";

export default function InvestorPage() {
  return (
    <>
      <HeaderSecondary />
      <HeroInvestor />
      <Footer />
    </>
  );
}
