// tests_old/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    // Логування консольних повідомлень й помилок сторінки
    page.on('console', msg => console.log(`[console] ${msg.type()}: ${msg.text()}`));
    page.on('pageerror', err => console.error(`[pageerror] ${err.message}`));
    // Логування помилок запитів
    page.on('requestfailed', req => {
      console.error(`[reqfailed] ${req.url()} – ${req.failure()?.errorText}`);
    });
    page.on('response', res => {
      if (res.status() >= 400)
        console.error(`[http ${res.status()}] ${res.url()}`);
    });

    await page.goto('http://localhost:3000');
  });

  test('should display correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('LightTube');
  });

  test('should have LightTube logo that links to home', async ({ page }, testInfo) => {
    const logo = page.getByRole('link', { name: 'LightTube' });
    try {
      await logo.waitFor({ state: 'visible', timeout: 15000 });
      await expect(logo).toHaveAttribute('href', '/');
    } catch (err) {
      // При падінні: скриншот + дамп DOM
      console.error('=== PAGE CONTENT AT FAILURE ===');
      console.error(await page.content());
      await page.screenshot({ path: `test-results/failure-${testInfo.title}.png` });
      throw err;
    }
  });
});
