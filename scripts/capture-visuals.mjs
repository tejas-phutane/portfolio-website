import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function capture() {
  const artifactDir = '/home/tejas/.gemini/antigravity-ide/brain/382552cc-40ee-49f9-b1eb-cda578c99f59';
  const outDir = path.join(artifactDir, 'visual_qa');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Helper to scroll and wait for animation
  async function scrollAndCapture(selector, filename) {
    const el = page.locator(selector);
    if (await el.isVisible()) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800); // wait for scroll-reveal animation
      await el.screenshot({ path: path.join(outDir, filename) });
      console.log(`Saved ${filename}`);
    }
  }

  // 1. Hero viewport
  await page.screenshot({ path: path.join(outDir, '02_hero_section.png') });
  console.log('Saved 02_hero_section.png');

  // 2. About section
  await scrollAndCapture('#about', '03_about_section.png');

  // 3. Skills section
  await scrollAndCapture('#skills', '04_skills_section.png');

  // 4. Projects section
  await scrollAndCapture('#projects', '05_projects_section.png');

  // 5. Project Modal open
  const firstCard = page.locator('.project-card').first();
  if (await firstCard.isVisible()) {
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await firstCard.click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outDir, '06_project_modal.png') });
    console.log('Saved 06_project_modal.png');

    const closeBtn = page.locator('button[aria-label="Close modal"]');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(400);
    }
  }

  // 6. Experience section
  await scrollAndCapture('#experience', '07_experience_section.png');

  // 7. Services section
  await scrollAndCapture('#services', '08_services_section.png');

  // 8. Contact section
  await scrollAndCapture('#contact', '09_contact_section.png');

  // 9. Full page overview after scrolling through all sections (so all reveals have fired)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '01_homepage_full.png'), fullPage: true });
  console.log('Saved 01_homepage_full.png');

  // 10. Mobile Viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outDir, '10_mobile_viewport.png') });
  console.log('Saved 10_mobile_viewport.png');

  await browser.close();
  console.log('All visual screenshots successfully captured.');
}

capture().catch((err) => {
  console.error('Error capturing visuals:', err);
  process.exit(1);
});
