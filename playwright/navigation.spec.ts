import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: 'Welcome to the Event Network Project!',
    }),
  ).toBeVisible();

  // header with page locator
  await expect(
    page.locator('h1:text("Welcome to the Event Network Project!")'),
  ).toBeVisible();
});
