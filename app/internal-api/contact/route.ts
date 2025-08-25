import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const parseList = (v?: string): string[] =>
  (v || "")
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);

function escapeHtml(s: string): string {
  return String(s).replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        m
      ]!)
  );
}

/* ---------- type guards & helpers ---------- */
const isRecord = (val: unknown): val is Record<string, unknown> =>
  typeof val === "object" && val !== null;

const pickString = (
  obj: Record<string, unknown>,
  keys: readonly string[]
): string | undefined => {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string") return v;
  }
  return undefined;
};

const extractResendErrorMessage = (val: unknown): string | undefined => {
  if (!isRecord(val)) return undefined;
  const maybeErr = val["error"];
  if (!isRecord(maybeErr)) return undefined;
  const msg = maybeErr["message"];
  return typeof msg === "string" ? msg : undefined;
};

export async function POST(req: Request) {
  try {
    // 🔐 Garde-fous env
    const API_KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.FROM_EMAIL || "";
    const TO = parseList(process.env.CONTACT_TO);
    const CC = parseList(process.env.CONTACT_CC);
    const BCC = parseList(process.env.CONTACT_BCC);

    if (!API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }
    if (!FROM.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Invalid FROM_EMAIL" },
        { status: 500 }
      );
    }
    if (!TO.length) {
      return NextResponse.json(
        { ok: false, error: "Missing CONTACT_TO" },
        { status: 500 }
      );
    }

    const resend = new Resend(API_KEY);

    // Anti-bot
    const startedAtHeader = req.headers.get("x-started-at");
    const now = Date.now();
    const startedAt = startedAtHeader ? Number(startedAtHeader) : now;
    const elapsed = now - startedAt;

    const payloadUnknown = await req.json();
    const payload = isRecord(payloadUnknown) ? payloadUnknown : {};

    // Accepte Name/Email/... et name/email/...
    const name = pickString(payload, ["name", "Name"]);
    const email = pickString(payload, ["email", "Email"]);
    const subject = pickString(payload, ["subject", "Subject"]);
    const message = pickString(payload, ["message", "Message"]);
    const company = pickString(payload, ["company", "Company"]) ?? "";
    const phone = pickString(payload, ["phone", "Phone"]) ?? "";
    const hp = pickString(payload, ["hp", "HP"]) ?? "";

    if (hp || elapsed < 800) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const text = [
      "New contact message",
      "-------------------",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "-"}`,
      `Phone: ${phone || "-"}`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n");

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial">
        <h2>New contact message</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Company:</b> ${escapeHtml(company || "-")}</p>
        <p><b>Phone:</b> ${escapeHtml(phone || "-")}</p>
        <p><b>Subject:</b> ${escapeHtml(subject)}</p>
        <hr/>
        <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
      </div>
    `;

    // ⚠️ SDK Node → c’est `reply_to` (snake_case), pas replyTo
    const res = await resend.emails.send({
      from: FROM,
      to: TO,
      cc: CC.length ? CC : undefined,
      bcc: BCC.length ? BCC : undefined,
      subject: `[Contact] ${subject}`,
      replyTo: email,
      text,
      html,
    });

    const resendErrMsg = extractResendErrorMessage(res);
    if (resendErrMsg) {
      console.error("Resend error:", resendErrMsg);
      return NextResponse.json(
        { ok: false, error: resendErrMsg },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error";
    console.error(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
