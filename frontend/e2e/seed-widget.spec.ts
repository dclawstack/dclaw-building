import { test, expect } from '@playwright/test';
test('SeedWidget visible on homepage', async ({ page }) => {
  await page.goto('/');
  const btn = page.getByText(/seed demo data/i).or(page.getByText(/re-seed data/i));
  await expect(btn).toBeVisible({ timeout: 8000 });
});
