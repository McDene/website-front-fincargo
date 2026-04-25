"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

const TEAL   = "#3DD9C7";
const TEAL_2 = "#5FF0DA";

const HUBS = [
  { name: "Sion",         lon:   7.36, lat:  46.23, tier: 1, dx:  10, dy:  -8, anchor: "start" },
  { name: "Barcelona",    lon:   2.17, lat:  41.39, tier: 1, dx: -10, dy:   6, anchor: "end"   },
  { name: "Rotterdam",    lon:   4.48, lat:  51.92, tier: 2, dx: -10, dy:  -8, anchor: "end"   },
  { name: "Hamburg",      lon:  10.00, lat:  53.55, tier: 2, dx:  10, dy:  -8, anchor: "start" },
  { name: "Antwerp",      lon:   4.40, lat:  51.22, tier: 2, dx: -10, dy:  16, anchor: "end"   },
  { name: "Milan",        lon:   9.19, lat:  45.46, tier: 2, dx:  12, dy:   8, anchor: "start" },
  { name: "Warsaw",       lon:  21.01, lat:  52.23, tier: 2, dx:  10, dy:  -6, anchor: "start" },
  { name: "Bucharest",    lon:  26.10, lat:  44.43, tier: 2, dx:  10, dy:   8, anchor: "start" },
  { name: "Paris",        lon:   2.35, lat:  48.85, tier: 2, dx: -10, dy:  -8, anchor: "end"   },
  { name: "Istanbul",     lon:  28.98, lat:  41.01, tier: 2, dx:  10, dy:  -8, anchor: "start" },
  { name: "Dubai",        lon:  55.27, lat:  25.20, tier: 2, dx:  10, dy:   0, anchor: "start" },
  { name: "Singapore",    lon: 103.82, lat:   1.35, tier: 3, dx:  10, dy:   6, anchor: "start" },
  { name: "Shanghai",     lon: 121.47, lat:  31.23, tier: 3, dx:  10, dy:  -6, anchor: "start" },
  { name: "New York",     lon: -74.00, lat:  40.71, tier: 3, dx: -10, dy:  -8, anchor: "end"   },
  { name: "London",       lon:  -0.13, lat:  51.50, tier: 2, dx: -10, dy:  10, anchor: "end"   },
  { name: "Madrid",       lon:  -3.70, lat:  40.42, tier: 2, dx: -10, dy:  -8, anchor: "end"   },
  { name: "Mumbai",       lon:  72.88, lat:  19.08, tier: 3, dx:  10, dy:   0, anchor: "start" },
  { name: "Cairo",        lon:  31.24, lat:  30.04, tier: 3, dx:  10, dy:  10, anchor: "start" },
  { name: "Lagos",        lon:   3.39, lat:   6.52, tier: 3, dx:  10, dy:   6, anchor: "start" },
  { name: "São Paulo",    lon: -46.63, lat: -23.55, tier: 3, dx: -10, dy:   6, anchor: "end"   },
  { name: "Dakar",        lon: -17.45, lat:  14.69, tier: 3, dx: -10, dy:   0, anchor: "end"   },
  { name: "Casablanca",   lon:  -7.59, lat:  33.57, tier: 3, dx: -10, dy:   8, anchor: "end"   },
  { name: "Abidjan",      lon:  -4.02, lat:   5.36, tier: 3, dx: -10, dy:  10, anchor: "end"   },
  { name: "Nairobi",      lon:  36.82, lat:  -1.29, tier: 3, dx:  10, dy:   0, anchor: "start" },
  { name: "Addis Ababa",  lon:  38.74, lat:   9.03, tier: 3, dx:  10, dy:  -4, anchor: "start" },
  { name: "Johannesburg", lon:  28.04, lat: -26.20, tier: 3, dx:  10, dy:   6, anchor: "start" },
] as const;

const CORRIDORS = [
  [0, 1], [1, 2], [0, 5], [0, 8], [2, 3], [2, 4],
  [5, 6], [6, 7], [3, 9], [9, 10], [10, 11], [11, 12],
  [2, 13], [1, 8], [14, 2], [14, 13], [15, 1], [8, 14],
  [10, 16], [9, 17], [13, 19],
  [1, 21], [17, 22], [18, 23], [10, 23], [17, 25], [9, 25], [10, 24],
];

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

type Hub = typeof HUBS[number];

export default function GlobeLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 720;
    const RADIUS = 280;
    const CX = SIZE / 2;
    const CY = SIZE / 2;
    ctx.scale(2, 2);

    const projection = d3
      .geoOrthographic()
      .scale(RADIUS)
      .translate([CX, CY])
      .clipAngle(90)
      .rotate([0, -18, 0]);

    const geoPath = d3.geoPath(projection, ctx as any);
    const sphere  = { type: "Sphere" };
    const graticule = d3.geoGraticule10();

    let countries: any = null;
    let land: any = null;
    let rafId: number;

    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((r) => r.json())
      .then((world: any) => {
        countries = topojson.feature(world, world.objects.countries);
        land      = topojson.merge(world, world.objects.countries.geometries);
      })
      .catch(console.error);

    function isVisible(lon: number, lat: number) {
      const c = projection.invert!([CX, CY])!;
      const φ1 = (c[1]        * Math.PI) / 180;
      const φ2 = (lat          * Math.PI) / 180;
      const dλ = ((lon - c[0]) * Math.PI) / 180;
      return Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(dλ);
    }

    function project(lon: number, lat: number) {
      return projection([lon, lat]);
    }

    function drawOuterGlow() {
      const g = ctx!.createRadialGradient(CX, CY, RADIUS * 0.95, CX, CY, RADIUS + 70);
      g.addColorStop(0,    rgba(TEAL, 0));
      g.addColorStop(0.35, rgba(TEAL, 0.10));
      g.addColorStop(0.6,  rgba(TEAL, 0.05));
      g.addColorStop(1,    rgba(TEAL, 0));
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(CX, CY, RADIUS + 70, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawSphereBase() {
      ctx!.save();
      ctx!.beginPath();
      geoPath(sphere as any);
      ctx!.clip();
      const g = ctx!.createRadialGradient(CX - 80, CY - 100, RADIUS * 0.1, CX + 30, CY + 40, RADIUS * 1.05);
      g.addColorStop(0,    "#1B3553");
      g.addColorStop(0.45, "#0F2540");
      g.addColorStop(0.85, "#08182C");
      g.addColorStop(1,    "#040E1C");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, SIZE, SIZE);
      ctx!.restore();
    }

    function drawGraticule() {
      ctx!.beginPath();
      geoPath(graticule as any);
      ctx!.strokeStyle = rgba(TEAL, 0.08);
      ctx!.lineWidth = 0.6;
      ctx!.stroke();
    }

    function drawCountries() {
      if (!countries || !land) return;
      ctx!.beginPath();
      geoPath(land);
      ctx!.fillStyle = rgba("#1A3458", 0.55);
      ctx!.fill();

      ctx!.beginPath();
      geoPath(countries);
      ctx!.strokeStyle = rgba(TEAL, 0.30);
      ctx!.lineWidth = 0.7;
      ctx!.stroke();

      ctx!.beginPath();
      geoPath(land);
      ctx!.strokeStyle = rgba(TEAL, 0.5);
      ctx!.lineWidth = 0.9;
      ctx!.stroke();
    }

    function drawTerminator() {
      ctx!.save();
      ctx!.beginPath();
      geoPath(sphere as any);
      ctx!.clip();
      const g = ctx!.createLinearGradient(CX - RADIUS, 0, CX + RADIUS, 0);
      g.addColorStop(0,    "rgba(0,0,0,0)");
      g.addColorStop(0.55, "rgba(0,0,0,0)");
      g.addColorStop(1,    "rgba(0,0,0,0.45)");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, SIZE, SIZE);
      ctx!.restore();
    }

    function drawRimLight() {
      ctx!.save();
      ctx!.beginPath();
      geoPath(sphere as any);
      ctx!.clip();
      const g = ctx!.createRadialGradient(CX, CY, RADIUS * 0.92, CX, CY, RADIUS);
      g.addColorStop(0,    rgba(TEAL, 0));
      g.addColorStop(0.93, rgba(TEAL, 0));
      g.addColorStop(1,    rgba(TEAL_2, 0.55));
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, SIZE, SIZE);
      ctx!.restore();
    }

    function drawArc(a: Hub, b: Hub, t: number) {
      const interpolate = d3.geoInterpolate([a.lon, a.lat], [b.lon, b.lat]);
      const SAMPLES = 60;
      const pts: { p: [number, number] | null; v: number }[] = [];
      for (let i = 0; i <= SAMPLES; i++) {
        const [lon, lat] = interpolate(i / SAMPLES);
        pts.push({ p: project(lon, lat) as [number, number] | null, v: isVisible(lon, lat) });
      }

      ctx!.beginPath();
      let pen = false;
      for (const pt of pts) {
        if (pt.v > 0 && pt.p) {
          if (!pen) { ctx!.moveTo(pt.p[0], pt.p[1]); pen = true; }
          else        ctx!.lineTo(pt.p[0], pt.p[1]);
        } else { pen = false; }
      }
      ctx!.strokeStyle = rgba(TEAL, 0.32);
      ctx!.lineWidth = 1.0;
      ctx!.lineCap = "round";
      ctx!.stroke();

      const headIdx = Math.floor(t * SAMPLES);
      for (let k = 0; k < 12; k++) {
        const idx = headIdx - k;
        if (idx < 1) continue;
        const a1 = pts[idx - 1], a2 = pts[idx];
        if (!a1?.p || !a2?.p || a1.v <= 0 || a2.v <= 0) continue;
        ctx!.beginPath();
        ctx!.moveTo(a1.p[0], a1.p[1]);
        ctx!.lineTo(a2.p[0], a2.p[1]);
        ctx!.strokeStyle = rgba(TEAL_2, (1 - k / 12) * 0.95);
        ctx!.lineWidth = 2.6 - k * 0.18;
        ctx!.shadowColor = TEAL_2;
        ctx!.shadowBlur = 8;
        ctx!.stroke();
        ctx!.shadowBlur = 0;
      }
    }

    function drawHubsAndLabels(time: number) {
      type VisibleHub = { h: Hub; p: [number, number]; v: number };
      const visible: VisibleHub[] = [];
      for (const h of HUBS) {
        const v = isVisible(h.lon, h.lat);
        if (v <= 0.05) continue;
        const p = project(h.lon, h.lat) as [number, number] | null;
        if (!p) continue;
        visible.push({ h, p, v });
      }

      for (const { h, p, v } of visible) {
        const depth  = Math.min(1, v * 1.4);
        const pulse  = 0.55 + 0.45 * Math.sin(time * 2 + h.lon * 0.4);
        const baseR  = h.tier === 1 ? 3.6 : h.tier === 2 ? 2.8 : 2.0;

        ctx!.save();
        ctx!.shadowColor = TEAL_2;
        ctx!.shadowBlur  = 14;
        ctx!.beginPath();
        ctx!.arc(p[0], p[1], baseR + 2.4 * pulse, 0, Math.PI * 2);
        ctx!.fillStyle = rgba(TEAL, 0.50 * depth);
        ctx!.fill();
        ctx!.restore();

        ctx!.beginPath();
        ctx!.arc(p[0], p[1], baseR, 0, Math.PI * 2);
        ctx!.fillStyle = rgba(TEAL_2, 0.95 * depth);
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(p[0], p[1], baseR * 0.42, 0, Math.PI * 2);
        ctx!.fillStyle = rgba("#ffffff", 0.85 * depth);
        ctx!.fill();
      }

      const placed: { x: number; y: number; w: number; h: number }[] = [];
      const PAD = 3;
      function intersects(b: { x: number; y: number; w: number; h: number }) {
        return placed.some(
          (o) => b.x < o.x + o.w + PAD && b.x + b.w + PAD > o.x &&
                 b.y < o.y + o.h + PAD && b.y + b.h + PAD > o.y
        );
      }

      visible.sort((a, b) => a.h.tier - b.h.tier);

      for (const { h, p, v } of visible) {
        const depth    = Math.min(1, v * 1.4);
        const fontSize = h.tier === 1 ? 14 : h.tier === 2 ? 12 : 11;
        const weight   = h.tier === 1 ? "600" : "400";
        ctx!.font = `${weight} ${fontSize}px var(--font-inter), Inter, sans-serif`;
        const tw  = ctx!.measureText(h.name).width;
        const hgt = fontSize * 1.1;

        const right = h.anchor !== "end";
        const base = right
          ? [
              { dx:  10, dy:   0, anchor: "start" }, { dx:  10, dy: -12, anchor: "start" },
              { dx:  10, dy:  12, anchor: "start" }, { dx:  10, dy: -22, anchor: "start" },
              { dx:  10, dy:  22, anchor: "start" }, { dx: -10, dy:   0, anchor: "end"   },
              { dx: -10, dy: -12, anchor: "end"   }, { dx: -10, dy:  12, anchor: "end"   },
            ]
          : [
              { dx: -10, dy:   0, anchor: "end"   }, { dx: -10, dy: -12, anchor: "end"   },
              { dx: -10, dy:  12, anchor: "end"   }, { dx: -10, dy: -22, anchor: "end"   },
              { dx: -10, dy:  22, anchor: "end"   }, { dx:  10, dy:   0, anchor: "start" },
              { dx:  10, dy: -12, anchor: "start" }, { dx:  10, dy:  12, anchor: "start" },
            ];
        const candidates = [{ dx: h.dx, dy: h.dy, anchor: h.anchor }, ...base];

        let chosen: { dx: number; dy: number; anchor: string; box: { x: number; y: number; w: number; h: number }; tx: number; ty: number } | null = null;
        for (const c of candidates) {
          const tx = p[0] + c.dx;
          const ty = p[1] + c.dy;
          const bx = c.anchor === "end" ? tx - tw : tx;
          const box = { x: bx, y: ty - hgt / 2, w: tw, h: hgt };
          if (!intersects(box)) { chosen = { ...c, box, tx, ty }; break; }
        }
        if (!chosen) continue;

        placed.push(chosen.box);

        ctx!.beginPath();
        ctx!.moveTo(p[0], p[1]);
        ctx!.lineTo(chosen.anchor === "end" ? chosen.tx + 2 : chosen.tx - 2, chosen.ty);
        ctx!.strokeStyle = rgba(TEAL_2, 0.28 * depth);
        ctx!.lineWidth = 0.6;
        ctx!.stroke();

        ctx!.textAlign     = chosen.anchor as CanvasTextAlign;
        ctx!.textBaseline  = "middle";
        ctx!.fillStyle     = rgba("#E8FFFB", 0.95 * depth);
        ctx!.shadowColor   = "rgba(4, 14, 28, 0.85)";
        ctx!.shadowBlur    = 4;
        ctx!.fillText(h.name, chosen.tx, chosen.ty);
        ctx!.shadowBlur    = 0;
      }
    }

    function drawGlobe(time: number) {
      ctx!.clearRect(0, 0, SIZE, SIZE);
      projection.rotate([(time / 24) * 360, -18, 0]);

      drawOuterGlow();
      drawSphereBase();
      drawGraticule();
      drawCountries();
      drawTerminator();
      drawRimLight();

      CORRIDORS.forEach((c, i) => {
        drawArc(HUBS[c[0]], HUBS[c[1]], (time * 0.28 + i / CORRIDORS.length) % 1);
      });

      drawHubsAndLabels(time);

      ctx!.beginPath();
      geoPath(sphere as any);
      ctx!.strokeStyle = rgba(TEAL, 0.55);
      ctx!.lineWidth   = 1.1;
      ctx!.stroke();
    }

    const start = performance.now();
    function frame(now: number) {
      drawGlobe((now - start) / 1000);
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="relative flex items-center justify-center py-16 overflow-hidden bg-gradient-to-b from-darkBlue to-black">

      {/* Section label — Prompt font, lightBlue, matches other dark sections */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <span className="font-[family-name:var(--font-arimo)] text-xs font-semibold tracking-widest uppercase text-lightBlue/70">
          Supply Chain Finance Platform
        </span>
      </div>

      <div className="relative flex items-center justify-center gap-6 xl:gap-10 w-full max-w-[1400px] px-4">

        {/* ── Left panel: Execution & Compliance ── */}
        <div className="hidden lg:flex flex-col gap-4 w-52 xl:w-60 shrink-0">
          {[
            {
              label: "Execution Truth",
              title: "e-Waybill",
              desc: "Digital transport records — eFTI-compliant, non-repudiable, audit-ready.",
              chips: ["eFTI Compliant", "Digital at source"],
            },
            {
              label: "Economic Truth",
              title: "Invoice Integrity",
              desc: "Only services actually delivered are billed. Verified payables, clean receivables.",
              chips: ["Anomaly detection", "Delivery-based billing"],
            },
            {
              label: "Fiscal Truth",
              title: "e-Invoicing",
              desc: "Structured invoices validated and exchanged via compliant access points.",
              chips: ["ViDA Compliant", "EN 16931"],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-lightBlue/20 bg-white/[0.04] backdrop-blur-sm p-4"
            >
              <span className="font-[family-name:var(--font-arimo)] text-[10px] font-semibold tracking-widest uppercase text-lightBlue/60 mb-1 block">
                {item.label}
              </span>
              <h3 className="font-[family-name:var(--font-arimo)] text-sm font-semibold text-white mb-1">
                {item.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-xs text-white/50 leading-relaxed mb-2">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-1">
                {item.chips.map((c) => (
                  <span
                    key={c}
                    className="font-[family-name:var(--font-inter)] text-[10px] px-2 py-0.5 rounded-full border border-lightBlue/30 text-lightBlue/80"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Globe canvas ── */}
        <div
          role="img"
          aria-label="Fincargo global trade network"
          className="shrink-0"
          style={{ width: 720, height: 720, position: "relative" }}
        >
          <canvas
            ref={canvasRef}
            width={1440}
            height={1440}
            style={{ width: 720, height: 720, display: "block" }}
          />
        </div>

        {/* ── Right panel: Finance & Intelligence ── */}
        <div className="hidden lg:flex flex-col gap-4 w-52 xl:w-60 shrink-0">
          {[
            {
              label: "Liquidity Truth",
              title: "Supply Chain Finance",
              desc: "Only accepted, verified transactions are exposed to liquidity providers via Factor Connector™.",
              chips: ["24–48h funding", "Factor Connector™"],
            },
            {
              label: "Insight Truth",
              title: "Analytics & Intelligence",
              desc: "FPA, DSO, and anomaly detection powered by trusted operational data.",
              chips: ["Conversational AI", "Root-cause insights"],
            },
            {
              label: "Continuity Truth",
              title: "Integration & Connectivity",
              desc: "API-first connectivity to your ERP and TMS — bi-directional, without disruption.",
              chips: ["ERP / TMS connectors", "API-first"],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-lightBlue/20 bg-white/[0.04] backdrop-blur-sm p-4"
            >
              <span className="font-[family-name:var(--font-arimo)] text-[10px] font-semibold tracking-widest uppercase text-lightBlue/60 mb-1 block">
                {item.label}
              </span>
              <h3 className="font-[family-name:var(--font-arimo)] text-sm font-semibold text-white mb-1">
                {item.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-xs text-white/50 leading-relaxed mb-2">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-1">
                {item.chips.map((c) => (
                  <span
                    key={c}
                    className="font-[family-name:var(--font-inter)] text-[10px] px-2 py-0.5 rounded-full border border-lightBlue/30 text-lightBlue/80"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
