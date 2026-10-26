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


// Regression: one unmatched backtick must not turn Lesson 16's bold/code into literal Markdown.
test('Lesson 16 GitHub review section renders every paragraph with balanced inline markup (EN and PL)', async ({ page }) => {
  for (const locale of ['en', 'pl'] as const) {
    const prefix = locale === 'pl' ? '/pl' : '';
    await page.goto(`${prefix}/lessons/git-and-github-for-ai-coding-agents/`);
    const paragraphs = page.locator('#github-work-governance-and-pr-review > p');
    await expect(paragraphs).toHaveCount(4);

    // Ignore legitimate Markdown-looking glob strings inside <code>, e.g. tests/**.
    // Only unparsed markup left in plain text nodes is an actual rendering defect.
    for (const paragraph of await paragraphs.all()) {
      const plainText = await paragraph.evaluate((node) =>
        Array.from(node.childNodes)
          .filter((child) => child.nodeType === Node.TEXT_NODE)
          .map((child) => child.textContent ?? '')
          .join('')
      );
      expect(plainText).not.toContain('**');
      expect(plainText).not.toContain('`');
    }

    const review = paragraphs.last();
    await expect(review.locator('code')).toContainText(['tests/**']);
    await expect(review.locator('strong').last()).toHaveText(
      locale === 'pl' ? 'niezależnego recenzenta' : 'independent reviewer'
    );
  }
});

test('Lesson 14 keeps long specification URL within 390px mobile viewport (EN and PL)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of ['en', 'pl'] as const) {
    const prefix = locale === 'pl' ? '/pl' : '';
    await page.goto(`${prefix}/lessons/mcp-tools-skills-and-product-surfaces/`);
    await expect(page.locator('#designing-the-surface')).toBeVisible();
    const sizes = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(sizes.document).toBeLessThanOrEqual(sizes.viewport);
  }
});

test('Copyable playbook and CLI snippets can receive keyboard focus (EN and PL)', async ({ page }) => {
  for (const locale of ['en', 'pl'] as const) {
    const prefix = locale === 'pl' ? '/pl' : '';
    await page.goto(`${prefix}/`);
    const cli = page.locator('.tool-cli pre');
    expect(await cli.count()).toBeGreaterThan(0);
    await expect(cli.first()).toHaveAttribute('tabindex', '0');

    await page.goto(`${prefix}/playbooks/`);
    const templates = page.locator('.code-block-wrap pre');
    expect(await templates.count()).toBeGreaterThan(0);
    await expect(templates.first()).toHaveAttribute('tabindex', '0');
  }
});
