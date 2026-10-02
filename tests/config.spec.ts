import { test, expect } from '@playwright/test';
import { SITE_CONFIG } from '../app/lib/config';

test.describe('Centralized Site Configuration', () => {
  test('SITE_CONFIG exports valid configuration object with defaults', () => {
    expect(SITE_CONFIG).toBeDefined();
    expect(typeof SITE_CONFIG.targetEmail).toBe('string');
    expect(SITE_CONFIG.targetEmail).toContain('@');
    
    // Model configuration
    expect(typeof SITE_CONFIG.openRouterModel).toBe('string');
    expect(SITE_CONFIG.openRouterModel).toBe('openai/gpt-oss-120b');

    // Rate limits
    expect(SITE_CONFIG.rateLimits).toBeDefined();
    expect(SITE_CONFIG.rateLimits.twin.maxRequests).toBeGreaterThanOrEqual(5);
    expect(SITE_CONFIG.rateLimits.twin.windowMs).toBe(60000);
    expect(SITE_CONFIG.rateLimits.contact.maxRequests).toBeGreaterThanOrEqual(3);
    expect(SITE_CONFIG.rateLimits.contact.windowMs).toBe(60000);

    // Site URL
    expect(typeof SITE_CONFIG.siteUrl).toBe('string');
    expect(SITE_CONFIG.siteUrl).toMatch(/^https?:\/\//);
  });
});
