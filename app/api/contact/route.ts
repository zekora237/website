import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validation
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

    // Log the contact form submission
    // TODO: Replace with actual email sending (e.g., Resend, Nodemailer, SendGrid)
    console.log("📬 New contact form submission:", {
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company?.trim() || "N/A",
      message: body.message.trim(),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We will get back to you soon.",
      },
      { status: 200 }
    );
  } catch {
    console.error("Contact form error:", "Failed to process request");
    return NextResponse.json(
      { success: false, errors: ["Internal server error"] },
      { status: 500 }
    );
  }
}

