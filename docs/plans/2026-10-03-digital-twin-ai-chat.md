# Digital Twin AI Chat Assistant Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate an interactive, intelligent "Digital Twin" AI chat assistant into Tejas's portfolio website that answers career, technical, and personal robotics questions, powered by OpenRouter (`openai/gpt-oss-120b`), equipped with agent tools for lead capture and telemetry, and styled to match the Precision Titanium design system.

**Architecture:** Next.js App Router Serverless API (`/api/twin/route.ts`) executing an agentic tool-calling loop with OpenRouter API, connected to an interactive frontend chat drawer (`DigitalTwinChat.tsx`) with floating launcher, suggestion chips, and markdown rendering. The twin is grounded with a rich system prompt containing Tejas's resume, FEV India Unitree G1 work, Gujarat Science City exhibits, DRDO/ADA defense projects, and personal enthusiast anecdotes.

**Tech Stack:** Next.js 16 (App Router), TypeScript, OpenRouter API (`openai/gpt-oss-120b`), Playwright E2E testing, Precision Titanium design tokens.

---

## 0. Vercel Platform Secrets Configuration (GitHub Integration)

Since this repository is automatically deployed to Vercel via GitHub:
1. **Never commit API keys to Git**: All keys remain strictly in `.env.local` (local development) and in Vercel's encrypted vault.
2. **Add to Vercel Project Dashboard**:
   - Go to [vercel.com](https://vercel.com) → Your Project (`portfolio-website`) → **Settings** → **Environment Variables**.
   - Add Variable:
     - **Key**: `OPENROUTER_API_KEY`
     - **Value**: `sk-or-v1-...`
     - **Environments**: Select **Production**, **Preview**, and **Development**.
   - Add Optional Variable:
     - **Key**: `OPENROUTER_MODEL`
     - **Value**: `openai/gpt-oss-120b` (allows hot-swapping models without redeploying code).
3. **Serverless Execution Security**:
   - Next.js server route (`app/api/twin/route.ts`) runs as a Vercel Serverless Function (Node.js runtime).
   - Only the server reads `process.env.OPENROUTER_API_KEY`; the key is never sent to the client browser.

---

## 0.1 UI Framework Assessment: `@assistant-ui/react` vs Bespoke Precision UI

The user asked if `@assistant-ui/react` can be used:
- **`@assistant-ui/react` Analysis**:
  - Peer dependencies: Compatible with React 19 (`^18 || ^19`).
  - Bundle footprint: Adds 141 transitive dependencies (entire Radix UI suite, `@floating-ui`, `zustand`, etc.).
  - Styling: Designed around Tailwind CSS; integrating into our Vanilla CSS design system requires overriding multiple CSS layers.
- **Recommended Approach**:
  - Implement a **bespoke, high-performance Chat Drawer** (`DigitalTwinChat.tsx`) built directly with our existing **Precision Cobalt & Titanium Slate design tokens** in `app/globals.css`.
  - Zero added bundle bloat, instant 60fps animations, native tool execution badges, and seamless visual unity with the rest of the website.
  - Architecture is decoupled so that if `@assistant-ui/react` is preferred in a future release, the `/api/twin` route remains 100% compatible.

---

## Reference Architecture (From `twin/` Project)
The digital twin pattern from `/home/tejas/Robotics_dev_hub/Agentic_ai/projects/agents/1_foundations/twin` uses:
1. **System Prompt with Dual Context**: Comprehensive resume facts + personal summary/anecdotes.
2. **Tool Support**:
   - `record_user_details(email, name, notes)`: Captures visitor inquiries for collaboration/hiring.
   - `record_unknown_question(question)`: Logs unanswered questions for Tejas to review.
3. **Multi-Turn Tool Loop**: Loops while `finish_reason === "tool_calls"`, executing functions and feeding tool results back into the model context before delivering the final response.

---

## Detailed Task Breakdown

### Task 1: Environment & API Key Setup
**Files:**
- Modify: `content/portfolio-website/.env.local`
- Verify: Root `.env` connection

**Step 1: Check and link OPENROUTER_API_KEY**
Ensure `OPENROUTER_API_KEY` from the root `.env` is loaded by Next.js in `content/portfolio-website/.env.local`.

**Step 2: Verification command**
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 22 && node -e "
require('dotenv').config({ path: '.env.local' });
console.log('OpenRouter Key Present:', !!process.env.OPENROUTER_API_KEY);
"
```
Expected: `OpenRouter Key Present: true`

---

### Task 2: Create Digital Twin Knowledge Base & Context Engine
**Files:**
- Create: `content/portfolio-website/app/lib/twinContext.ts`
- Test: `content/portfolio-website/tests/twin-context.spec.ts`

**Step 1: Write context unit test**
Verify `TWIN_SYSTEM_PROMPT` exports valid string, contains G1 Humanoid, Inspire Hand, Sim-to-Real, Wastefull Insights, Science City, DRDO/ADA, and persona guidelines.

**Step 2: Run test to verify it fails**
```bash
npx playwright test tests/twin-context.spec.ts
```

**Step 3: Implement `app/lib/twinContext.ts`**
Include:
- Professional identity: Senior Robotics & Computer Vision Engineer (FEV India, Wastefull Insights, Science City, DRDO/ADA).
- Active FEV India G1 Humanoid work: Unitree G1 platform, Inspire Hand, Sim-to-Real, walking policies, Safety Layer & HAL, Physical AI exploration (RoboLab, Isaac Sim Arena, RoboStudio, GenieSim, Lightwheel AI).
- Production impact metrics: 80% compute reduction, 10k+ daily objects, 40% cycle time improvement.
- Personal side: Passionate builder, RGIT robotics club roots, loves the physical reality of hardware over pure simulation, approachable tone.
- Instructions for handling vague questions: ask clarifying questions or offer relevant project highlights.
- Tool schemas for `record_user_details` and `record_unknown_question`.

**Step 4: Run test to verify it passes**
Expected: PASS

---

### Task 3: Implement Server-Side Agent API Route with Tool Execution
**Files:**
- Create: `content/portfolio-website/app/api/twin/route.ts`
- Create: `content/portfolio-website/app/lib/twinTools.ts`
- Test: API test via curl and Playwright

**Step 1: Write tool handler in `app/lib/twinTools.ts`**
- `record_user_details(email, name, notes)`: Saves leads to local log file (`data/leads.jsonl`) and optionally notifies via Resend.
- `record_unknown_question(question)`: Saves unanswerable questions to `data/unknown_questions.jsonl`.

**Step 2: Implement `/api/twin/route.ts`**
- Calls OpenRouter: `https://openrouter.ai/api/v1/chat/completions` with model `openai/gpt-oss-120b`.
- Tool-calling loop: checks `finish_reason === 'tool_calls'`, executes tools, feeds responses back to model.
- Includes fallback response if model or network encounters an issue.

**Step 3: Test API route via curl**
```bash
curl -X POST http://localhost:3000/api/twin \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "What are you working on right now?"}]}'
```
Expected: 200 OK with assistant response discussing the Unitree G1 humanoid at FEV India.

---

### Task 4: Create Digital Twin UI Components
**Files:**
- Create: `content/portfolio-website/app/components/DigitalTwinChat.tsx`
- Modify: `content/portfolio-website/app/page.tsx`
- Modify: `content/portfolio-website/app/globals.css`

**Step 1: Design & Styles in `app/globals.css`**
- Floating launcher button: Precision Cobalt pill with status pulse dot (`Chat with AI Twin`).
- Slide-over drawer / modal: Sleek dark surface (`#0d111a`), hairline borders (`rgba(255,255,255,0.08)`), terminal-inspired header (`SYS_TWIN // TEJAS_V1`).
- Suggestion chips: clickable starter prompts for quick exploration.
- Message bubbles: user (cobalt accent), twin (slate/obsidian card with markdown formatting and code highlighting).
- Status indicator: shows model name (`openai/gpt-oss-120b`) and active tool execution pills.

**Step 2: Implement `DigitalTwinChat.tsx`**
- State management for chat history, open/close state, loading/thinking states, tool execution toasts.
- Suggestion chip click handlers.
- Auto-scroll to latest message.
- Keyboard shortcuts (`Esc` to close, `Enter` to send).

**Step 3: Mount in `app/page.tsx`**
Add `<DigitalTwinChat />` component to root page layout.

---

### Task 5: End-to-End Verification with Playwright
**Files:**
- Create: `content/portfolio-website/tests/digital-twin.spec.ts`

**Step 1: Write E2E test cases:**
1. Launcher button renders and has pulse animation.
2. Clicking launcher opens the Digital Twin drawer.
3. Suggestion chips populate the input and trigger a response.
4. Sending a technical question ("How did you optimize Python to C++?") receives a coherent, accurate response.
5. Providing an email ("Contact me at visitor@example.com for a role") triggers the `record_user_details` tool.
6. Responsive design test: drawer renders cleanly on mobile viewports (390px).

**Step 2: Run Playwright test suite**
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && npx playwright test tests/digital-twin.spec.ts
```
Expected: All tests pass.

**Step 3: Capture visual QA screenshots**
- `visual_qa/11_digital_twin_launcher.png`
- `visual_qa/12_digital_twin_open.png`
- `visual_qa/13_digital_twin_conversation.png`

---

### Task 6: Production Build & Git Commit
**Step 1: Run Turbopack production build**
```bash
npm run build
```
Expected: 0 errors.

**Step 2: Git commit**
```bash
git add .
git commit -m "feat: add Digital Twin AI chat powered by OpenRouter openai/gpt-oss-120b with agent tools"
```
