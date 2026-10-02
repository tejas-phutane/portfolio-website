import { NextResponse } from "next/server";
import { SITE_CONFIG } from "../../lib/config";
import { checkRateLimit, getClientIp } from "../../lib/rateLimit";

interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(
      clientIp,
      SITE_CONFIG.rateLimits.contact.maxRequests,
      SITE_CONFIG.rateLimits.contact.windowMs
    );

    const rateLimitHeaders = {
      'X-RateLimit-Limit': String(rateLimit.limit),
      'X-RateLimit-Remaining': String(rateLimit.remaining),
      'X-RateLimit-Reset': String(rateLimit.reset),
    };

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a minute before submitting again.",
        },
        { status: 429, headers: rateLimitHeaders }
      );
    }

    const body = (await request.json()) as ContactRequestBody;
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    console.log(`[Contact Form Submission]
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`);

    if (process.env.RESEND_API_KEY) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: SITE_CONFIG.targetEmail,
            reply_to: email,
            subject: `Portfolio: ${subject}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Subject:</strong> ${subject}</p>
                   <p><strong>Message:</strong></p>
                   <p>${message.replace(/\n/g, "<br>")}</p>`,
          }),
        });

        if (response.ok) {
          return NextResponse.json(
            { success: true, message: "Message sent successfully!" },
            { headers: rateLimitHeaders }
          );
        } else {
          const errorData = await response.json();
          console.error("Resend API error response:", errorData);
        }
      } catch (error) {
        console.error("Error sending email via Resend API:", error);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message received! (Configure RESEND_API_KEY in Vercel to receive email forwards)",
      },
      { headers: rateLimitHeaders }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error processing contact form:", errorMsg);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
