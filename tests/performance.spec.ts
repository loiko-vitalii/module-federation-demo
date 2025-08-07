// tests/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance & Loading', () => {
  test('should load initial content within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000');
    
    // Wait for first video to appear
    await expect(page.getByRole('article').first()).toBeVisible({ timeout: 20000 });
    
    const loadTime = Date.now() - startTime;
    console.log(`⏱️  Initial content loaded in ${loadTime}ms`);
    
    // Reasonable loading time (adjust based on your requirements)
    expect(loadTime).toBeLessThan(20000); // 20 seconds max
  });

  test('should show progressive content loading', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    
    // Check that page structure loads first
    await expect(page.getByRole('banner')).toBeVisible({ timeout: 5000 }); // Header
    await expect(page.getByRole('searchbox')).toBeVisible({ timeout: 5000 }); // Search
    
    // Then content area should be present (even if loading)
    const feedContainer = page.locator('[class*="feed"]');
    await expect(feedContainer).toBeVisible({ timeout: 5000 });
    
    // Finally, actual video content
    await expect(page.getByRole('article').first()).toBeVisible({ timeout: 15000 });
    
    console.log('✅ Progressive loading verified: header → search → feed → content');
  });

  test('should handle slow network conditions gracefully', async ({ page }) => {
    // Simulate slow network
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 500); // Add 500ms delay to all requests
    });
    
    await page.goto('http://localhost:3000');
    
    // Should still eventually load content, just slower
    await expect(page.getByRole('article').first()).toBeVisible({ timeout: 30000 });
    
    const articleCount = await page.getByRole('article').count();
    expect(articleCount).toBeGreaterThan(0);
    
    console.log('✅ App handles slow network conditions');
  });
});
