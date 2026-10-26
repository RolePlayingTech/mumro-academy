import { test, expect } from '@playwright/test';

test('Lesson 14 simulates a visible draft and rejected unauthorized schedule in EN/PL', async ({ page }) => {
  for (const locale of ['pl', 'en'] as const) {
    await page.goto(locale === 'pl' ? '/pl/lessons/mcp-tools-skills-and-product-surfaces/' : '/lessons/mcp-tools-skills-and-product-surfaces/');
    const demo = page.locator('[data-surface-journey]');
    await expect(demo).toBeVisible();
    await expect(demo).toContainText('FIELDWORK');
    await expect(demo).toContainText('create_publication_draft');
    await expect(demo).toContainText('mcp-surface check --strict');

    const denial = page.locator('[data-surface-permission-denied]');
    await denial.locator('summary').click();
    await expect(denial).toHaveAttribute('open', '');
    await expect(denial).toContainText('403 insufficient_scope');
    await expect(denial).toContainText('mumro:schedule');
    await expect(denial).toContainText('confirmation_mode=user');
  }
});
