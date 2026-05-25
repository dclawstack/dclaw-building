import { test, expect } from '@playwright/test';
test.describe('Landing page', () => {
  test('shows hero headline', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Building Intelligence.')).toBeVisible({ timeout: 8000 });
  });
  test('shows all 4 feature sections', async ({ page }) => {
    await page.goto('/');
    for (const title of ['System Health Monitor', 'Maintenance Tracker', 'Tenant Management', 'Occupancy Analytics']) {
      await expect(page.getByText(title)).toBeVisible();
    }
  });
});
