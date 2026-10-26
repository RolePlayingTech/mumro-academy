import { test, expect } from '@playwright/test';

test('Lesson 14, Lesson 15, and Lesson 16 render Markdown emphasis as HTML strong, preserving inline code (EN and PL)', async ({ page }) => {
  for (const locale of ['pl', 'en'] as const) {
    const path = locale === 'pl' ? '/pl/lessons/mcp-tools-skills-and-product-surfaces/' : '/lessons/mcp-tools-skills-and-product-surfaces/';
    await page.goto(path);

    const paragraphs = page.locator('#hands-on-mini-lab > p');
    await expect(paragraphs.first().locator('strong').first()).toHaveText('Host');
    await expect(paragraphs.first().locator('code').first()).toBeVisible();

    const visibleText = await paragraphs.first().textContent();
    expect(visibleText).not.toContain('**Host**');
    expect(visibleText).not.toContain('**Skill**');

    const html = await paragraphs.first().innerHTML();
    expect(html).toContain('<strong>Host</strong>');
    expect(html).not.toContain('<strong><code');

    const l15Path =
      locale === 'pl'
        ? '/pl/lessons/playwright-browser-automation-and-verification/'
        : '/lessons/playwright-browser-automation-and-verification/';
    await page.goto(l15Path);
    const l15Text = (await page.locator('#hands-on-mini-lab > p').allTextContents()).join(' ');
    expect(l15Text).not.toContain('**');
    await expect(page.locator('#hands-on-mini-lab > p strong').first()).toBeVisible();

    const l16Path =
      locale === 'pl'
        ? '/pl/lessons/git-and-github-for-ai-coding-agents/'
        : '/lessons/git-and-github-for-ai-coding-agents/';
    await page.goto(l16Path);
    const l16Text = (await page.locator('#hands-on-lab-a-first-pr > p').allTextContents()).join(' ');
    expect(l16Text).not.toContain('**');
    await expect(page.locator('#hands-on-lab-a-first-pr > p strong').first()).toBeVisible();
  }
});
