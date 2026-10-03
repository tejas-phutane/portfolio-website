import { test, expect } from '@playwright/test';

test.describe('Local Portfolio Studio Dashboard UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });
  });

  test('renders studio header, local badge, and navigation tabs', async ({ page }) => {
    // Check header
    const title = page.locator('.studio-title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Portfolio Studio');

    const badge = page.locator('.studio-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('LOCAL');

    // Check tabs
    const tabs = page.locator('.studio-tab');
    await expect(tabs).toHaveCount(6);
    await expect(tabs.nth(0)).toContainText('Projects');
    await expect(tabs.nth(1)).toContainText('Experience');
    await expect(tabs.nth(2)).toContainText('Services');
    await expect(tabs.nth(3)).toContainText('About');
    await expect(tabs.nth(4)).toContainText('Articles');
    await expect(tabs.nth(5)).toContainText('AI Twin');
  });

  test('switches tabs and displays corresponding section editors', async ({ page }) => {
    // Projects tab is default active
    await expect(page.locator('.project-list-sidebar')).toBeVisible();

    // Switch to Experience
    await page.locator('.studio-tab:has-text("Experience")').click();
    await expect(page.locator('.experience-manager')).toBeVisible();

    // Switch to Services
    await page.locator('.studio-tab:has-text("Services")').click();
    await expect(page.locator('.services-manager')).toBeVisible();

    // Switch to About
    await page.locator('.studio-tab:has-text("About")').click();
    await expect(page.locator('.about-manager')).toBeVisible();

    // Switch to AI Twin
    await page.locator('.studio-tab:has-text("AI Twin")').click();
    await expect(page.locator('.twin-manager')).toBeVisible();
  });

  test('project editor allows selecting projects and displays form fields', async ({ page }) => {
    // Select first project
    const projectItems = page.locator('.project-sidebar-item');
    await expect(projectItems.first()).toBeVisible();
    await projectItems.first().click();

    // Verify form inputs exist
    await expect(page.locator('input[name="title"]')).toBeVisible();
    await expect(page.locator('select[name="category"]')).toBeVisible();
    await expect(page.locator('textarea[name="summary"]')).toBeVisible();
    await expect(page.locator('.studio-upload-btn')).toBeVisible();
  });
});
