import { NextRequest, NextResponse } from "next/server";
import { SITE_CONFIG } from "../../lib/config";
import { checkRateLimit, getClientIp } from "../../lib/rateLimit";
import { generateResumeToken } from "../../lib/resumeToken";

interface ResumeRequestBody {
  name: string;
  email: string;
  company: string;
  profile: string;
  purpose: string;
  website?: string; // honeypot
}

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // Rate limiting: max 3 requests per 10 minutes per IP
    const rateLimit = checkRateLimit(`resume_req_${clientIp}`, 3, 10 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many resume requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.reset),
          },
        }
      );
    }

    const body: ResumeRequestBody = await req.json();

    // Honeypot spam protection: bots fill hidden 'website' input
    if (body.website && body.website.trim().length > 0) {
      console.warn(`[SPAM_BLOCK] Honeypot triggered on resume request from IP: ${clientIp}`);
      return NextResponse.json({
        success: true,
        message: "Your request has been received.",
      });
    }

    const { name, email, company, profile, purpose } = body;

    // Field validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide a valid full name." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Please provide a valid professional email address." }, { status: 400 });
    }

    if (!company || company.trim().length < 2) {
      return NextResponse.json({ error: "Please specify your company or organization." }, { status: 400 });
    }

    if (!profile || profile.trim().length < 3) {
      return NextResponse.json({ error: "Please provide your LinkedIn or GitHub profile." }, { status: 400 });
    }

    const validPurposes = ["Hiring / Recruitment", "Project Collaboration", "Consulting / Advisory", "Other"];
    const safePurpose = validPurposes.includes(purpose) ? purpose : "Other";

    // Structured audit logging for telemetry and log drains
    const auditRecord = {
      event: "RESUME_REQUEST",
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      profile: profile.trim(),
      purpose: safePurpose,
      ip: clientIp,
      timestamp: new Date().toISOString(),
    };
    console.log("[RESUME_REQUEST_AUDIT]", JSON.stringify(auditRecord));

    // Optional email notification dispatch to Tejas
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Portfolio Introduction <onboarding@resend.dev>",
            to: SITE_CONFIG.targetEmail,
            subject: `Resume / Introduction Request: ${name.trim()} (${company.trim()})`,
            html: `
              <h2>New Resume / Introduction Request</h2>
              <p><strong>Name:</strong> ${name.trim()}</p>
              <p><strong>Email:</strong> ${email.trim()}</p>
              <p><strong>Company / Org:</strong> ${company.trim()}</p>
              <p><strong>Profile:</strong> <a href="${profile.trim()}">${profile.trim()}</a></p>
              <p><strong>Intended Purpose:</strong> ${safePurpose}</p>
              <p><strong>Client IP:</strong> ${clientIp}</p>
              <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            `,
          }),
        });
      } catch (err) {
        console.error("[RESEND_ERROR] Failed to send resume request notification:", err);
      }
    }

    // Generate secure 15-minute time-limited HMAC download token
    const token = generateResumeToken(email, safePurpose);

    return NextResponse.json({
      success: true,
      downloadUrl: `/api/resume-download?token=${token}`,
      message: "Resume request approved. Your secure download link is ready.",
    });
  } catch (error) {
    console.error("[RESUME_REQUEST_ERROR]", error);
    return NextResponse.json({ error: "Internal server error processing request." }, { status: 500 });
  }
}