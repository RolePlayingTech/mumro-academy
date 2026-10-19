import { test, expect } from '@playwright/test';

test.describe('MUMRO Academy — Bilingual (EN/PL), Interactive & SEO Verification', () => {
  test('EN homepage renders 5-stage loop explorer, 4 tracks, and filterable 12-lesson catalog', async ({ page }) => {
    await page.goto('/?lang=en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('living brand systems');

    const lessonCards = page.locator('[data-lesson-card]');
    await expect(lessonCards).toHaveCount(12);

    // Filter by Track 04 (Agents & MCP)
    await page.locator('[data-track-filter="agents-mcp-governance"]').click();
    await expect(page.locator('[data-lesson-card]:not([hidden])')).toHaveCount(3);

    // Filter by search keyword
    await page.locator('[data-track-filter="all"]').click();
    await page.locator('[data-lesson-search]').fill('Carousel');
    await expect(page.locator('[data-lesson-card]:not([hidden])')).toHaveCount(2);

    // Loop stage switcher
    await page.locator('[data-stage-trigger="publish"]').click();
    await expect(page.locator('[data-stage-panel="publish"]')).toBeVisible();
  });

  test('PL homepage renders native Polish copy and switches to matching Polish lesson', async ({ page }) => {
    await page.goto('/pl/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.locator('h1')).toContainText('żywy system marki');
    await expect(page.locator('[data-lesson-card]')).toHaveCount(12);

    await page.locator('a[href="/pl/lessons/mcp-for-marketing-and-content-systems/"]').first().click();
    await expect(page).toHaveURL(/\/pl\/lessons\/mcp-for-marketing-and-content-systems\/$/);
    await expect(page.locator('h1')).toContainText('Model Context Protocol (MCP) w praktyce');
  });

  test('Lesson page interactive checklist updates score and language switcher links to exact counterpart', async ({ page }) => {
    await page.goto('/lessons/two-phase-commit-for-ai-agents/');
    await expect(page.locator('h1')).toContainText('Prepare → Confirm');

    const scoreBadge = page.locator('[data-checklist-score]');
    await expect(scoreBadge).toContainText('0 / 4');

    const firstCheck = page.locator('[data-checklist-root] input[type="checkbox"]').first();
    await firstCheck.check();
    await expect(scoreBadge).toContainText('1 / 4');

    // Language switcher points to exact Polish lesson
    const plSwitch = page.locator('.language-nav a[lang="pl"]');
    await expect(plSwitch).toHaveAttribute('href', '/pl/lessons/two-phase-commit-for-ai-agents/?lang=pl');
  });

  test('Playbooks, Glossary, Contact Dialog, and mobile responsiveness work without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/playbooks/');
    await expect(page.locator('h1')).toContainText('Copy-ready blueprints');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);

    await page.goto('/pl/glossary/');
    await expect(page.locator('h1')).toContainText('Leksykon Połączonego Systemu Marki');

    // Open mobile menu and trigger contact dialog
    await page.locator('[data-mobile-menu] summary').click();
    await page.locator('[data-mobile-menu] [data-open-contact]').click();
    await expect(page.locator('[data-contact-dialog]')).toBeVisible();
    await page.locator('[data-close-contact]').click();
    await expect(page.locator('[data-contact-dialog]')).toBeHidden();
  });
});
