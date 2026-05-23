import { test, expect } from '@playwright/test';

test.describe('Proxy health', () => {
  test('GET /health/ returns 200', async ({ request }) => {
    const res = await request.get('/health/');
    expect(res.status()).toBe(200);
  });
  test('/api/v1/building/demo/status not 404', async ({ request }) => {
    const res = await request.get('/api/v1/building/demo/status');
    expect(res.status()).not.toBe(404);
  });
});

test.describe('Seed/clear cycle', () => {
  test('seed returns 200', async ({ request }) => {
    const res = await request.post('/api/v1/building/demo/seed');
    expect(res.status()).toBe(200);
  });
  test('after seeding, buildings list has >= 3 items', async ({ request }) => {
    await request.post('/api/v1/building/demo/seed');
    const res = await request.get('/api/v1/buildings/');
    expect(res.status()).toBe(200);
    const body = await res.json();
    const items = Array.isArray(body) ? body : (body.items ?? body.buildings ?? []);
    expect(items.length).toBeGreaterThanOrEqual(3);
  });
  test('clear returns 200', async ({ request }) => {
    await request.post('/api/v1/building/demo/seed');
    const res = await request.delete('/api/v1/building/demo/clear');
    expect(res.status()).toBe(200);
  });
  test('after clearing, demo buildings gone', async ({ request }) => {
    await request.post('/api/v1/building/demo/seed');
    await request.delete('/api/v1/building/demo/clear');
    const status = await request.get('/api/v1/building/demo/status');
    const body = await status.json();
    expect(body.building_count).toBe(0);
  });
});

test.describe('404 regression', () => {
  test('GET /api/v1/dashboard/ not 404', async ({ request }) => {
    const res = await request.get('/api/v1/dashboard/');
    expect(res.status()).not.toBe(404);
  });
});
