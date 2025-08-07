// tests/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    console.log('🔍 Starting test, checking servers...');
    
    // Перевіряємо основний сервер
    try {
      const mainResponse = await page.request.get('http://localhost:3000');
      console.log('✅ Main server (3000) status:', mainResponse.status());
    } catch (error) {
      console.log('❌ Main server (3000) error:', error.message);
    }
    
    // Перевіряємо uikit сервер
    try {
      const uikitResponse = await page.request.get('http://localhost:3003');
      console.log('✅ UIKit server (3003) status:', uikitResponse.status());
    } catch (error) {
      console.log('❌ UIKit server (3003) error:', error.message);
    }
    
    // Перевіряємо mf-manifest.json
    try {
      const manifestResponse = await page.request.get('http://localhost:3003/mf-manifest.json');
      console.log('✅ UIKit manifest status:', manifestResponse.status());
    } catch (error) {
      console.log('❌ UIKit manifest error:', error.message);
    }
    
    await page.goto('http://localhost:3000');
  });

  test('should display correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('LightTube');
  });

  test('should have LightTube logo that links to home', async ({ page }) => {
    const logo = page.getByRole('link', { name: 'LightTube' });
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '/');
  });

  test('should have search functionality', async ({ page }) => {
    const searchBox = page.getByRole('searchbox', { name: 'Type to Search a Video...' });
    await expect(searchBox).toBeVisible();
    await expect(searchBox).toBeEmpty();
  });

  test('should display video grid', async ({ page }) => {
    const videos = page.getByRole('article');
    // Wait for at least one video to be visible
    await expect(videos.first()).toBeVisible();
    // Ensure we have multiple videos
    const count = await videos.count();
    expect(count).toBeGreaterThan(0);
  });

  test('each video card should have required elements', async ({ page }) => {
    // Get the first video card
    const firstVideo = page.getByRole('article').first();

    // Check for thumbnail
    await expect(firstVideo.getByRole('img')).toBeVisible();

    // Check for title
    await expect(firstVideo.getByRole('heading', { level: 3 })).toBeVisible();

    // Check for channel name
    const channelInfo = firstVideo.getByText(/.*/, { exact: false }).first();
    await expect(channelInfo).toBeVisible();
  });
});
