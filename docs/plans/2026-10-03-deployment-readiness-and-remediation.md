# Deployment Readiness & Remediation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Resolve all architectural, security, performance, and code quality shortcomings identified in `review.md`, harden serverless handlers for Vercel deployment, verify with comprehensive test suites, and update `review.md`.

**Architecture:** Refactor serverless API routes (`/api/twin` and `/api/contact`) with an in-memory IP rate-limiter and serverless-safe data persistence (structured logging + Vercel-safe fallback). Decouple `app/page.tsx` from `"use client"` to restore Server-Side Rendering (SSR) and SEO performance. Centralize environment configs, eliminate TypeScript `any` types, restrict external image domains, and re-run all test suites and production builds.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Playwright, OpenRouter API, Node.js Runtime.

---

## Task Breakdown

### Task 1: Centralized Configuration Engine
**Files:**
- Create: `app/lib/config.ts`
- Test: `tests/config.spec.ts`

**Step 1: Write the failing test**
Create `tests/config.spec.ts` testing configuration defaults, fallback values, and environment variable overrides for target email, default AI model, and rate limit ceilings.

**Step 2: Run test to verify it fails**
Run: `npx playwright test tests/config.spec.ts`
Expected: FAIL ("Cannot find module '../app/lib/config'")

**Step 3: Implement `app/lib/config.ts`**
Export `SITE_CONFIG` with typed values:
- `targetEmail`: `process.env.TARGET_EMAIL || 'tejasphutane.work@gmail.com'`
- `openRouterModel`: `process.env.OPENROUTER_MODEL || 'openai/gpt-oss-120b'`
- `rateLimits`: twin (10 requests/minute), contact (5 requests/minute)
- `siteUrl`: `process.env.NEXT_PUBLIC_SITE_URL || 'https://tejas-phutane-portfolio.web.app'`

**Step 4: Run test to verify it passes**
Run: `npx playwright test tests/config.spec.ts`
Expected: PASS

**Step 5: Commit**
`git add app/lib/config.ts tests/config.spec.ts && git commit -m "feat: add centralized site configuration engine"`

---

### Task 2: Serverless In-Memory Rate Limiting
**Files:**
- Create: `app/lib/rateLimit.ts`
- Test: `tests/rate-limit.spec.ts`

**Step 1: Write the failing test**
Create `tests/rate-limit.spec.ts` verifying that:
- Requests under the limit return `success: true` and appropriate remaining quota.
- Requests exceeding the limit return `success: false` and reset timestamps.
- Differentiates requests based on client identifier (IP address).

**Step 2: Run test to verify it fails**
Run: `npx playwright test tests/rate-limit.spec.ts`
Expected: FAIL ("Cannot find module '../app/lib/rateLimit'")

**Step 3: Implement `app/lib/rateLimit.ts`**
Create a token-bucket / sliding-window rate limiter:
- Stores token counts and reset windows in an in-memory Map with automatic periodic cleanup of stale entries.
- Helper function `checkRateLimit(identifier: string, limit: number, windowMs: number)` returning `{ success: boolean, limit: number, remaining: number, reset: number }`.
- Helper `getClientIp(req: Request | NextRequest)` extracting IP from `x-forwarded-for`, `x-real-ip`, or fallback.

**Step 4: Run test to verify it passes**
Run: `npx playwright test tests/rate-limit.spec.ts`
Expected: PASS

**Step 5: Commit**
`git add app/lib/rateLimit.ts tests/rate-limit.spec.ts && git commit -m "feat: add serverless-compatible rate limiter"`

---

### Task 3: Vercel-Safe Serverless Telemetry & Leads Persistence
**Files:**
- Modify: `app/lib/twinTools.ts`
- Test: `tests/twin-context.spec.ts`

**Step 1: Write tests for graceful filesystem degradation**
In `tests/twin-context.spec.ts`, add test cases asserting that `recordUserDetails` and `recordUnknownQuestion` execute cleanly without throwing errors even if disk access is unavailable or read-only.

**Step 2: Update `app/lib/twinTools.ts`**
- Check if disk environment is writable; wrap file operations in `try/catch` with fallback to `/tmp` directory or structured console logging (`[LEAD_AUDIT]` and `[QUESTION_AUDIT]`).
- On Vercel, emit structured JSON log entries which are automatically preserved in Vercel Log Drains / Runtime Observability.
- Utilize `SITE_CONFIG.targetEmail` from `app/lib/config.ts` for Resend forwarding.
- Remove `any` types and provide full TypeScript typing for tool arguments and results.

**Step 3: Run tests to verify**
Run: `npx playwright test tests/twin-context.spec.ts`
Expected: PASS

**Step 4: Commit**
`git add app/lib/twinTools.ts tests/twin-context.spec.ts && git commit -m "fix: harden twin tools for serverless read-only filesystems"`

---

### Task 4: Rate Limiting & TypeScript Hardening in API Routes
**Files:**
- Modify: `app/api/twin/route.ts`
- Modify: `app/api/contact/route.ts`
- Test: `tests/digital-twin.spec.ts`

**Step 1: Integrate Rate Limiting & Type Safety into `/api/twin/route.ts`**
- Apply `checkRateLimit` at the start of `POST`. If rate limit is exceeded, return status 429 with informative response headers (`X-RateLimit-*`).
- Replace `any` in error handling (`catch (error: unknown)`) with proper type narrowing (`error instanceof Error ? error.message : 'Unknown error'`).
- Define strict OpenRouter response interfaces (`OpenRouterResponse`, `OpenRouterToolCall`, etc.).
- Use `SITE_CONFIG.openRouterModel` and `SITE_CONFIG.targetEmail`.

**Step 2: Integrate Rate Limiting into `/api/contact/route.ts`**
- Apply `checkRateLimit` (5 requests/minute).
- Use `SITE_CONFIG.targetEmail`.
- Safe error handling without `any`.

**Step 3: Run existing E2E tests**
Run: `npx playwright test tests/digital-twin.spec.ts`
Expected: PASS (all 16 tests passing)

**Step 4: Commit**
`git add app/api/twin/route.ts app/api/contact/route.ts && git commit -m "feat: add rate limiting and strict typing to API routes"`

---

### Task 5: SSR Optimization & Metadata (Remove `"use client"` from `page.tsx`)
**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx` (verify metadata and viewport)

**Step 1: Remove `"use client"` from `app/page.tsx`**
- Convert `app/page.tsx` to a Server Component by deleting `"use client";` from line 1.
- Verify that all interactive children (`Navbar`, `ParticleBg`, `Hero`, `About`, `Skills`, `Experience`, `Projects`, `Services`, `Contact`, `Footer`, `DigitalTwinChat`) continue to render seamlessly.
- Verify SEO metadata and OpenGraph tags in `app/layout.tsx`.

**Step 2: Run all Playwright tests**
Run: `npx playwright test tests/portfolio.spec.ts tests/digital-twin.spec.ts`
Expected: PASS (all modal interactions, drawer, navigation, and portfolio sections pass)

**Step 3: Commit**
`git add app/page.tsx app/layout.tsx && git commit -m "perf: convert page.tsx to server component for SSR and SEO optimization"`

---

### Task 6: Restrict Image Domains in `next.config.ts`
**Files:**
- Modify: `next.config.ts`

**Step 1: Restrict `remotePatterns`**
- Replace wildcard `hostname: "**"` with specific allowed domains (`images.unsplash.com`, `raw.githubusercontent.com`, `avatars.githubusercontent.com`, `media.licdn.com`) and local asset patterns.

**Step 2: Build verification**
Run: `npm run build`
Expected: Successful Turbopack production build with zero warnings or type errors.

**Step 3: Commit**
`git add next.config.ts && git commit -m "security: restrict remote image domains in next.config.ts"`

---

### Task 7: Full System Verification & Review Document Update
**Files:**
- Modify: `review.md`

**Step 1: Execute complete test suite**
Run: `npx playwright test`
Expected: 100% test pass rate across all suites (`portfolio.spec.ts`, `digital-twin.spec.ts`, `twin-context.spec.ts`, `rate-limit.spec.ts`, `config.spec.ts`).

**Step 2: Run production bundle build**
Run: `npm run build`
Expected: Build passes with green status.

**Step 3: Update `review.md`**
Update `review.md` to:
- Document each resolved finding with its implementation details.
- Provide a before/after status matrix.
- Certify the project as **Deployment Ready** for Vercel with zero critical blockers.

**Step 4: Commit**
`git add review.md && git commit -m "docs: update review.md with remediation results and deployment certification"`
