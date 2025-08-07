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
    
    // Перехоплюємо всі помилки консолі браузера
    page.on('console', msg => {
      const type = msg.type();
      if (type === 'error' || type === 'warning') {
        console.log(`🌐 Browser ${type}:`, msg.text());
      }
    });
    
    // Перехоплюємо помилки завантаження ресурсів
    page.on('requestfailed', request => {
      console.log(`❌ Failed request: ${request.method()} ${request.url()}`);
      console.log(`❌ Failure reason:`, request.failure()?.errorText);
    });
    
    // Перехоплюємо успішні запити до Module Federation
    page.on('request', request => {
      if (request.url().includes('mf-manifest.json') || 
          request.url().includes('/remoteEntry.js') ||
          request.url().includes('uikit')) {
        console.log(`🔄 MF Request: ${request.method()} ${request.url()}`);
      }
    });
    
    page.on('response', response => {
      if (response.url().includes('mf-manifest.json') || 
          response.url().includes('/remoteEntry.js') ||
          response.url().includes('uikit')) {
        console.log(`📥 MF Response: ${response.status()} ${response.url()}`);
      }
    });
    
    await page.goto('http://localhost:3000');
    
    // Додамо паузу, щоб дати час Module Federation завантажитися
    await page.waitForTimeout(3000);
    
    // Перевіримо, чи завантажилися компоненти
    const pageContent = await page.content();
    console.log('📄 Page content length:', pageContent.length);
    console.log('📄 Contains uikit references:', pageContent.includes('uikit'));
    console.log('📄 Contains Typography:', pageContent.includes('Typography'));
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
      // Перевірити змінні оточення в браузері
      const apiKey = await page.evaluate(() => {
          return (window as any).import?.meta?.env?.PUBLIC_YOUTUBE_DATA_API_KEY || 'undefined';
      });
      console.log('🔑 API Key in browser:', apiKey ? 'SET' : 'NOT SET');

      // Перевірити, чи робляться запити до YouTube API
      page.on('request', request => {
          if (request.url().includes('googleapis.com') || request.url().includes('youtube')) {
              console.log(`🎥 YouTube API request: ${request.url()}`);
          }
      });

      page.on('requestfailed', request => {
          if (request.url().includes('googleapis.com') || request.url().includes('youtube')) {
              console.log(`❌ YouTube API failed: ${request.url()}`);
              console.log(`❌ Reason:`, request.failure()?.errorText);
          }
      });

      await page.goto('http://localhost:3000');
      await page.waitForTimeout(3000);




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
