import { test, expect } from '@playwright/test';

test.describe('Digital Twin AI Chat Assistant E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('Digital Twin launcher renders with live beacon and 120B model tag', async ({ page }) => {
    const launcher = page.locator('#digital-twin-launcher');
    await expect(launcher).toBeVisible();
    await expect(launcher).toContainText('Ask AI Twin');
    await expect(launcher).toContainText('120B');

    const beacon = launcher.locator('.twin-pulse-beacon');
    await expect(beacon).toBeVisible();
  });

  test('Clicking launcher opens chat drawer with header, welcome message and starter chips', async ({ page }) => {
    const launcher = page.locator('#digital-twin-launcher');
    await launcher.click();

    const drawer = page.locator('.twin-drawer');
    await expect(drawer).toBeVisible();
    await expect(drawer).toHaveClass(/open/);

    // Verify header details
    const headerTitle = drawer.locator('.twin-header-title');
    await expect(headerTitle).toContainText('Tejas Phutane');
    const headerSub = drawer.locator('.twin-header-sub');
    await expect(headerSub).toContainText('gpt-oss-120b');

    // Verify welcome message content
    const welcomeMsg = drawer.locator('.twin-message-bubble').first();
    await expect(welcomeMsg).toContainText('Digital Twin');
    await expect(welcomeMsg).toContainText('Unitree G1');

    // Verify starter suggestions are present
    const suggestions = drawer.locator('.suggestion-chip');
    const count = await suggestions.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // Test closing drawer
    const closeBtn = drawer.locator('.close-btn');
    await closeBtn.click();
    await expect(drawer).not.toHaveClass(/open/);
  });

  test('Sending a message sends request to /api/twin and displays AI response', async ({ page }) => {
    // Open drawer
    await page.locator('#digital-twin-launcher').click();
    const drawer = page.locator('.twin-drawer');
    await expect(drawer).toHaveClass(/open/);

    const input = drawer.locator('.twin-input');
    const sendBtn = drawer.locator('.twin-send-btn');

    // Type a specific robotics question
    await input.fill('What is your role on the Unitree G1 humanoid at FEV India?');

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/twin') && resp.status() === 200,
      { timeout: 30000 }
    );
    await sendBtn.click();

    // Verify user message appears in list
    const userMsg = drawer.locator('.twin-message-row.user');
    await expect(userMsg).toContainText('Unitree G1 humanoid');

    // Wait for the API to complete
    await responsePromise;

    // Verify thinking indicator disappears
    await expect(drawer.locator('.twin-message-bubble.thinking')).toHaveCount(0);

    // Verify the latest assistant response bubble is visible with content
    const realAssistantMsgs = drawer.locator('.twin-message-row.assistant:not(:has(.thinking))');
    await expect(realAssistantMsgs).toHaveCount(2);

    const latestResponse = realAssistantMsgs.nth(1);
    await expect(latestResponse).toBeVisible();
    const responseText = await latestResponse.textContent();
    expect(responseText?.length).toBeGreaterThan(30);
  });

  test('Starter suggestion chip populates and triggers conversation', async ({ page }) => {
    await page.locator('#digital-twin-launcher').click();
    const drawer = page.locator('.twin-drawer');
    await expect(drawer).toHaveClass(/open/);

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/twin') && resp.status() === 200,
      { timeout: 30000 }
    );

    // Click the first suggestion chip
    const firstChip = drawer.locator('.suggestion-chip').first();
    const chipText = (await firstChip.textContent()) || '';
    expect(chipText.length).toBeGreaterThan(10);
    await firstChip.click();

    // Verify message sent
    const userMsg = drawer.locator('.twin-message-row.user');
    await expect(userMsg).toBeVisible();

    // Wait for API response
    await responsePromise;

    // Verify assistant responds
    const realAssistantMsgs = drawer.locator('.twin-message-row.assistant:not(:has(.thinking))');
    await expect(realAssistantMsgs).toHaveCount(2);
  });

  test('Clear conversation button resets the chat history', async ({ page }) => {
    await page.locator('#digital-twin-launcher').click();
    const drawer = page.locator('.twin-drawer');
    await expect(drawer).toHaveClass(/open/);

    const clearBtn = drawer.locator('.twin-icon-btn[title="Clear conversation"]');
    await clearBtn.click();

    const bubbles = drawer.locator('.twin-message-bubble');
    await expect(bubbles).toHaveCount(1);
    await expect(bubbles.first()).toContainText('Chat history cleared');
  });

  test('Digital Twin renders responsively on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const launcher = page.locator('#digital-twin-launcher');
    await expect(launcher).toBeVisible();
    await launcher.click();

    const drawer = page.locator('.twin-drawer');
    await expect(drawer).toBeVisible();
    await expect(drawer).toHaveClass(/open/);

    // Input should be accessible on mobile
    const input = drawer.locator('.twin-input');
    await expect(input).toBeVisible();
  });
});
