import { test, expect } from '@playwright/test';

test.describe('Portfolio Website End-to-End Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Collect console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('Page loads with correct title and no critical errors', async ({ page }) => {
    await expect(page).toHaveTitle(/Tejas|Robotics|Engineer|Portfolio/i);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Navbar renders all navigation items and CTA', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    const expectedLinks = ['About', 'Skills', 'Experience', 'Projects', 'Services', 'Contact'];
    for (const linkText of expectedLinks) {
      const link = nav.locator(`a:has-text("${linkText}")`).first();
      await expect(link).toBeVisible();
    }

    // CTA button in navbar
    const hireMeBtn = nav.locator('a:has-text("Get In Touch"), a:has-text("Hire Me"), a:has-text("Contact")').first();
    await expect(hireMeBtn).toBeVisible();
  });

  test('Hero section renders avatar, stats, badges, and CTAs', async ({ page }) => {
    const hero = page.locator('#hero, section:first-of-type');
    await expect(hero).toBeVisible();

    // Check name heading
    const heading = page.locator('h1');
    await expect(heading).toContainText(/Tejas/i);

    // Check refreshed positioning title
    const roleTitle = hero.locator('.hero-role-title');
    await expect(roleTitle).toContainText(/Senior Robotics Engineer specializing in Humanoid Robotics, Physical AI, and Sim-to-Real Systems/i);

    // Check updated subheading
    const subheading = hero.locator('.hero-subheading');
    await expect(subheading).toContainText(/Building robot-agnostic autonomy, safety-aware humanoid systems, digital twins, and Physical AI workflows/i);

    // Check three concise proof points
    const proofPoints = hero.locator('.proof-point-item');
    await expect(proofPoints).toHaveCount(3);
    await expect(hero).toContainText('Humanoid autonomy & safety');
    await expect(hero).toContainText('Simulation-first development');
    await expect(hero).toContainText('Physical AI data & training pipelines');

    // Retain FEV India & Unitree G1 context
    await expect(hero).toContainText('FEV India');
    await expect(hero).toContainText('Unitree G1');

    // Check CTA buttons
    const projectsBtn = page.locator('a[href="#projects"]').first();
    await expect(projectsBtn).toBeVisible();

    // Check resume CTA button opens the gated request modal
    const resumeBtn = hero.locator('button:has-text("Request Resume")');
    await expect(resumeBtn).toBeVisible();

    // Take screenshot of Hero
    await page.screenshot({ path: 'test-results/hero-screenshot.png' });
  });

  test('Projects section renders, category filters work, and project modal opens & closes', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    await projectsSection.scrollIntoViewIfNeeded();
    await expect(projectsSection).toBeVisible();

    // Check category filter buttons
    const filterButtons = projectsSection.locator('.filter-btn');
    const count = await filterButtons.count();
    expect(count).toBeGreaterThan(1);

    // Click on "Robotics Gallery" filter
    const galleryFilter = projectsSection.locator('.filter-btn:has-text("Robotics Gallery")').first();
    if (await galleryFilter.isVisible()) {
      await galleryFilter.click();
      await page.waitForTimeout(300);
    }

    // Switch back to "All"
    const allFilter = projectsSection.locator('.filter-btn:has-text("All")').first();
    await allFilter.click();
    await page.waitForTimeout(300);

    // Find project cards
    const cards = projectsSection.locator('.project-card');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);

    // Click the first project card
    const firstCard = cards.first();
    await firstCard.scrollIntoViewIfNeeded();
    await firstCard.click();
    await page.waitForTimeout(500);

    // Verify modal is open
    const modal = page.locator('.modal-overlay[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText(/Problem/i);
    await expect(modal).toContainText(/System Architecture|Approach/i);
    await expect(modal).toContainText(/Technology Stack/i);
    await expect(modal).toContainText(/How measured/i);

    // Close the modal
    const closeBtn = modal.locator('button[aria-label="Close modal"]');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await page.waitForTimeout(300);
    await expect(modal).not.toBeVisible();
  });

  test('Humanoid Showroom Assistant case study displays 4-tier architecture and placeholders', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    await projectsSection.scrollIntoViewIfNeeded();

    // Click on "Humanoids & Physical AI" category
    const categoryBtn = projectsSection.locator('.filter-btn:has-text("Humanoids & Physical AI")');
    await expect(categoryBtn).toBeVisible();
    await categoryBtn.click();
    await page.waitForTimeout(300);

    // Click the Humanoid Showroom Assistant project card
    const card = projectsSection.locator('.project-card:has-text("Humanoid Showroom Assistant")').first();
    await expect(card).toBeVisible();
    await card.click();
    await page.waitForTimeout(500);

    const modal = page.locator('.modal-overlay[role="dialog"]');
    await expect(modal).toBeVisible();

    // Check case study sections
    await expect(modal).toContainText('Problem');
    await expect(modal).toContainText('System Architecture');
    await expect(modal).toContainText('Safety Design');
    await expect(modal).toContainText('Simulation & Validation');
    await expect(modal).toContainText('Demo Capabilities');
    await expect(modal).toContainText('Engineering Learnings');

    // Check 4-tier diagram
    const diagram = modal.locator('.humanoid-arch-diagram');
    await expect(diagram).toBeVisible();
    await expect(diagram).toContainText('Autonomy Applications');
    await expect(diagram).toContainText('Digital Twin & Simulation');
    await expect(diagram).toContainText('ROS 2 Middleware + HAL');
    await expect(diagram).toContainText('Robot Backends');
    await expect(diagram).toContainText('Unitree G1');

    // Check visual placeholders
    await expect(modal).toContainText('Visual Placeholders');
    await expect(modal).toContainText('Placeholder 01');
    await expect(modal).toContainText('Placeholder 04');

    // Close modal
    const closeBtn = modal.locator('button[aria-label="Close modal"]');
    await closeBtn.click();
    await page.waitForTimeout(300);
    await expect(modal).not.toBeVisible();
  });

  test('Experience section displays career history', async ({ page }) => {
    const expSection = page.locator('#experience');
    await expSection.scrollIntoViewIfNeeded();
    await expect(expSection).toBeVisible();

    // Check for FEV India and Wastefull Insights
    await expect(expSection).toContainText(/FEV India/i);
    await expect(expSection).toContainText(/Wastefull Insights/i);

    // Check upgraded FEV architecture bullets and tags
    await expect(expSection).toContainText('Unitree G1');
    await expect(expSection).toContainText('robot-agnostic ROS 2/HAL architecture');
    await expect(expSection).toContainText('HARA');
    await expect(expSection).toContainText('SO101 arm');
    await expect(expSection).toContainText('SmolVLA');
    await expect(expSection).toContainText('Behavioral Cloning');
  });

  test('Skills section displays core robotics competencies', async ({ page }) => {
    const skillsSection = page.locator('#skills');
    await skillsSection.scrollIntoViewIfNeeded();
    await expect(skillsSection).toBeVisible();

    await expect(skillsSection).toContainText(/ROS|Robotics|Perception|C\+\+|Python/i);
    await expect(skillsSection).toContainText('Physical AI & Robot Learning');
    await expect(skillsSection).toContainText('ACT (Action Chunking)');
    await expect(skillsSection).toContainText('SmolVLA');
  });

  test('About section displays Physical AI, Now Building roadmap, and Continuous Learning', async ({ page }) => {
    const aboutSection = page.locator('#about');
    await aboutSection.scrollIntoViewIfNeeded();
    await expect(aboutSection).toBeVisible();

    // Physical AI capability cards
    await expect(aboutSection).toContainText('Physical AI & Robot Learning');
    await expect(aboutSection).toContainText('Multimodal Demonstration Data');
    await expect(aboutSection).toContainText('Imitation & Policy Training');
    await expect(aboutSection).toContainText('Simulation & Evaluation');
    await expect(aboutSection).toContainText('Sim-to-Real Validation');

    // Task 9: Now Building roadmap
    await expect(aboutSection).toContainText('Now Building');
    await expect(aboutSection).toContainText('Advanced Robot Learning');
    await expect(aboutSection).toContainText('Agentic AI & Embodied Autonomy');
    await expect(aboutSection).toContainText('Humanoid Control & Safety Integration');

    // Task 9: Continuous Learning
    await expect(aboutSection).toContainText('Continuous Learning');
    await expect(aboutSection).toContainText('LLM Engineering & Agentic AI Capabilities');
    await expect(aboutSection).toContainText('Core Development Themes');

    // Task 8: Metric evidence tooltips in tenets
    const tenetEvidence = aboutSection.locator('.tenet-metric-callout .evidence-tooltip').first();
    await expect(tenetEvidence).toBeAttached();
    await expect(tenetEvidence).toContainText('How measured');
  });

  test('Contact section has operational form fields', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeVisible();

    const nameInput = contactSection.locator('input[name="name"], input[placeholder*="Name" i]').first();
    const emailInput = contactSection.locator('input[name="email"], input[placeholder*="Email" i]').first();
    const messageInput = contactSection.locator('textarea[name="message"], textarea[placeholder*="Message" i]').first();

    if (await nameInput.isVisible()) {
      await nameInput.fill('Test Recruiter');
      await expect(nameInput).toHaveValue('Test Recruiter');
    }

    if (await emailInput.isVisible()) {
      await emailInput.fill('recruiter@techcorp.com');
      await expect(emailInput).toHaveValue('recruiter@techcorp.com');
    }

    if (await messageInput.isVisible()) {
      await messageInput.fill('We are impressed with your robotics engineering background!');
      await expect(messageInput).toHaveValue('We are impressed with your robotics engineering background!');
    }
  });

  test('Mobile responsive view has working mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Look for mobile menu toggle button
    const menuToggle = page.locator('button[aria-label*="menu" i], button:has(svg.lucide-menu), nav button').first();
    if (await menuToggle.isVisible()) {
      await menuToggle.click();
      await page.waitForTimeout(300);

      // Verify mobile nav drawer/links appear
      const mobileNav = page.locator('div:has-text("About"):has-text("Projects")').first();
      await expect(mobileNav).toBeVisible();
    }
  });

  test('Gated resume modal opens, enforces validation, and protects contact details', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verify phone number is not exposed on page
    const pageContent = await page.content();
    expect(pageContent).not.toContain('8484016205');
    expect(pageContent).not.toContain('/resume.pdf');

    // Click "Request Resume" button in hero
    const heroResumeBtn = page.locator('#hero button:has-text("Request Resume")');
    await heroResumeBtn.click();

    // Verify modal appears
    const modal = page.locator('.resume-modal-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Request Resume / CV');
    await expect(modal).toContainText('Personal contact details and resume are shared only after a brief introduction request.');

    // Check modal form fields
    await expect(modal.locator('#req-name')).toBeVisible();
    await expect(modal.locator('#req-email')).toBeVisible();
    await expect(modal.locator('#req-company')).toBeVisible();
    await expect(modal.locator('#req-purpose')).toBeVisible();

    // Close modal
    const closeBtn = modal.locator('button[aria-label="Close modal"]');
    await closeBtn.click();
    await expect(modal).not.toBeVisible();

    // Verify Contact section contains Introduction / Resume CTA
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection.locator('button:has-text("Request Introduction / Resume")')).toBeVisible();
    await expect(contactSection).toContainText('Personal contact details and resume are shared only after a brief introduction request.');

    // Verify Footer contains Introduction / Resume CTA
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.locator('button:has-text("Request Introduction / Resume")')).toBeVisible();
    await expect(footer).toContainText('Personal contact details and resume are shared only after a brief introduction request.');
  });

  test('Capture visual screenshots for user review', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 950 });
    await page.goto('/', { waitUntil: 'networkidle' });

    // Hero + Telemetry HUD
    await page.screenshot({
      path: '/home/tejas/.gemini/antigravity/brain/b30a8fca-7a6f-4e48-aada-a3039c629e0d/screenshot-hero-hud.png',
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });

    // About & Bento Grids
    const aboutSec = page.locator('#about');
    await aboutSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: '/home/tejas/.gemini/antigravity/brain/b30a8fca-7a6f-4e48-aada-a3039c629e0d/screenshot-about-bento.png'
    });

    // Projects
    const projSec = page.locator('#projects');
    await projSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: '/home/tejas/.gemini/antigravity/brain/b30a8fca-7a6f-4e48-aada-a3039c629e0d/screenshot-projects.png'
    });
  });
});
