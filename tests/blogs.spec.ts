import { test, expect } from '@playwright/test';

test.describe('Technical Blogs & Field Logs System', () => {
  test('Blog index page (/blog) renders with technical articles', async ({ page }) => {
    await page.goto('/blog');
    
    // Check heading
    const title = page.locator('h1.blog-index-title');
    await expect(title).toContainText(/Engineering Deep Dives/i);

    // Check breadcrumb / back link
    const backHome = page.locator('a[href="/"]');
    await expect(backHome.first()).toBeVisible();

    // Check all 4 articles rendered
    const articleCards = page.locator('.blog-index-card');
    await expect(articleCards).toHaveCount(4);

    // Verify key technical article titles
    await expect(page.locator('text=Sim-to-Real Transfer on the Unitree G1').first()).toBeVisible();
    await expect(page.locator('text=Slashing Perception Latency by 80%').first()).toBeVisible();
    await expect(page.locator('text=240 FPS Trajectory Prediction').first()).toBeVisible();
    await expect(page.locator('text=Industrial Edge AI').first()).toBeVisible();
  });

  test('Article reader page (/blog/[slug]) renders deep engineering writeup with tables and code', async ({ page }) => {
    await page.goto('/blog/cxx-zero-copy-perception-optimization');

    // Heading verification using specific class
    const heading = page.locator('h1.article-main-title');
    await expect(heading).toContainText(/Slashing Perception Latency by 80%/i);

    // Check metadata tags
    await expect(page.locator('.article-tags-strip').locator('text=Jetson')).toBeVisible();
    await expect(page.locator('.article-tags-strip').locator('text=C++20')).toBeVisible();

    // Check table of contents
    const toc = page.locator('.article-toc');
    await expect(toc).toBeVisible();

    // Check HTML table rendering (ensuring not raw markdown slop)
    const table = page.locator('table.article-table');
    await expect(table).toBeVisible();
    await expect(table.locator('th').first()).toContainText(/Pipeline Stage/i);

    // Check code blocks
    const codeBlock = page.locator('.article-code-block');
    await expect(codeBlock.first()).toBeVisible();

    // Check Back button navigates back to /blog
    const backBtn = page.locator('a[href="/blog"]').first();
    await expect(backBtn).toBeVisible();
  });

  test('Homepage features Blogs section and links to /blog', async ({ page }) => {
    await page.goto('/');

    const blogsSection = page.locator('#blogs');
    await blogsSection.scrollIntoViewIfNeeded();
    await expect(blogsSection).toBeVisible();

    // Verify section heading
    await expect(blogsSection.locator('h2')).toContainText(/Engineering Deep Dives/i);

    // Verify link to full archive
    const archiveLink = blogsSection.locator('a[href="/blog"]').first();
    await expect(archiveLink).toBeVisible();

    // Click archive link
    await archiveLink.click();
    await expect(page).toHaveURL(/\/blog/);
  });

  test('Hero section renders sub-50ms latency metric and copy email action', async ({ page }) => {
    await page.goto('/');

    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Verify Sub-50ms metric replaces 10K+ objects
    await expect(hero.locator('.metric-number:has-text("Sub-50ms")')).toBeVisible();
    await expect(hero.locator('text=Edge Perception Latency')).toBeVisible();

    // Verify location badge
    await expect(hero.locator('text=Pune / Mumbai, India')).toBeVisible();

    // Verify direct email copy button
    const emailBtn = hero.locator('button.hero-email-pill');
    await expect(emailBtn).toBeVisible();

    // Verify hardware stack strip
    await expect(hero.locator('.hero-stack-strip').locator('text=ROS 2')).toBeVisible();
    await expect(hero.locator('.hero-stack-strip').locator('text=Unitree G1')).toBeVisible();
    await expect(hero.locator('.hero-stack-strip').locator('text=Jetson AGX')).toBeVisible();
  });

  test('Studio Dashboard supports Articles tab', async ({ page }) => {
    await page.goto('/studio');

    // Click Articles tab
    const articlesTab = page.locator('button.studio-tab:has-text("Articles")');
    await expect(articlesTab).toBeVisible();
    await articlesTab.click();

    // Verify article list displayed
    const firstArticle = page.locator('.project-sidebar-item:has-text("Sim-to-Real Transfer")');
    await expect(firstArticle).toBeVisible();

    // Verify form fields
    await expect(page.locator('input.studio-input[value*="Sim-to-Real"]').first()).toBeVisible();
    await expect(page.locator('textarea:has-text("Unitree G1")').first()).toBeVisible();
  });
});
