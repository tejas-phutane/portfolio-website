import { test, expect } from '@playwright/test';
import { checkRateLimit, getClientIp } from '../app/lib/rateLimit';

test.describe('Serverless In-Memory Rate Limiter', () => {
  test('allows requests within the limit', () => {
    const ip = '192.168.1.100';
    const limit = 3;
    const windowMs = 5000;

    const res1 = checkRateLimit(ip, limit, windowMs);
    expect(res1.success).toBe(true);
    expect(res1.remaining).toBe(2);

    const res2 = checkRateLimit(ip, limit, windowMs);
    expect(res2.success).toBe(true);
    expect(res2.remaining).toBe(1);

    const res3 = checkRateLimit(ip, limit, windowMs);
    expect(res3.success).toBe(true);
    expect(res3.remaining).toBe(0);

    // 4th request should exceed limit
    const res4 = checkRateLimit(ip, limit, windowMs);
    expect(res4.success).toBe(false);
    expect(res4.remaining).toBe(0);
    expect(res4.reset).toBeGreaterThan(Date.now());
  });

  test('isolates quotas across different identifiers', () => {
    const ipA = '10.0.0.1';
    const ipB = '10.0.0.2';
    const limit = 1;
    const windowMs = 5000;

    const resA1 = checkRateLimit(ipA, limit, windowMs);
    expect(resA1.success).toBe(true);

    const resA2 = checkRateLimit(ipA, limit, windowMs);
    expect(resA2.success).toBe(false);

    // ipB should still have quota available
    const resB1 = checkRateLimit(ipB, limit, windowMs);
    expect(resB1.success).toBe(true);
  });

  test('getClientIp extracts IP from x-forwarded-for header', () => {
    const headers = new Headers();
    headers.set('x-forwarded-for', '203.0.113.195, 70.41.3.18');
    const mockReq = { headers } as Request;

    const ip = getClientIp(mockReq);
    expect(ip).toBe('203.0.113.195');
  });

  test('getClientIp falls back to default if no header present', () => {
    const headers = new Headers();
    const mockReq = { headers } as Request;

    const ip = getClientIp(mockReq);
    expect(ip).toBe('127.0.0.1');
  });
});
