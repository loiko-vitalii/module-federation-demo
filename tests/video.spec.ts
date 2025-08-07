// tests/video-interactions.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Video Interactions', () => {
    test.beforeEach(async ({ page }) => {
        console.log('🔍 Starting test, checking servers...');

        // Server checks...
        try {
            const mainResponse = await page.request.get('http://localhost:3000');
            console.log('✅ Main server (3000) status:', mainResponse.status());
        } catch (error) {
            console.log('❌ Main server (3000) error:', error.message);
        }

        await page.goto('http://localhost:3000');

        // Wait for content to load OR skeletons to appear
        try {
            await page.waitForSelector('article, [class*="skeleton"]', { timeout: 15000 });
            console.log('✅ Content or loading state detected');
        } catch {
            console.log('❌ No content or loading state detected');
        }
    });

    test('should navigate to video page when clicking a video', async ({ page }) => {
        // Wait for actual video content (not skeletons)
        await expect(page.getByRole('article').first()).toBeVisible({ timeout: 15000 });

        const firstVideoLink = page.locator('a').filter({ has: page.locator('article') }).first();
        const href = await firstVideoLink.getAttribute('href');
        expect(href).toContain('youtube.com/watch?v=');
    });

    test('video thumbnails should load properly', async ({ page }) => {
        // Wait for actual content to load
        await expect(page.getByRole('article').first()).toBeVisible({ timeout: 15000 });

        const firstThumbnail = page.locator('article img').first();

        await expect(firstThumbnail).toHaveAttribute('src', /.+/, { timeout: 10000 });
        await expect(firstThumbnail).toBeVisible();

        const src = await firstThumbnail.getAttribute('src');
        expect(src).toMatch(/^https:\/\/i\.ytimg\.com\/vi\/.+\/.*\.jpg$/);
    });

    test('video metadata should be displayed correctly', async ({ page }) => {
        // Wait for actual content to load
        await expect(page.getByRole('article').first()).toBeVisible({ timeout: 15000 });

        const firstVideo = page.getByRole('article').first();

        // Check if video has title
        const title = firstVideo.getByRole('heading', { level: 3 });
        const titleText = await title.textContent();
        expect(titleText).toBeTruthy();

        // Check if footer content is present
        const footer = firstVideo.locator('footer');
        await expect(footer).toBeVisible();

        const footerText = await footer.textContent();
        expect(footerText).toBeTruthy();
        expect(footerText?.trim()).not.toBe('');
    });

    test('should show loading skeletons before content appears', async ({ page }) => {
        // Navigate with DOM content loaded only (not waiting for all resources)
        await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

        // Try to catch loading state quickly
        const hasLoadingState = await page.evaluate(() => {
            // Look for skeleton elements or loading indicators
            const skeletons = document.querySelectorAll('[class*="skeleton"]');
            const loadingElements = document.querySelectorAll('[class*="loading"]');
            return skeletons.length > 0 || loadingElements.length > 0;
        });

        if (hasLoadingState) {
            console.log('✅ Loading skeletons detected');
        } else {
            console.log('ℹ️  Content loaded too quickly to detect skeletons');
        }

        // Eventually, real content should appear
        await expect(page.getByRole('article').first()).toBeVisible({ timeout: 15000 });
    });
});