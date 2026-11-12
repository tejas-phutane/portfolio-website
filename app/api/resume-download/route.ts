import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { checkRateLimit, getClientIp } from "../../lib/rateLimit";
import { verifyResumeToken } from "../../lib/resumeToken";

export async function GET(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // Rate limiting: max 5 downloads per 10 minutes per IP
    const rateLimit = checkRateLimit(`resume_dl_${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many download attempts. Please try again later." },
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

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Missing authorization token. Please submit a resume request." },
        { status: 401 }
      );
    }

    const verification = verifyResumeToken(token);
    if (!verification.valid) {
      return NextResponse.json(
        { error: "Invalid or expired resume download link. Links expire after 15 minutes." },
        { status: 403 }
      );
    }

    // Locate the internal gated resume PDF
    const resumePath = path.join(process.cwd(), "content", "data", "resume-public.pdf");

    let fileBuffer: Buffer | null = null;
    try {
      fileBuffer = await fs.readFile(resumePath);
    } catch {
      fileBuffer = null;
    }

    if (!fileBuffer) {
      console.error("[RESUME_DOWNLOAD_ERROR] Resume file not found on disk");
      return NextResponse.json({ error: "Resume file temporarily unavailable." }, { status: 404 });
    }

    console.log(
      "[RESUME_DOWNLOAD_SUCCESS]",
      JSON.stringify({
        email: verification.email,
        ip: clientIp,
        timestamp: new Date().toISOString(),
      })
    );

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Tejas_Phutane_Resume.pdf"',
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("[RESUME_DOWNLOAD_ERROR]", error);
    return NextResponse.json({ error: "Internal server error downloading resume." }, { status: 500 });
  }
}