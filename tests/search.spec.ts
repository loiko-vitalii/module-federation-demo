// tests/search.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:3000');
  });

  test('should be able to type in search box', async ({page}) => {
    const searchBox = page.getByRole('searchbox', {name: 'Type to Search a Video...'});
    await searchBox.fill('test search');
    await expect(searchBox).toHaveValue('test search');
  });

  test('search box should be cleared on navigation to home', async ({page}) => {
    const searchBox = page.getByRole('searchbox', {name: 'Type to Search a Video...'});
    await searchBox.fill('test search');

    // Click home logo
    await page.getByRole('link', {name: 'LightTube'}).click();

    // Verify search box is cleared
    await expect(searchBox).toBeEmpty();
  });

test('search value should be preserved in URL', async ({page}) => {
  const searchBox = page.getByRole('searchbox', {name: 'Type to Search a Video...'});
  const searchTerm = 'test search query';

  // Type search term and press Enter
  await searchBox.fill(searchTerm);
  await searchBox.press('Enter');

  // Check that URL contains the search parameter
  await expect(page).toHaveURL(`http://localhost:3000/?search=${searchTerm.replace(/ /g, '+')}`);

  // Reload the page
  await page.reload();

  // Verify search box still contains the search term
  await expect(searchBox).toHaveValue(searchTerm);
});

  test('should restore search from URL parameter', async ({page}) => {
    const searchTerm = 'test search query';

    // Navigate directly to URL with search parameter
    await page.goto(`http://localhost:3000/?search=${encodeURIComponent(searchTerm)}`);

    // Verify search box contains the search term
    const searchBox = page.getByRole('searchbox', {name: 'Type to Search a Video...'});
    await expect(searchBox).toHaveValue(searchTerm);
  });
});