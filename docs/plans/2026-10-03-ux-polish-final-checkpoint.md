# UX Polish & Executive Client Experience Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement high-precision UX polish across Hero, Navbar scroll-spy, Project Modal body-locking & keyboard escape, mobile responsiveness, and AI Twin typing status, elevating the portfolio to a 10/10 executive client experience.

**Architecture:** Refine presentation components with robust browser hooks (scroll-spy with getBoundingClientRect, body scroll locking with cleanup, accessible live regions for clipboard actions, and fluid responsive wrapping). All styling maintains the dark industrial robotics design system without adding visual clutter.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Vanilla CSS, Lucide Icons, Playwright.

---

### Task 1: Hero Section Precision Typography & Accessible Clipboard Feedback

**Files:**
- Modify: `app/components/Hero.tsx`
- Modify: `app/globals.css`
- Test: `tests/blogs.spec.ts`

**Step 1: Write the failing / updated test**
Add assertions in `tests/blogs.spec.ts` verifying the accessible aria-live announcement when email is copied and verify the status badge format.

**Step 2: Run test to verify failure**
Run: `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 22 && npx playwright test tests/blogs.spec.ts`

**Step 3: Implement minimal code**
- In `Hero.tsx`, refine top pill from `Senior Engineer L1 @ FEV India` to `Senior Engineer L1 · FEV India (Humanoids & Sim-to-Real)` for uniform kerning.
- Add an invisible `<span className="sr-only" aria-live="polite">` announcing `Email copied to clipboard` when clicked.
- In `globals.css`, ensure `.hero-stack-strip` uses `flex-wrap: wrap` with clean `gap: 6px` on viewports `<420px` to guarantee zero micro-overflow on small devices.

**Step 4: Run test to verify it passes**
Run: `npx playwright test tests/blogs.spec.ts`
Expected: PASS

**Step 5: Commit**
Run: `git commit -am "feat(ux): polish hero typography, accessible email feedback, and responsive stack strip"`

---

### Task 2: Navbar Scroll-Spy & Active Section Highlighting

**Files:**
- Modify: `app/components/Navbar.tsx`
- Modify: `app/globals.css`
- Test: `tests/portfolio.spec.ts`

**Step 1: Write test for active navbar scroll spy**
Add test in `tests/portfolio.spec.ts` verifying scrolling to `#projects` or `#experience` updates active class on navbar link and handles route transitions.

**Step 2: Run test to verify**
Run: `npx playwright test tests/portfolio.spec.ts`

**Step 3: Implement Navbar active scroll tracking**
- In `Navbar.tsx`, use `getBoundingClientRect` with viewport threshold calculations instead of fragile `offsetTop`.
- If route is on `/blog` or `/blog/[slug]`, automatically set `activeSection = "blogs"`.
- When navigating from `/blog` to `/#projects`, smooth scroll after root page loads.
- Ensure active pill has clean industrial indicator (`border-bottom: 2px solid var(--accent-primary)`).

**Step 4: Run test to verify it passes**
Run: `npx playwright test tests/portfolio.spec.ts`
Expected: PASS

**Step 5: Commit**
Run: `git commit -am "feat(ux): implement reliable scroll-spy and route-aware active states in navbar"`

---

### Task 3: Project Modal Body Scroll Locking & Keyboard Accessibility

**Files:**
- Modify: `app/components/ProjectModal.tsx`
- Modify: `app/globals.css`
- Test: `tests/portfolio.spec.ts`

**Step 1: Verify modal interactions in tests**
Ensure test verifies opening modal locks background scroll and pressing `Escape` closes modal.

**Step 2: Implement modal enhancements**
- In `ProjectModal.tsx`, add `useEffect` to lock `document.body.style.overflow = "hidden"` on mount and restore on unmount.
- Add global `keydown` event listener for `Escape` key inside `ProjectModal`.
- Add subtle slide-up animation and hairline borders in `globals.css` for `.modal-content`.

**Step 3: Run test to verify**
Run: `npx playwright test tests/portfolio.spec.ts`
Expected: PASS

**Step 4: Commit**
Run: `git commit -am "feat(ux): add body scroll lock and escape listener to project modal"`

---

### Task 4: AI Twin Chat Mobile Drawer & Streaming State Polish

**Files:**
- Modify: `app/components/DigitalTwinChat.tsx`
- Modify: `app/globals.css`
- Test: `tests/digital-twin.spec.ts`

**Step 1: Write test for streaming state and mobile drawer**
Verify in `tests/digital-twin.spec.ts` that loading message displays a pulsing typing beacon and drawer handles mobile viewports.

**Step 2: Implement AI Twin UX polish**
- In `DigitalTwinChat.tsx`, refine the loading placeholder to show a sleek industrial indicator (`Synthesizing grounded answer...` with live pulse dot).
- In `globals.css`, add iOS safe area inset padding (`env(safe-area-inset-bottom)`) for the mobile drawer.
- Ensure clear chat button has confirmation tooltip or distinct subtle styling.

**Step 3: Run test to verify**
Run: `npx playwright test tests/digital-twin.spec.ts`
Expected: PASS

**Step 4: Commit**
Run: `git commit -am "feat(ux): polish AI Twin streaming state and mobile drawer viewport"`

---

### Task 5: Final Checkpoint Verification & Production Build

**Files:**
- All workspace files
- Test: Full Playwright test suite (`npx playwright test`)
- Build: `npm run build`

**Step 1: Run full automated test suite**
Run: `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 22 && npx playwright test`
Expected: 41+ passed with 0 failures

**Step 2: Run production build verification**
Run: `npm run build`
Expected: 0 errors, static generation for all routes

**Step 3: Final Git Checkpoint Commit & Status**
Run: `git status`
Verify working tree is clean.
