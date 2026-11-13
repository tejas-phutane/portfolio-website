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
            "User-Agent": "PortfolioContactHandler/1.0",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: SITE_CONFIG.targetEmail,
            reply_to: email,
            subject: `[IMPORTANT] Portfolio Inquiry: ${subject}`,
            headers: {
              "X-Priority": "1",
              "Priority": "Urgent",
              "Importance": "high",
              "X-MSMail-Priority": "High",
            },
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #0f172a;">
                <div style="display: inline-block; padding: 4px 10px; background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 4px; font-family: monospace; font-size: 11px; font-weight: 700; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px;">
                  High Priority // Direct Portfolio Lead
                </div>
                <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px;">New Contact Submission</h2>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; width: 90px; vertical-align: top;"><strong>From:</strong></td>
                    <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Subject:</strong></td>
                    <td style="padding: 8px 0; color: #0f172a;">${subject}</td>
                  </tr>
                </table>

                <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
                  <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Message Content:</div>
                  <div style="background-color: #f8fafc; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</div>
                </div>

                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: center;">
                  Delivered automatically from tejasphutane.com contact terminal
                </div>
              </div>
            `,
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
