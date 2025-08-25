import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const parseList = (v?: string) =>
  (v || "")
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);

function escapeHtml(s: string) {
  return String(s).replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        m
      ]!)
  );
}

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

    const payload = await req.json();

    // Accepte Name/Email/... et name/email/...
    const name = payload.name ?? payload.Name;
    const email = payload.email ?? payload.Email;
    const subject = payload.subject ?? payload.Subject;
    const message = payload.message ?? payload.Message;
    const company = payload.company ?? payload.Company ?? "";
    const phone = payload.phone ?? payload.Phone ?? "";
    const hp = payload.hp ?? payload.HP ?? "";

    if (hp || elapsed < 800) return NextResponse.json({ ok: true });

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
      reply_to: email,
      text,
      html,
    });

    // 🩺 remonter l'erreur exacte en dev
    if ((res as any)?.error) {
      const err = (res as any).error;
      console.error("Resend error:", err);
      return NextResponse.json(
        { ok: false, error: err?.message || "Send error" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
