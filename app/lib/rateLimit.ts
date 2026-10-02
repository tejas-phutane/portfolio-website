/**
 * Lightweight, zero-dependency in-memory rate limiter for Next.js Route Handlers.
 * Designed for serverless environments with automatic cleanup of expired records.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

// Global in-memory storage across hot lambdas
const ipCache = new Map<string, RateLimitRecord>();

// Clean up stale IP records every 5 minutes to prevent unbounded memory growth
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, value] of ipCache.entries()) {
      if (now > value.resetAt) {
        ipCache.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  // Unref timer so it doesn't hold the Node.js event loop open during shutdown or tests
  if (cleanupTimer.unref) {
    cleanupTimer.unref();
  }
}

/**
 * Check if a client IP or identifier has exceeded its rate limit.
 *
 * @param identifier Client IP address or key
 * @param limit Max allowed requests within the window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const record = ipCache.get(identifier);

  if (!record || now >= record.resetAt) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + windowMs,
    };
    ipCache.set(identifier, newRecord);

    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - 1),
      reset: newRecord.resetAt,
    };
  }

  if (record.count < limit) {
    record.count++;
    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - record.count),
      reset: record.resetAt,
    };
  }

  // Limit exceeded
  return {
    success: false,
    limit,
    remaining: 0,
    reset: record.resetAt,
  };
}

/**
 * Extract client IP address from standard request headers.
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for may contain a comma-separated list of proxies: client, proxy1, proxy2
    const firstIp = forwardedFor.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return '127.0.0.1';
}
