import { test, expect } from '@playwright/test';

test.describe('Studio Content & Upload API Routes', () => {
  test('GET /api/studio/content returns all portfolio data sections', async ({ request }) => {
    const res = await request.get('/api/studio/content');
    expect(res.status()).toBe(200);

    const data = await res.json();
    expect(data.projects).toBeDefined();
    expect(Array.isArray(data.projects)).toBe(true);
    expect(data.experience).toBeDefined();
    expect(Array.isArray(data.experience)).toBe(true);
    expect(data.services).toBeDefined();
    expect(Array.isArray(data.services)).toBe(true);
    expect(data.about).toBeDefined();
    expect(typeof data.twinMemory).toBe('string');
  });

  test('POST /api/studio/content persists section updates', async ({ request }) => {
    // Read current services
    const getRes = await request.get('/api/studio/content');
    const data = await getRes.json();
    const originalServices = data.services;

    // Send update
    const updateRes = await request.post('/api/studio/content', {
      data: {
        section: 'services',
        content: originalServices,
      },
    });

    expect(updateRes.status()).toBe(200);
    const updateData = await updateRes.json();
    expect(updateData.success).toBe(true);
  });

  test('POST /api/studio/upload accepts image file and returns public url', async ({ request }) => {
    // Create a 1x1 transparent PNG buffer
    const pngBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );

    const res = await request.post('/api/studio/upload', {
      multipart: {
        file: {
          name: 'test_studio_upload.png',
          mimeType: 'image/png',
          buffer: pngBuffer,
        },
      },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.url).toMatch(/^\/images\//);
  });
});
