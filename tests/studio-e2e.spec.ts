import { test, expect } from '@playwright/test';

test.describe('Studio End-to-End Workflow Verification', () => {
  test('creating a project in Studio immediately reflects on the live portfolio homepage', async ({
    page,
    request,
  }) => {
    // 1. Visit Studio
    await page.goto('/studio', { waitUntil: 'domcontentloaded' });

    // 2. Click "Add" Project
    const addBtn = page.locator('.studio-sidebar-header .studio-add-btn');
    await addBtn.click();

    // 3. Fill out project form
    const uniqueTitle = `G1 Humanoid Teleop Test ${Date.now()}`;
    const titleInput = page.locator('input[name="title"]');
    await titleInput.fill(uniqueTitle);

    const summaryInput = page.locator('textarea[name="summary"]');
    await summaryInput.fill('VR teleoperation and imitation learning pipeline for bipedal robot.');

    // 4. Save Changes
    const savePromise = page.waitForResponse(
      (res) => res.url().includes('/api/studio/content') && res.status() === 200
    );
    await page.locator('.studio-save-btn').click();
    await savePromise;

    // Verify toast notification
    const toast = page.locator('.studio-toast.success');
    await expect(toast).toBeVisible();

    // 5. Navigate to Homepage and verify new project is rendered
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const projectCard = page.locator('.project-card', { hasText: uniqueTitle });
    await expect(projectCard).toBeVisible();
    await expect(projectCard).toContainText(uniqueTitle);

    // 6. Clean up: Delete the test project from projects.json via Studio API
    const getRes = await request.get('/api/studio/content');
    const content = await getRes.json();
    const cleanedProjects = content.projects.filter(
      (p: any) => p.title !== uniqueTitle
    );
    await request.post('/api/studio/content', {
      data: {
        section: 'projects',
        content: cleanedProjects,
      },
    });
  });
});
