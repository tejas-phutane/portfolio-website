import crypto from "crypto";

const SECRET = process.env.TOKEN_SECRET || process.env.RESEND_API_KEY || "tejas-portfolio-resume-salt-2026";
const EXPIRATION_MS = 15 * 60 * 1000; // 15 minutes

export function generateResumeToken(email: string, purpose: string): string {
  const expiresAt = Date.now() + EXPIRATION_MS;
  const nonce = crypto.randomBytes(8).toString("hex");
  const payload = `${email.trim().toLowerCase()}:${expiresAt}:${purpose}:${nonce}`;
  const signature = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export function verifyResumeToken(token: string): { valid: boolean; email?: string } {
  try {
    if (!token || typeof token !== "string") return { valid: false };
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length !== 5) return { valid: false };

    const [email, expiresAtStr, purpose, nonce, signature] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return { valid: false };
    }

    const payload = `${email}:${expiresAt}:${purpose}:${nonce}`;
    const expectedSig = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return { valid: false };
    }

    return { valid: true, email };
  } catch {
    return { valid: false };
  }
}