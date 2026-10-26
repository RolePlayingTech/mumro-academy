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
