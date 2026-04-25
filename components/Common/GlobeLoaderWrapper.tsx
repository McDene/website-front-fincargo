"use client";

import dynamic from "next/dynamic";

const GlobeLoader = dynamic(() => import("./GlobeLoader"), { ssr: false });

export default function GlobeLoaderWrapper() {
  return <GlobeLoader />;
}
