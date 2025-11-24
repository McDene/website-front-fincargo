"use client";

import { useState } from "react";
import { CheckCircleIcon, BoltIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function SectionApiShowcase() {
  const [tab, setTab] = useState<"curl" | "js">("curl");

  const snippets: Record<typeof tab, string> = {
    curl: `curl -X POST https://api.fincargo.ai/v1/invoices \\
  -H "Authorization: Bearer <API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "invoiceNumber": "INV-2025-0001",
    "issueDate": "2025-01-05",
    "amount": 1299.50,
    "currency": "EUR",
    "carrierId": "car_82f1..."
  }'`,
    js: `import fetch from 'node-fetch';

await fetch('https://api.fincargo.ai/v1/invoices', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer <API_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    invoiceNumber: 'INV-2025-0001',
    issueDate: '2025-01-05',
    amount: 1299.50,
    currency: 'EUR',
    carrierId: 'car_82f1...'
  })
});`,
  };

  return (
    <section className="relative py-14 md:py-20 px-4">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Code panel */}
          <div className="rounded-2xl bg-gradient-to-b from-darkBlue to-black p-[1px] shadow-xl">
            <div className="rounded-2xl bg-[#0b1220] text-slate-100">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-1.5 mr-auto">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="inline-flex overflow-hidden rounded-lg ring-1 ring-white/15">
                  <button
                    onClick={() => setTab("curl")}
                    className={`px-3 py-1.5 text-sm ${
                      tab === "curl" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    cURL
                  </button>
                  <button
                    onClick={() => setTab("js")}
                    className={`px-3 py-1.5 text-sm ${
                      tab === "js" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    JavaScript
                  </button>
                </div>
              </div>
              <pre className="p-4 md:p-6 text-[13.5px] leading-7 overflow-x-auto">
                <code>{snippets[tab]}</code>
              </pre>
            </div>
          </div>

          {/* Benefits */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkBlue">
              Build integrations your users will love
            </h2>
            <p className="mt-3 text-slate-700 text-lg">
              Secure endpoints, predictable schemas, and modern tooling. Get to value in days, not months.
            </p>
            <ul className="mt-6 space-y-4">
              <Feature
                icon={<BoltIcon className="h-5 w-5" />}
                title="Fast to integrate"
                text="Simple REST resources, idempotent writes, consistent pagination and sorting."
              />
              <Feature
                icon={<ShieldCheckIcon className="h-5 w-5" />}
                title="Secure by design"
                text="OAuth2 / API keys, audit trails, least-privilege scopes."
              />
              <Feature
                icon={<CheckCircleIcon className="h-5 w-5" />}
                title="Battle‑tested"
                text="Monitoring, retries and back‑pressure to keep your flows resilient."
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-lightBlue/15 text-darkBlue ring-1 ring-lightBlue/30">
        {icon}
      </span>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-slate-700 text-sm md:text-[15px]">{text}</p>
      </div>
    </li>
  );
}

