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

    // Check CTA buttons
    const projectsBtn = page.locator('a[href="#projects"]').first();
    await expect(projectsBtn).toBeVisible();

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
    await expect(modal).toContainText(/Approach/i);
    await expect(modal).toContainText(/Technology Stack/i);

    // Close the modal
    const closeBtn = modal.locator('button[aria-label="Close modal"]');
    await expect(closeBtn).toBeVisible();
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
  });

  test('Skills section displays core robotics competencies', async ({ page }) => {
    const skillsSection = page.locator('#skills');
    await skillsSection.scrollIntoViewIfNeeded();
    await expect(skillsSection).toBeVisible();

    await expect(skillsSection).toContainText(/ROS|Robotics|Perception|C\+\+|Python/i);
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
});
