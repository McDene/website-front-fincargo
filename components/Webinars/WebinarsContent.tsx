"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Webinars landing page content (interactive).
 *
 * Mirrors the standalone "Fincargo Webinars" design: dark hero, a live
 * countdown to the e-CMR / Law 9/2025 deadline, a featured webinar card with
 * agenda + speakers, and a registration modal that generates calendar invites
 * (.ics / Google / Outlook).
 *
 * NOTE: registration currently persists to localStorage as a stand-in for the
 * CRM/backend. Replace `persistRegistration` with a real POST when the
 * endpoint is available.
 */

// ---- Webinar event (single source of truth for copy + calendar) ----
const WEBINAR = {
  dateLabel: { month: "Jul", day: "16", sub: "Thu · 2026" },
  title:
    "Sustainable Mobility Law (Law 9/2025): from regulatory obligation to competitive advantage",
  time: "12:00 – 12:30 CEST",
  // Sent to the CRM as `seminar`; must match the CRM email template's Seminar
  // Name (case-insensitive/trimmed). Kept ASCII-simple for reliable matching.
  seminarName: "Sustainable Mobility Law (e-CMR)",
  seminarDate: "2026-07-16",
  calendar: {
    title:
      "Webinar: Ley de Movilidad Sostenible (e-CMR) — Fincargo × Catalonia Logistics",
    start: "20260716T100000Z", // 12:00 CEST = 10:00 UTC
    end: "20260716T103000Z", // 12:30 CEST = 10:30 UTC
    startLocal: "2026-07-16T12:00:00",
    endLocal: "2026-07-16T12:30:00",
    location: "Online (the access link will be sent by email)",
    details:
      "Free Fincargo webinar in collaboration with Catalonia Logistics. The regulation, the challenges, eFTI-compliant e-CMR solutions and how agentic AI turns Law 9/2025 into an opportunity. 12:00-12:30 CEST.",
  },
} as const;

const TOPICS = [
  "Order management",
  "Regulatory e‑CMR / eDC",
  "Invoice integrity & verification",
  "Regulatory e‑Invoicing",
  "Supply chain finance",
];

const AGENDA = [
  {
    n: "01",
    title: "The regulation",
    body: "What Law 9/2025 requires, what changes versus paper, and who it applies to.",
  },
  {
    n: "02",
    title: "The challenges",
    body: "Deadlines, penalties and integration with your operations and systems.",
  },
  {
    n: "03",
    title: "The solutions",
    body: "eFTI‑compliant e‑CMR / e‑Documento de Control (eDC), with no friction for your team or your drivers.",
  },
  {
    n: "04",
    title: "The opportunity",
    body: "Agentic AI as a lever for efficiency gains, fraud detection and customer satisfaction.",
  },
];

const SPEAKERS = [
  { name: "Dr. Alban Aliôme‑Quillaud", role: "CEO of Fincargo" },
  { name: "Agustí Palacio", role: "Head of Fincargo Iberia" },
];

const PROFILES = ["Shipper", "Freight forwarder", "Carrier", "Logistics operator", "Other"];

// e-CMR / Law 9/2025 enforcement deadline that the countdown band tracks.
const DEADLINE = new Date("2026-10-05T00:00:00");
const SEATS = 80;

function buildIcsHref() {
  const e = WEBINAR.calendar;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fincargo//Webinars//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:webinar-ecmr-20260716@fincargo.ai",
    "DTSTAMP:20260623T090000Z",
    "DTSTART:" + e.start,
    "DTEND:" + e.end,
    "SUMMARY:" + e.title,
    "DESCRIPTION:" + e.details,
    "LOCATION:" + e.location,
    "ORGANIZER;CN=Fincargo:mailto:contact@fincargo.ai",
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Fincargo webinar in 1 hour",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
}

function buildGoogleHref() {
  const e = WEBINAR.calendar;
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: e.start + "/" + e.end,
    details: e.details,
    location: e.location,
  });
  return "https://calendar.google.com/calendar/render?" + p.toString();
}

function buildOutlookHref() {
  const e = WEBINAR.calendar;
  const p = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: e.title,
    startdt: e.startLocal,
    enddt: e.endLocal,
    body: e.details,
    location: e.location,
  });
  return "https://outlook.office.com/calendar/0/deeplink/compose?" + p.toString();
}

export default function WebinarsContent() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [profile, setProfile] = useState(PROFILES[0]);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailQueued, setEmailQueued] = useState(false);
  const formStartedAtRef = useRef(0);

  // Live countdown, refreshed every minute.
  useEffect(() => {
    const tick = () => {
      const days = Math.max(
        0,
        Math.ceil((DEADLINE.getTime() - Date.now()) / 86400000)
      );
      setDaysLeft(days);
    };
    tick();
    const timer = setInterval(tick, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const urgent = daysLeft != null && daysLeft <= 60;
  const dayColor = urgent ? "#E5341F" : "#FF7A1A";
  const urgentLabel = urgent
    ? "Less than 60 days — get ready now"
    : "Get ready before the deadline";

  const calendar = useMemo(
    () => ({
      ics: buildIcsHref(),
      google: buildGoogleHref(),
      outlook: buildOutlookHref(),
    }),
    []
  );

  const open = useCallback(() => {
    setSubmitted(false);
    setError(null);
    formStartedAtRef.current = Date.now();
    setModalOpen(true);
  }, []);
  const close = useCallback(() => setModalOpen(false), []);

  const canSubmit = Boolean(name && email && consent);

  const submit = useCallback(async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/internal-api/webinar-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-started-at": String(formStartedAtRef.current || Date.now()),
        },
        body: JSON.stringify({
          name,
          email,
          company,
          profile,
          seminar: WEBINAR.seminarName,
          seminar_date: WEBINAR.seminarDate,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || "Registration failed");
      }
      // The CRM queues the confirmation email when the seminar matches a
      // template; only promise an email if it actually did.
      setEmailQueued(Boolean(data?.queued));
      setSubmitted(true);
    } catch {
      setError(
        "We couldn't confirm your seat just now. Please try again, or email contact@fincargo.ai."
      );
    } finally {
      setSubmitting(false);
    }
  }, [canSubmit, submitting, name, email, company, profile]);

  // Lock body scroll + close on Escape while the modal is open.
  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, close]);

  return (
    <div className="bg-white text-[#0E1E3A]">
      {/* ===================== HERO ===================== */}
      <section className="bg-[linear-gradient(155deg,#0E1E3A_0%,#16294a_58%,#1d3357_100%)] text-white">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-8 pt-32 pb-16 sm:pb-20">
          <div className="text-xs font-extrabold tracking-[0.28em] uppercase text-[#5E8CFF] mb-5">
            Fincargo Webinars
          </div>
          <h1 className="max-w-[820px] text-4xl sm:text-5xl md:text-[54px] leading-[1.04] font-black tracking-[-0.03em]">
            Stay ahead across the order‑to‑cash journey.
          </h1>
          <p className="mt-6 max-w-[660px] text-lg sm:text-[19px] leading-[1.55] font-medium text-[#c7d2e8]">
            Live sessions with Fincargo experts and industry associations on the
            regulation, digitalisation and financing of transport &amp; logistics —
            from order management to supply chain finance.
          </p>

          {/* topic series */}
          <div className="mt-8">
            <div className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#7fa0ff] mb-3.5">
              Topics across the series
            </div>
            <div className="flex flex-wrap gap-2.5">
              {TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center rounded-full border border-[#7fa0ff]/30 bg-white/[0.07] px-4 py-2 text-sm font-bold text-[#dbe5fb]"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3.5">
            {["Live · free", "Recording available", "Live Q&A"].map((f) => (
              <div
                key={f}
                className="flex items-center gap-2.5 text-[15px] font-semibold text-[#9fb4ef]"
              >
                <span className="h-[7px] w-[7px] rounded-full bg-[#5E8CFF]" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== COUNTDOWN BAND ===================== */}
      <section className="bg-white border-b border-[#eef1f7]">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-8 py-6 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-5 flex-wrap">
            <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-[#5E8CFF]">
              Countdown
            </div>
            <div>
              <div className="text-lg font-extrabold text-[#0E1E3A] leading-tight">
                Mandatory e‑CMR / e‑Documento de Control comes into force · Law 9/2025
              </div>
              <div className="text-sm font-semibold text-[#8794ac] mt-0.5">
                Deadline: 5 October 2026 · {urgentLabel}
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-3" style={{ color: dayColor }}>
            <div className="text-[60px] leading-[0.9] font-black tracking-[-0.04em] tabular-nums">
              {daysLeft ?? "—"}
            </div>
            <div className="text-[17px] font-extrabold uppercase tracking-[0.05em]">
              days
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WEBINAR LIST ===================== */}
      <section id="webinars" className="mx-auto max-w-[1180px] px-6 sm:px-8 pt-16 sm:pt-[72px] pb-6 scroll-mt-24">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-[30px]">
          <div className="text-[13px] font-extrabold tracking-[0.18em] uppercase text-[#5E8CFF]">
            Upcoming webinars
          </div>
          <div className="text-sm font-semibold text-[#8794ac]">
            1 session scheduled
          </div>
        </div>

        {/* featured webinar card */}
        <article className="flex flex-col rounded-[22px] border border-[#e6eaf3] bg-white shadow-[0_14px_44px_rgba(14,30,58,0.07)] p-7 sm:px-[38px] sm:pt-[34px] sm:pb-8">
          {/* tags */}
          <div className="flex items-center gap-2.5 flex-wrap mb-[18px]">
            <span className="inline-flex items-center gap-[7px] rounded-full border border-[#f6d9c6] bg-[#fff4ed] px-[13px] py-[5px] text-xs font-extrabold text-[#8a3d18]">
              <span className="h-[7px] w-[7px] rounded-full bg-[#e8743b]" />
              Mandatory from 5 Oct 2026
            </span>
            <span className="text-xs font-extrabold tracking-[0.1em] uppercase text-[#8794ac]">
              e‑CMR · eDC · Compliance
            </span>
          </div>

          {/* header: compact date tile + title */}
          <div className="flex gap-6 items-start flex-wrap">
            <div className="flex-none w-24 rounded-2xl bg-[linear-gradient(160deg,#1d3357,#0E1E3A)] px-0 pt-[15px] pb-[13px] text-center text-white shadow-[0_8px_20px_rgba(14,30,58,0.22)]">
              <div className="text-[13px] font-extrabold tracking-[0.16em] uppercase text-[#7fa0ff]">
                {WEBINAR.dateLabel.month}
              </div>
              <div className="text-[46px] leading-[0.86] font-black tracking-[-0.03em] mt-[3px]">
                {WEBINAR.dateLabel.day}
              </div>
              <div className="text-[11px] font-bold text-[#9fb4ef] mt-[5px]">
                {WEBINAR.dateLabel.sub}
              </div>
            </div>
            <h2 className="flex-1 min-w-[260px] basis-[300px] m-0 text-2xl sm:text-[29px] leading-[1.14] font-black tracking-[-0.02em] text-[#0E1E3A] text-balance">
              {WEBINAR.title}
            </h2>
          </div>

          {/* meta chips */}
          <div className="mt-[22px] flex gap-2.5 flex-wrap items-center">
            <span className="inline-flex items-center gap-2 rounded-[10px] bg-[#0E1E3A] px-[15px] py-[9px] text-sm font-extrabold text-white">
              {WEBINAR.time}
            </span>
            <span className="inline-flex items-center gap-[7px] rounded-[10px] bg-[#f1f4fb] px-3.5 py-[9px] text-sm font-bold text-[#0E1E3A]">
              <span className="h-[7px] w-[7px] rounded-full bg-[#1F9D6B]" />
              Online · live
            </span>
            <span className="inline-flex items-center rounded-[10px] bg-[#f1f4fb] px-3.5 py-[9px] text-sm font-bold text-[#0E1E3A]">
              Free of charge
            </span>
          </div>

          <p className="mt-[22px] max-w-[760px] text-[16.5px] leading-[1.62] text-[#3a465e]">
            The transport control document becomes mandatorily electronic — the{" "}
            <strong className="text-[#0E1E3A]">e‑Documento de Control (eDC)</strong>,
            known internationally as e‑CMR. In 30 minutes we cover the regulation, the
            challenges, eFTI‑compliant solutions and how{" "}
            <strong className="text-[#0E1E3A]">agentic AI</strong> turns this
            requirement into efficiency and new value for shippers, forwarders and
            carriers.
          </p>

          {/* agenda */}
          <div className="mt-7">
            <div className="text-[13px] font-extrabold tracking-[0.16em] uppercase text-[#5E8CFF] mb-3">
              What we&apos;ll cover · 30 minutes
            </div>
            <div className="flex flex-col">
              {AGENDA.map((item) => (
                <div
                  key={item.n}
                  className="flex gap-[18px] items-baseline py-[15px] border-t border-[#eef1f7]"
                >
                  <div className="flex-none w-[34px] text-lg font-black text-[#5E8CFF] tracking-[-0.02em]">
                    {item.n}
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-extrabold text-[#0E1E3A]">
                      {item.title}
                    </div>
                    <p className="mt-1 text-[14.5px] leading-[1.55] text-[#3a465e]">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* speakers + collaboration */}
          <div className="mt-[26px] flex items-center gap-[30px] flex-wrap py-5 border-t border-b border-[#eef1f7]">
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#8794ac] mb-[9px]">
                Speakers
              </div>
              <div className="flex gap-[30px] flex-wrap">
                {SPEAKERS.map((s) => (
                  <div key={s.name}>
                    <div className="text-[15px] font-extrabold text-[#0E1E3A]">
                      {s.name}
                    </div>
                    <div className="text-[13px] font-semibold text-[#8794ac]">
                      {s.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-[#eef1f7]" />
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#8794ac] mb-[9px]">
                In collaboration with
              </div>
              <Image
                src="/images/catalonia-logistics.png"
                alt="Catalonia Logistics"
                width={140}
                height={32}
                className="h-8 w-auto block"
              />
            </div>
          </div>

          {/* cta row */}
          <div className="mt-[26px] flex items-center gap-[18px] flex-wrap">
            <button
              onClick={open}
              data-analytics-action="cta_click"
              data-analytics-category="Webinars"
              data-analytics-label="Save my seat"
              className="rounded-xl bg-[#5E8CFF] px-8 py-[15px] text-base font-extrabold text-white shadow-[0_8px_20px_rgba(94,140,255,0.3)] transition hover:bg-[#4a7af0]"
            >
              Save my seat&nbsp;&nbsp;→
            </button>
            <div className="flex items-center gap-[9px] rounded-full bg-[#fff4ed] px-4 py-[9px] text-sm font-bold text-[#8a3d18]">
              <span className="h-2 w-2 rounded-full bg-[#e8743b]" />
              {SEATS} seats left
            </div>
          </div>
        </article>
      </section>

      {/* ===================== MORE SOON ===================== */}
      <section className="mx-auto max-w-[1180px] px-6 sm:px-8 pt-2 pb-20">
        <div className="flex items-center justify-between flex-wrap gap-3.5 rounded-2xl border border-dashed border-[#d4dcec] px-[30px] py-[26px]">
          <div>
            <div className="text-base font-extrabold text-[#0E1E3A]">
              More webinars coming soon
            </div>
            <div className="text-sm text-[#8794ac] mt-[3px]">
              e‑Invoicing, Supply Chain Finance and regulatory updates. We&apos;ll let
              you know by email.
            </div>
          </div>
          <a
            href="/contact"
            className="text-sm font-extrabold text-[#5E8CFF] hover:text-[#4a7af0] transition"
          >
            Notify me &nbsp;→
          </a>
        </div>
      </section>

      {/* ===================== REGISTRATION MODAL ===================== */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0E1E3A]/55 backdrop-blur-[4px] p-6 animate-in fade-in-0 duration-200"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Webinar registration"
        >
          <div
            className="w-full max-w-[560px] max-h-[92vh] overflow-auto rounded-[20px] bg-white shadow-[0_30px_90px_rgba(14,30,58,0.4)] animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {!submitted ? (
              <div>
                {/* modal header */}
                <div className="relative rounded-t-[20px] bg-[linear-gradient(150deg,#0E1E3A,#1d3357)] px-8 pt-7 pb-[22px] text-white">
                  <button
                    onClick={close}
                    aria-label="Close"
                    className="absolute top-[18px] right-[18px] flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-white/10 text-lg leading-none text-white transition hover:bg-white/20"
                  >
                    ✕
                  </button>
                  <div className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#5E8CFF]">
                    Webinar · 16 July · 12:00 CEST
                  </div>
                  <h3 className="mt-2 text-[23px] font-black tracking-[-0.01em] leading-[1.15]">
                    Save your seat
                  </h3>
                  <p className="mt-2 text-sm text-[#c7d2e8] leading-[1.5]">
                    You&apos;ll receive the access link and a reminder by email. Free of
                    charge.
                  </p>
                </div>

                {/* form body */}
                <div className="px-8 pt-[26px] pb-[30px] flex flex-col gap-[15px]">
                  <label className="block">
                    <span className="block text-[13px] font-bold text-[#1a2438] mb-1.5">
                      Full name *
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-[11px] border border-[#e1e8f7] bg-[#f7f9fd] px-3.5 py-3 text-[15px] text-[#1a2438] outline-none transition focus:border-[#5E8CFF] focus:bg-white"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-[13px] font-bold text-[#1a2438] mb-1.5">
                      Work email *
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full rounded-[11px] border border-[#e1e8f7] bg-[#f7f9fd] px-3.5 py-3 text-[15px] text-[#1a2438] outline-none transition focus:border-[#5E8CFF] focus:bg-white"
                    />
                  </label>
                  <div className="flex gap-[13px] flex-wrap">
                    <label className="block flex-1 basis-[150px]">
                      <span className="block text-[13px] font-bold text-[#1a2438] mb-1.5">
                        Company
                      </span>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Your company"
                        className="w-full rounded-[11px] border border-[#e1e8f7] bg-[#f7f9fd] px-3.5 py-3 text-[15px] text-[#1a2438] outline-none transition focus:border-[#5E8CFF] focus:bg-white"
                      />
                    </label>
                    <label className="block flex-1 basis-[150px]">
                      <span className="block text-[13px] font-bold text-[#1a2438] mb-1.5">
                        Profile
                      </span>
                      <select
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                        className="w-full appearance-none rounded-[11px] border border-[#e1e8f7] bg-[#f7f9fd] px-3.5 py-3 text-[15px] text-[#1a2438] outline-none transition focus:border-[#5E8CFF] focus:bg-white"
                      >
                        {PROFILES.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="flex gap-2.5 items-start cursor-pointer mt-0.5">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-[3px] h-[17px] w-[17px] flex-none accent-[#5E8CFF]"
                    />
                    <span className="text-[13px] leading-[1.5] text-[#6b7a9c]">
                      I agree to receive the access link and communications related to
                      this webinar. *
                    </span>
                  </label>

                  <button
                    onClick={submit}
                    disabled={!canSubmit || submitting}
                    className={`mt-1.5 w-full rounded-xl py-[15px] text-base font-extrabold tracking-[0.01em] transition ${
                      canSubmit && !submitting
                        ? "bg-[#5E8CFF] text-white cursor-pointer hover:bg-[#4a7af0]"
                        : "bg-[#c8d3ea] text-white cursor-not-allowed"
                    }`}
                  >
                    {submitting ? "Confirming…" : <>Confirm my seat&nbsp;&nbsp;→</>}
                  </button>
                  {error && (
                    <p className="mt-0.5 text-center text-[13px] font-semibold text-[#c0341f]">
                      {error}
                    </p>
                  )}
                  <p className="mt-0.5 text-center text-xs text-[#8794ac]">
                    Your data is processed in accordance with our privacy policy.
                  </p>
                </div>
              </div>
            ) : (
              <div className="px-9 pt-11 pb-[38px] text-center">
                <div className="mx-auto mb-[22px] flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#e9f6ef]">
                  <span className="text-[40px] font-black leading-none text-[#1F9D6B]">
                    ✓
                  </span>
                </div>
                <h3 className="mb-3 text-[25px] font-black tracking-[-0.01em] text-[#0E1E3A]">
                  Seat confirmed!
                </h3>
                <p className="mx-auto mb-[26px] max-w-[380px] text-[15px] leading-[1.6] text-[#3a465e]">
                  See you on{" "}
                  <strong className="text-[#1a2438]">16 July at 12:00 (CEST)</strong>.
                  {emailQueued ? " We've sent a confirmation to your email." : ""} Add
                  it to your calendar now:
                </p>

                <div className="flex gap-2.5 justify-center flex-wrap">
                  <a
                    href={calendar.ics}
                    download="Webinar-Fincargo-eCMR.ics"
                    className="inline-flex items-center gap-2 rounded-[11px] bg-[#0E1E3A] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#16294a]"
                  >
                    Outlook / Apple&nbsp;.ics
                  </a>
                  <a
                    href={calendar.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[11px] border border-[#e1e8f7] bg-[#f1f4fb] px-5 py-3 text-sm font-extrabold text-[#0E1E3A] transition hover:bg-[#e8edf8]"
                  >
                    Google Calendar
                  </a>
                  <a
                    href={calendar.outlook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[11px] border border-[#e1e8f7] bg-[#f1f4fb] px-5 py-3 text-sm font-extrabold text-[#0E1E3A] transition hover:bg-[#e8edf8]"
                  >
                    Outlook web
                  </a>
                </div>

                <button
                  onClick={close}
                  className="mt-7 rounded-[10px] border border-[#d4dcec] px-6 py-[11px] text-sm font-bold text-[#5E8CFF] transition hover:bg-[#f7f9fd]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
