# Custom Local Portfolio Studio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a private, bespoke, no-code local visual studio (`/studio`) that allows editing projects, experience, services, bio, AI Twin memory, and uploading project images directly through a modern GUI without touching code.

**Architecture:** Decouple hardcoded component data into structured JSON files under `content/data/`. Implement local server-side API endpoints (`/api/studio/content` and `/api/studio/upload`) guarded to run strictly in development mode (`process.env.NODE_ENV === 'development'`). Build a tabbed, Titanium-styled dashboard at `app/studio/page.tsx` with forms for each section, drag-and-drop image uploads directly into `public/images/`, and instant live preview.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Lucide Icons, Vanilla CSS Design System, Playwright E2E testing.

---

## Task Breakdown

### Task 1: Decouple Component Data into Structured JSON Files
**Files:**
- Create: `content/data/projects.json`
- Create: `content/data/experience.json`
- Create: `content/data/services.json`
- Create: `content/data/about.json`
- Create: `app/lib/content.ts`
- Test: `tests/content.spec.ts`

**Step 1: Write failing test for content loader**
Create `tests/content.spec.ts` to verify that `getContentData()` properly exports typed structures for `projects`, `experience`, `services`, and `about`, and validates required properties (title, id, role, metric, etc.).

**Step 2: Run test to verify it fails**
Run: `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 22 && npx playwright test tests/content.spec.ts`
Expected: FAIL ("Cannot find module '../app/lib/content'")

**Step 3: Extract and create JSON files**
- Migrate data from `Projects.tsx` to `content/data/projects.json`.
- Migrate data from `Experience.tsx` to `content/data/experience.json`.
- Migrate data from `Services.tsx` to `content/data/services.json`.
- Migrate bio and highlights from `About.tsx` to `content/data/about.json`.
- Implement `app/lib/content.ts` with typed getter functions and safe fallbacks.

**Step 4: Update components to consume `content.ts`**
- Refactor `Projects.tsx`, `Experience.tsx`, `Services.tsx`, and `About.tsx` to read from the JSON files via `content.ts`.

**Step 5: Run tests to verify pass**
Run: `npx playwright test tests/content.spec.ts tests/portfolio.spec.ts`
Expected: PASS

**Step 6: Commit**
`git add content/data/ app/lib/content.ts app/components/ tests/content.spec.ts && git commit -m "refactor: extract portfolio content to structured JSON files"`

---

### Task 2: Implement Local Studio API Routes (Content & Image Upload)
**Files:**
- Create: `app/api/studio/content/route.ts`
- Create: `app/api/studio/upload/route.ts`
- Test: `tests/studio-api.spec.ts`

**Step 1: Write failing test for Studio API**
Create `tests/studio-api.spec.ts` testing:
- GET `/api/studio/content` returns all sections.
- POST `/api/studio/content` updates a specific section file on disk.
- POST `/api/studio/upload` saves uploaded image to `public/images/` and returns the public path.
- Production guard: Endpoints return 403 or 404 if `NODE_ENV === 'production'`.

**Step 2: Run test to verify it fails**
Run: `npx playwright test tests/studio-api.spec.ts`
Expected: FAIL (404 / Route not found)

**Step 3: Implement `/api/studio/content/route.ts`**
- `GET`: Read `projects.json`, `experience.json`, `services.json`, `about.json`, and `twinContext.ts`.
- `POST`: Validate request body, write updated JSON formatted with 2-space indentation to `content/data/<section>.json`.
- Add development-only security check: reject requests if `process.env.NODE_ENV === 'production'`.

**Step 4: Implement `/api/studio/upload/route.ts`**
- Handle `multipart/form-data` with `req.formData()`.
- Validate file type (png, jpg, jpeg, webp, gif, svg).
- Sanitize filename and save to `path.join(process.cwd(), 'public', 'images', filename)`.
- Return `{ success: true, url: "/images/<filename>" }`.

**Step 5: Run test to verify pass**
Run: `npx playwright test tests/studio-api.spec.ts`
Expected: PASS

**Step 6: Commit**
`git add app/api/studio/ tests/studio-api.spec.ts && git commit -m "feat: add studio content persistence and image upload API routes"`

---

### Task 3: Build the Studio Dashboard UI (`app/studio/page.tsx`)
**Files:**
- Create: `app/studio/page.tsx`
- Create: `app/studio/studio.css`
- Modify: `app/components/Navbar.tsx` (add dev-only Studio link in development)
- Test: `tests/studio-ui.spec.ts`

**Step 1: Write failing test for Studio UI**
Create `tests/studio-ui.spec.ts` checking:
- `/studio` renders the dashboard with tab navigation (Projects, Experience, Services, About, AI Twin).
- Switching tabs displays the respective section forms.
- Adding a project form validation and input fields.

**Step 2: Run test to verify it fails**
Run: `npx playwright test tests/studio-ui.spec.ts`
Expected: FAIL ("Cannot find /studio")

**Step 3: Implement `app/studio/page.tsx` and sub-views**
- Build top navigation bar: Title, Environment indicator ("Local Dev Studio"), "Preview Portfolio" link, and "Save Changes" button.
- Tab 1: **Projects Editor**
  - List of existing projects with drag/reorder or move up/down.
  - Form: Title, Category (dropdown), Status badge, Context (company/event), Image preview + "Upload New Image" button, Summary, Problem, Approach, Implementation list items, Results metrics, Tech Stack tags.
  - "Add New Project" button generating a blank template.
  - "Delete Project" button with confirmation.
- Tab 2: **Experience Editor**
  - List of positions with "Current Role" toggle.
  - Role, Company, Location, Date range, Description.
  - Key achievements (Metric + Text) repeater.
  - Skill tags repeater.
- Tab 3: **Services Editor**
  - List of services.
  - Icon selector (Cog, Eye, Layers, Bot, Cpu, Users, Mic, Code, Zap).
  - Title & Description.
- Tab 4: **About & Bio Editor**
  - Narrative paragraphs textarea.
  - Education & Status highlight cards editor.
  - "What I'm Exploring" cards editor.
- Tab 5: **AI Digital Twin Memory**
  - Direct editor for the twin's context points (synced with `twinContext.ts`).

**Step 4: Implement `app/studio/studio.css`**
- Styled using your existing Precision Titanium & Cobalt design system tokens (`--bg-base`, `--bg-card`, `--accent-primary`, etc.).

**Step 5: Run tests to verify pass**
Run: `npx playwright test tests/studio-ui.spec.ts`
Expected: PASS

**Step 6: Commit**
`git add app/studio/ tests/studio-ui.spec.ts && git commit -m "feat: build bespoke local portfolio studio visual editor"`

---

### Task 4: End-to-End Visual Workflow Verification & Documentation
**Files:**
- Create: `tests/studio-e2e.spec.ts`
- Modify: `README.md` (add Studio user guide)

**Step 1: Write E2E test verifying full edit cycle**
- Open `/studio`.
- Add a test project with image path.
- Click "Save Changes".
- Navigate to `/` (homepage) and assert that the new project is visible in the Projects grid and modal opens with details.
- Clean up test project.

**Step 2: Run complete test suite**
Run: `npx playwright test`
Expected: 100% test pass rate across all suites.

**Step 3: Document Local Studio in `README.md`**
- Document how to launch: `npm run dev` → visit `http://localhost:3000/studio`.
- Explain how images are uploaded and how changes are committed to Git.

**Step 4: Commit**
`git add tests/studio-e2e.spec.ts README.md && git commit -m "docs: document local studio workflow and add full E2E test"`
