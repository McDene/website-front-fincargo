"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const GlobeLoader = dynamic(() => import("./GlobeLoader"), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center bg-gradient-to-b from-darkBlue to-black"
      style={{ height: 752 }}
    />
  ),
});

export default function GlobeLoaderWrapper() {
  return (
    <Suspense fallback={<div className="bg-gradient-to-b from-darkBlue to-black" style={{ height: 752 }} />}>
      <GlobeLoader />
    </Suspense>
  );
}
