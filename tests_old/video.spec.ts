// tests_old/video-interactions.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Video Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should navigate to video page when clicking a video', async ({ page }) => {
    // Get the first video link and its href
    const firstVideoLink = page.getByRole('link').filter({ has: page.getByRole('article') }).first();
    const href = await firstVideoLink.getAttribute('href');
    expect(href).toContain('youtube.com/watch?v=');
  });

test('video thumbnails should load properly', async ({ page }) => {
  const firstThumbnail = page.getByRole('img').first();
  
  // Wait for the image to have a non-empty src attribute
  await expect(firstThumbnail).toHaveAttribute('src', /.+/);
  await expect(firstThumbnail).toBeVisible();
  
  // Check if the src is a valid YouTube thumbnail URL
  const src = await firstThumbnail.getAttribute('src');
  expect(src).toMatch(/^https:\/\/i\.ytimg\.com\/vi\/.+\/.*\.jpg$/);
});

test('video metadata should be displayed correctly', async ({ page }) => {
  const firstVideo = page.getByRole('article').first();
  
  // Check if video has title
  const title = firstVideo.getByRole('heading', { level: 3 });
  const titleText = await title.textContent();
  expect(titleText).toBeTruthy();
  
  // Check if channel name is present
  // The channel name is in the first paragraph element within the metadata section
  const channelName = firstVideo.getByRole('paragraph').first();
  const channelText = await channelName.textContent();
  expect(channelText).toBeTruthy();
});
});