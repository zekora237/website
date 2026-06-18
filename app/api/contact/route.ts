import { NextRequest, NextResponse } from "next/server";
import { BRAND } from "@/lib/config";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

// Where contact-form submissions are delivered (single source of truth: lib/config).
const RECIPIENT = BRAND.email;
// Sender identity. Must be an address on a domain VERIFIED in Resend
// (verify zekoratech.com in Resend, then it can send as noreply@zekoratech.com).
// Override per-environment with RESEND_FROM if you use a different sender.
const FROM = process.env.RESEND_FROM || `Zekora Website <noreply@${BRAND.domain}>`;

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // ── Validation ──────────────────────────────────
    const errors: string[] = [];

    if (!body.name || body.name.trim().length === 0) {
      errors.push("Name is required");
    }

    if (!body.email || body.email.trim().length === 0) {
      errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      errors.push("Invalid email address");
    }

    if (!body.message || body.message.trim().length < 10) {
      errors.push("Message must be at least 10 characters");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // ── Build the email ─────────────────────────────
    const name = body.name.trim();
    const email = body.email.trim();
    const company = body.company?.trim() || "N/A";
    const message = body.message.trim();
    const timestamp = new Date().toLocaleString("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9fafb;border-radius:12px;">
        <h2 style="color:#1F3C88;margin:0 0 20px;">📬 New Contact Form Submission</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;width:120px;">Name</td>
            <td style="padding:10px 12px;color:#111827;border-bottom:1px solid #e5e7eb;">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;">Email</td>
            <td style="padding:10px 12px;color:#111827;border-bottom:1px solid #e5e7eb;">
              <a href="mailto:${email}" style="color:#1F3C88;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;">Company</td>
            <td style="padding:10px 12px;color:#111827;border-bottom:1px solid #e5e7eb;">${company}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#374151;vertical-align:top;">Message</td>
            <td style="padding:10px 12px;color:#111827;white-space:pre-wrap;">${message}</td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">Received on ${timestamp}</p>
      </div>
    `;

    // ── Send via Resend API ─────────────────────────
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      console.error("❌ RESEND_API_KEY is not set in environment variables.");
      return NextResponse.json(
        { success: false, errors: ["Email service is not configured. Please contact us directly at " + RECIPIENT] },
        { status: 503 }
      );
    }

    console.log("📧 Sending email via Resend… (key starts with:", resendKey.substring(0, 6) + "…)");

    const payload = {
      from: FROM,
      to: [RECIPIENT],
      reply_to: email,
      subject: `[Zekora] New message from ${name}`,
      html: htmlBody,
    };

    let resendRes: Response;
    try {
      resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify(payload),
      });
    } catch (fetchErr) {
      console.error("❌ Failed to reach Resend API:", fetchErr);
      return NextResponse.json(
        { success: false, errors: ["Could not connect to email service. Please try again later."] },
        { status: 502 }
      );
    }

    const resendBody = await resendRes.text();
    console.log("Resend response:", resendRes.status, resendBody);

    if (!resendRes.ok) {
      console.error("Resend API error:", resendRes.status, resendBody);
      let detail = "Failed to send email. Please try again later.";
      try {
        const parsed = JSON.parse(resendBody);
        if (parsed.message) detail = parsed.message;
      } catch { /* use default */ }
      return NextResponse.json(
        { success: false, errors: [detail] },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Your message has been sent. We'll get back to you soon!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, errors: ["Internal server error"] },
      { status: 500 }
    );
  }
}
