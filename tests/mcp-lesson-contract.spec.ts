import { test, expect } from '@playwright/test';
import { mcpSurfaceLesson } from '../src/content/lesson-mcp-tools-skills';

test('Lesson 14 teaches an honest authorization boundary in EN and PL', () => {
  for (const locale of ['en', 'pl'] as const) {
    const lesson = mcpSurfaceLesson[locale];
    const design = lesson.sections.find((section) => section.id === 'designing-the-surface');
    const mumro = lesson.sections.find((section) => section.id === 'how-mumro-built-it');
    const injection = lesson.sections.find((section) => section.id === 'untrusted-data-and-isolation');
    const product = lesson.sections.find((section) => section.id === 'mcp-as-product-quality');
    const lab = lesson.sections.find((section) => section.id === 'hands-on-mini-lab');

    expect(lesson.metaDescription).not.toMatch(/three-tier|trójpoziomowa/);
    expect(lesson.problemStatement.connectedPattern).not.toMatch(/three-tier|trójpoziomowa/);
    expect(lesson.problemStatement.connectedPattern).toMatch(/four-tier|czteropoziomowa/);

    expect(design?.paragraphs.join(' ')).toContain('https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization');
    expect(design?.paragraphs.join(' ')).toContain('publish_now');
    expect(design?.paragraphs.join(' ')).toContain('mumro:publish');

    expect(mumro?.paragraphs.join(' ')).toContain('confirmation_mode=user');
    expect(injection?.paragraphs.join(' ')).toContain('action_id');
    expect(injection?.paragraphs.join(' ')).toMatch(/confirmation phrase|frazę|frazy/);
    expect(injection?.paragraphs.join(' ')).toContain('host');
    expect(product?.paragraphs.length).toBe(5);
    expect(lab?.callout?.text).toMatch(/host|hosta/);
  }
});

test('Lesson 14 sidebar TOC avoids duplicate numbering and scrollable code/reading elements meet accessibility requirements', async ({
  page,
}) => {
  for (const route of [
    '/lessons/mcp-tools-skills-and-product-surfaces/',
    '/pl/lessons/mcp-tools-skills-and-product-surfaces/',
  ]) {
    await page.goto(route);
    const tocTexts = await page.locator('.toc-card ol li a').allTextContents();
    for (const text of tocTexts) {
      expect(text.trim()).not.toMatch(/^\d+\.\s/);
    }
    const preCount = await page.locator('.code-container pre[tabindex="0"]').count();
    expect(preCount).toBe(10);
    await expect(page.locator('#comparison-matrix .table-wrap')).toHaveAttribute('tabindex', '0');
    const categoryColor = await page
      .locator('#further-reading .resource-category')
      .first()
      .evaluate((el) => getComputedStyle(el).color);
    expect(categoryColor).toBe('rgb(182, 49, 19)');
  }
});
