// tests_old/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000', {waitUntil: 'networkidle'});
  });

  test('should display correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('LightTube');
  });

  test('should have LightTube logo that links to home', async ({ page }) => {
    const logo = page.getByRole('link', { name: 'LightTube' });
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '/');
  });
});
