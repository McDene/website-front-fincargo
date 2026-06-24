import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/**
 * Webinar registration handler.
 *
 * 1. Forwards the registration to the CRM webhook with the secret token
 *    attached server-side (browser never sees the token).
 * 2. Best-effort: emails the registrant a confirmation via Resend.
 *
 * The CRM step is the source of truth — if the confirmation email fails, the
 * registration still succeeds. See WEBINAR_WEBHOOK.md for the CRM contract.
 *
 * Env:
 *   WEBINAR_WEBHOOK_TOKEN  (required) shared secret, set in CRM Admin → Config
 *   WEBINAR_WEBHOOK_URL    (optional) defaults to the production CRM endpoint
 *   RESEND_API_KEY         (optional) enables the confirmation email
 *   FROM_EMAIL             (optional) sender for the confirmation email
 */
const DEFAULT_CRM_URL = "https://crm.fincargo.ai/webhooks/webinar-signup";

const isRecord = (val: unknown): val is Record<string, unknown> =>
  typeof val === "object" && val !== null;

const pickString = (
  obj: Record<string, unknown>,
  keys: readonly string[]
): string | undefined => {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
};

function escapeHtml(s: string): string {
  return String(s).replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        m
      ]!)
  );
}

type Calendar = {
  title: string;
  start: string; // e.g. 20260716T100000Z
  end: string;
  startLocal?: string;
  endLocal?: string;
  location: string;
  details: string;
};

const isCalendar = (v: unknown): v is Calendar =>
  isRecord(v) &&
  typeof v.title === "string" &&
  typeof v.start === "string" &&
  typeof v.end === "string";

function buildIcs(cal: Calendar): string {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fincargo//Webinars//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:webinar-${cal.start}@fincargo.ai`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${cal.start}`,
    `DTEND:${cal.end}`,
    `SUMMARY:${cal.title}`,
    `DESCRIPTION:${cal.details}`,
    `LOCATION:${cal.location}`,
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
}

function buildGoogleHref(cal: Calendar): string {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: cal.title,
    dates: `${cal.start}/${cal.end}`,
    details: cal.details,
    location: cal.location,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

function confirmationHtml(opts: {
  name?: string;
  seminar: string;
  when: string;
  googleHref?: string;
}): string {
  const hi = opts.name ? `Hi ${escapeHtml(opts.name.split(" ")[0])},` : "Hi,";
  const calBtn = opts.googleHref
    ? `<tr><td style="padding-top:8px">
         <a href="${opts.googleHref}" style="display:inline-block;background:#5E8CFF;color:#fff;font-weight:700;font-size:14px;text-decoration:none;padding:11px 20px;border-radius:10px">Add to Google Calendar</a>
       </td></tr>`
    : "";
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0E1E3A">
    <div style="background:linear-gradient(150deg,#0E1E3A,#1d3357);color:#fff;padding:28px 28px 22px;border-radius:14px 14px 0 0">
      <div style="font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#7fa0ff">Fincargo Webinars</div>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:800">Your seat is confirmed 🎫</h1>
    </div>
    <div style="border:1px solid #e6eaf3;border-top:none;border-radius:0 0 14px 14px;padding:26px 28px">
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6">${hi}</p>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6">You're registered for:</p>
      <table style="width:100%;border-collapse:collapse;background:#f7f9fd;border:1px solid #e1e8f7;border-radius:10px">
        <tr><td style="padding:16px 18px">
          <div style="font-size:16px;font-weight:800;color:#0E1E3A">${escapeHtml(opts.seminar)}</div>
          <div style="margin-top:6px;font-size:14px;font-weight:700;color:#3a465e">🗓️ ${escapeHtml(opts.when)}</div>
          <div style="margin-top:4px;font-size:13px;color:#8794ac">Online · the join link follows before the session.</div>
          ${calBtn}
        </td></tr>
      </table>
      <p style="margin:20px 0 0;font-size:14px;line-height:1.6;color:#3a465e">A calendar invite (.ics) is attached. We look forward to seeing you there.</p>
      <p style="margin:18px 0 0;font-size:13px;color:#8794ac">Questions? Just reply to this email or write to contact@fincargo.ai.</p>
    </div>
  </div>`;
}

export async function POST(req: Request) {
  try {
    const TOKEN = process.env.WEBINAR_WEBHOOK_TOKEN;
    const CRM_URL = process.env.WEBINAR_WEBHOOK_URL || DEFAULT_CRM_URL;

    if (!TOKEN) {
      return NextResponse.json(
        { ok: false, error: "Missing WEBINAR_WEBHOOK_TOKEN" },
        { status: 500 }
      );
    }

    // Anti-bot: honeypot field + minimum fill time (mirrors /internal-api/contact)
    const startedAtHeader = req.headers.get("x-started-at");
    const now = Date.now();
    const startedAt = startedAtHeader ? Number(startedAtHeader) : now;
    const elapsed = now - startedAt;

    const payloadUnknown = await req.json().catch(() => null);
    if (!isRecord(payloadUnknown)) {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON" },
        { status: 400 }
      );
    }
    const payload = payloadUnknown;

    // Only treat as "too fast" when we have a real client timestamp AND a sane
    // positive elapsed — a missing header or clock skew (negative elapsed) must
    // NOT drop a legitimate signup. (No honeypot: password managers autofill
    // hidden fields and silently drop real visitors.)
    const tooFast =
      !!startedAtHeader &&
      Number.isFinite(elapsed) &&
      elapsed > 0 &&
      elapsed < 800;
    if (tooFast) {
      console.warn("[webinar-register] dropped as bot (too fast)", { elapsed });
      return NextResponse.json({ ok: true, dropped: "bot" });
    }

    const name = pickString(payload, ["name", "full_name", "fullName"]);
    const email = pickString(payload, ["email", "email_address"]);
    const company = pickString(payload, [
      "company",
      "organisation",
      "organization",
    ]);
    // "profile" is the supply-chain persona (Shipper / Forwarder / ...); the CRM
    // has no dedicated persona field, so it rides along in the job-title slot.
    const profile = pickString(payload, ["profile", "title", "role"]);
    const phone = pickString(payload, ["phone", "telephone", "phone_number"]);
    const seminar = pickString(payload, ["seminar", "webinar", "event"]);
    const seminarDate = pickString(payload, [
      "seminar_date",
      "webinar_date",
      "event_date",
      "date",
    ]);
    const when = pickString(payload, ["when", "when_label"]);
    const calendar = isCalendar(payload.calendar) ? payload.calendar : undefined;

    if (!email && !name) {
      return NextResponse.json(
        { ok: false, error: "Email or name is required" },
        { status: 400 }
      );
    }

    // 1) Log to CRM (source of truth) ----------------------------------------
    const crmRes = await fetch(CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        name,
        email,
        company,
        title: profile,
        phone,
        seminar,
        seminar_date: seminarDate,
      }),
    });

    if (!crmRes.ok) {
      const detail = await crmRes.text().catch(() => "");
      console.error("CRM webinar webhook error:", crmRes.status, detail);
      return NextResponse.json(
        { ok: false, error: `CRM rejected the request (${crmRes.status})` },
        { status: 502 }
      );
    }

    const crm: unknown = await crmRes.json().catch(() => ({}));
    console.log("[webinar-register] CRM ok", {
      crmStatus: crmRes.status,
      email: email ? email.replace(/(.).+(@.*)/, "$1***$2") : null,
    });

    // 2) Confirmation email (best-effort — never fails the registration) ------
    let emailed = false;
    const RESEND_KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.FROM_EMAIL || "";
    if (email && RESEND_KEY && FROM.includes("@")) {
      try {
        const resend = new Resend(RESEND_KEY);
        const subj = seminar
          ? `You're registered: ${seminar}`
          : "Your Fincargo webinar registration";
        const whenLabel = when || seminarDate || "";
        const googleHref = calendar ? buildGoogleHref(calendar) : undefined;
        const attachments = calendar
          ? [
              {
                filename: "Fincargo-Webinar.ics",
                content: Buffer.from(buildIcs(calendar), "utf8").toString(
                  "base64"
                ),
              },
            ]
          : undefined;

        const sendRes = await resend.emails.send({
          from: FROM,
          to: email,
          replyTo: "contact@fincargo.ai",
          subject: subj,
          html: confirmationHtml({
            name,
            seminar: seminar || "Fincargo webinar",
            when: whenLabel,
            googleHref,
          }),
          attachments,
        });
        if (isRecord(sendRes) && isRecord(sendRes.error)) {
          console.error("Confirmation email error:", sendRes.error);
        } else {
          emailed = true;
        }
      } catch (mailErr) {
        console.error("Confirmation email threw:", mailErr);
      }
    }

    return NextResponse.json({ ok: true, emailed, crm });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error";
    console.error(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
