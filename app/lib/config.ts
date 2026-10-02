/**
 * Centralized site configuration and environment parameters.
 * Provides fallback defaults for local development and typed access to runtime secrets.
 */

export interface SiteConfig {
  targetEmail: string;
  openRouterModel: string;
  siteUrl: string;
  rateLimits: {
    twin: {
      maxRequests: number;
      windowMs: number;
    };
    contact: {
      maxRequests: number;
      windowMs: number;
    };
  };
}

export const SITE_CONFIG: SiteConfig = {
  // Target email for contact form and twin lead notifications
  targetEmail: process.env.TARGET_EMAIL || 'tejasphutane.work@gmail.com',

  // Default OpenRouter model for the digital twin assistant
  openRouterModel: process.env.OPENROUTER_MODEL || 'openai/gpt-oss-120b',

  // Canonical site URL for metadata and HTTP-Referer headers
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tejas-phutane-portfolio.web.app',

  // Rate limiting ceilings per IP address
  rateLimits: {
    twin: {
      maxRequests: 10, // 10 requests per minute
      windowMs: 60 * 1000,
    },
    contact: {
      maxRequests: 5, // 5 requests per minute
      windowMs: 60 * 1000,
    },
  },
};
