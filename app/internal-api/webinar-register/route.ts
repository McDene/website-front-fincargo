import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Webinar registration → CRM webhook proxy.
 *
 * The browser posts the registration form here; this server route forwards it
 * to the CRM webhook with the secret token attached, so the token never leaves
 * the server. See WEBINAR_WEBHOOK.md for the CRM contract.
 *
 * The CRM is the source of truth: it logs the contact AND sends the
 * confirmation email itself, when the `seminar` value matches an email template
 * configured for that seminar (matched on name, case-insensitive/trimmed). Its
 * response carries a `queued` boolean telling us whether an email was queued,
 * which we pass back to the client.
 *
 * Env:
 *   WEBINAR_WEBHOOK_TOKEN  (required) shared secret, set in CRM Admin → Config
 *   WEBINAR_WEBHOOK_URL    (optional) defaults to the production CRM endpoint
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

    // Anti-bot: minimum fill time. Only treat as "too fast" when we have a real
    // client timestamp AND a sane positive elapsed — a missing header or clock
    // skew (negative elapsed) must NOT drop a legitimate signup. (No honeypot:
    // password managers autofill hidden fields and drop real visitors.)
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

    if (!email && !name) {
      return NextResponse.json(
        { ok: false, error: "Email or name is required" },
        { status: 400 }
      );
    }

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
    // The CRM queues the confirmation email itself when the seminar name matches
    // a configured template; surface that so the UI can be honest about it.
    const queued = isRecord(crm) ? Boolean(crm.queued) : false;
    console.log("[webinar-register] CRM ok", {
      crmStatus: crmRes.status,
      queued,
      email: email ? email.replace(/(.).+(@.*)/, "$1***$2") : null,
    });

    return NextResponse.json({ ok: true, queued, crm });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error";
    console.error(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
