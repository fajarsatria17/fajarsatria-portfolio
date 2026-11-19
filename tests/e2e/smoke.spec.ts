import { test, expect } from '@playwright/test';

test.describe('Initial Smoke Test', () => {
  test('homepage renders main title and brand', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Fajar Satria/);
    await expect(page.locator('h1')).toContainText('Fajar Satria');
  });

  test('skip link is accessible via keyboard', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
  });
});
