import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test, expect } from '@playwright/test';
import {
  MINI_LAB_BROKEN_SPEC,
  MINI_LAB_EXPECTED_BUILD_OUT,
  MINI_LAB_EXPECTED_CHECK_FAIL,
  MINI_LAB_EXPECTED_CHECK_PASS,
  MINI_LAB_EXPECTED_SKILL_MD,
  MINI_LAB_FIXED_SPEC,
} from '../src/content/lesson-mcp-tools-skills';

test.describe('MUMRO Academy — Bilingual (EN/PL), Interactive & SEO Verification', () => {
  test('EN homepage renders 5-stage loop explorer, 4 tracks, and filterable 14-lesson catalog', async ({ page }) => {
    await page.goto('/?lang=en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('living brand systems');

    const lessonCards = page.locator('[data-lesson-card]');
    await expect(lessonCards).toHaveCount(14);

    // Latest Additions (Lessons 13 & 14) and Open-Source CLI Tools
    await expect(page.locator('[data-latest-lesson]')).toHaveCount(2);
    await expect(page.locator('[data-open-source-tool]')).toHaveCount(2);
    await expect(page.locator('[data-open-source-tool="agent-harness-kit"]')).toContainText('RolePlayingTech/agent-harness-kit');
    await expect(page.locator('[data-open-source-tool="mcp-surface-kit"]')).toContainText('RolePlayingTech/mcp-surface-kit');

    // Dynamic lesson counts per track (3 vs 5)
    await expect(page.locator('#tracks')).toContainText('Lessons in this track (3):');
    await expect(page.locator('#tracks')).toContainText('Lessons in this track (5):');

    // Filter by Track 04 (Agents & MCP)
    await page.locator('[data-track-filter="agents-mcp-governance"]').click();
    await expect(page.locator('[data-lesson-card]:not([hidden])')).toHaveCount(5);

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
    await expect(page.locator('[data-lesson-card]')).toHaveCount(14);
    await expect(page.locator('[data-latest-lesson]')).toHaveCount(2);
    await expect(page.locator('[data-open-source-tool]')).toHaveCount(2);
    await expect(page.locator('#tracks')).toContainText('W tej ścieżce (3 lekcje):');
    await expect(page.locator('#tracks')).toContainText('W tej ścieżce (5 lekcji):');

    await page.locator('a[href="/pl/lessons/mcp-for-marketing-and-content-systems/"]').first().click();
    await expect(page).toHaveURL(/\/pl\/lessons\/mcp-for-marketing-and-content-systems\/$/);
    await expect(page.locator('h1')).toContainText('Model Context Protocol (MCP) w praktyce');
  });

  test('Lesson 14 hands-on mini-lab contract executes real mcp-surface-kit CLI (check --strict, build, and SHA-256 verification)', () => {
    const cliBin = resolve(process.cwd(), 'node_modules/mcp-surface-kit/bin/mcp-surface.mjs');
    expect(existsSync(cliBin), `Expected pinned mcp-surface-kit CLI at ${cliBin}`).toBe(true);

    const workDir = mkdtempSync(join(tmpdir(), 'academy-lesson14-lab-'));
    try {
      const specDir = join(workDir, '.mcp-surface');
      mkdirSync(specDir, { recursive: true });

      // 1. Broken 3-tool spec must fail `check --strict` with exact output shown in Lesson 14
      writeFileSync(join(specDir, 'spec.json'), JSON.stringify(MINI_LAB_BROKEN_SPEC, null, 2), 'utf8');
      const cliBroken = spawnSync(process.execPath, [cliBin, 'check', workDir, '--strict'], { encoding: 'utf8' });
      expect(cliBroken.status).toBe(1);
      expect(cliBroken.stdout.trim()).toBe(MINI_LAB_EXPECTED_CHECK_FAIL);

      // 2. Unknown or misspelled fields must be rejected by the real CLI
      writeFileSync(
        join(specDir, 'spec.json'),
        JSON.stringify({ ...MINI_LAB_FIXED_SPEC, version: 1, untrustedContent: ['note_markdown'] }, null, 2),
        'utf8'
      );
      const cliUnknown = spawnSync(process.execPath, [cliBin, 'check', workDir, '--strict'], { encoding: 'utf8' });
      expect(cliUnknown.status).toBe(1);
      expect(cliUnknown.stdout).toContain('unknown field "version"');
      expect(cliUnknown.stdout).toContain('unknown field "untrustedContent" (did you mean "untrustedFields"?)');

      // 3. Repaired 4-tool spec must pass `check --strict` with 0 warnings
      writeFileSync(join(specDir, 'spec.json'), JSON.stringify(MINI_LAB_FIXED_SPEC, null, 2), 'utf8');
      const cliFixed = spawnSync(process.execPath, [cliBin, 'check', workDir, '--strict'], { encoding: 'utf8' });
      expect(cliFixed.status).toBe(0);
      expect(cliFixed.stdout.trim()).toBe(MINI_LAB_EXPECTED_CHECK_PASS);

      // 4. `build` must emit exact stdout and generate the exact SKILL.md with verified SHA-256 marker
      const cliBuild = spawnSync(process.execPath, [cliBin, 'build', workDir], { encoding: 'utf8' });
      expect(cliBuild.status).toBe(0);
      expect(cliBuild.stdout.trim()).toBe(MINI_LAB_EXPECTED_BUILD_OUT);

      const builtSkill = readFileSync(join(workDir, '.mcp-surface/skills/publish-notes/SKILL.md'), 'utf8');
      expect(builtSkill).toBe(MINI_LAB_EXPECTED_SKILL_MD);

      const markerMatch = builtSkill.match(/<!-- mcp-surface-kit:managed sha256=([a-f0-9]{64}) -->/);
      expect(markerMatch).not.toBeNull();
      const recordedDigest = markerMatch![1];
      const zeroedSkill = builtSkill.replace(
        `<!-- mcp-surface-kit:managed sha256=${recordedDigest} -->`,
        `<!-- mcp-surface-kit:managed sha256=${'0'.repeat(64)} -->`
      );
      const computedDigest = createHash('sha256').update(zeroedSkill, 'utf8').digest('hex');
      expect(computedDigest).toBe(recordedDigest);
      expect(recordedDigest).toBe('fc3052dd77ffb6e8b9a7a33c38b03f55a442ca2063641c4a99af713527cfc3d4');

      console.log(
        `PASS: Executed real mcp-surface-kit CLI (${cliBin}) against Lesson 14 broken and repaired specs (sha256=${recordedDigest}).`
      );
    } finally {
      rmSync(workDir, { recursive: true, force: true });
    }
  });

  test('Lesson 14 (MCP tools & skills) renders the product-surface simulator and hands-on mini-lab in PL and EN', async ({ page }) => {
    await page.goto('/pl/lessons/mcp-tools-skills-and-product-surfaces/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.locator('h1')).toContainText('MCP, narzędzia i skille');

    await expect(page.locator('[data-surface-panel="designed"]')).toBeVisible();
    await page.locator('[data-surface-mode="clicks"]').click();
    await expect(page.locator('[data-surface-panel="clicks"]')).toBeVisible();

    await page.locator('[data-stack-trigger="gates"]').click();
    await expect(page.locator('[data-stack-panel="gates"]')).toBeVisible();

    await expect(page.locator('#hands-on-mini-lab')).toContainText('prepare_note_publish');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('confirm_note_publish');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('10-minutowego ćwiczenia');
    await expect(page.locator('#hands-on-mini-lab')).not.toContainText('?wiczenia');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('Krok 1 — Zapisz');
    await expect(page.locator('#further-reading .reading-resource')).toHaveCount(22);
    const plResources = page.locator('#further-reading .reading-resource a');
    await expect(plResources.first()).toHaveAttribute('target', '_blank');
    await expect(plResources.first()).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(page.locator('#further-reading')).toContainText('OWASP — MCP Top 10');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('## Responsibility boundary');

    await page.goto('/lessons/mcp-tools-skills-and-product-surfaces/');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('Lessons 11–13');
    await expect(page.locator('#hands-on-mini-lab')).not.toContainText('Lessons 11?13');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('Step 1 — Author');
    await expect(page.locator('#further-reading .reading-resource')).toHaveCount(22);
    const enResources = page.locator('#further-reading .reading-resource a');
    await expect(enResources.first()).toHaveAttribute('target', '_blank');
    await expect(page.locator('#further-reading')).toContainText('OWASP — MCP Top 10');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('prepare_note_publish');
    await expect(page.locator('#hands-on-mini-lab')).toContainText(
      '<!-- mcp-surface-kit:managed sha256=fc3052dd77ffb6e8b9a7a33c38b03f55a442ca2063641c4a99af713527cfc3d4 -->'
    );
  });

  test('llms-full.txt includes Lesson 14 bilingual primary sources', async ({ request }) => {
    const response = await request.get('/llms-full.txt');
    expect(response.ok()).toBe(true);
    const body = await response.text();
    const anthro = 'https://www.anthropic.com/research/writing-tools-for-agents';
    const openai = 'https://developers.openai.com/plugins/build/app-quickstart';
    expect(body.split(anthro).length - 1).toBe(2);
    expect(body.split(openai).length - 1).toBe(2);
    expect(body).not.toContain('https://www.anthropic.com/engineering/writing-tools-for-agents');
    expect(body).not.toContain('https://help.openai.com/en/articles/12515353-build-with-the-apps-sdk');
    expect(body).toContain('OWASP — MCP Top 10');
  });

  test('Lesson 13 (AI Agent Harness Engineering) renders 3 levels, Context Simulator & 5-Layer Anatomy in PL and EN', async ({ page }) => {
    await page.goto('/pl/lessons/ai-agent-harness-engineering/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.locator('h1')).toContainText('Czym jest AI Harness');

    // Interactive Context Window Simulator switches modes
    await expect(page.locator('[data-harness-panel="lean"]')).toBeVisible();
    await page.locator('[data-harness-mode="chat"]').click();
    await expect(page.locator('[data-harness-panel="chat"]')).toBeVisible();

    // Interactive 5-Layer Anatomy switches layers
    await page.locator('[data-anatomy-trigger="memory"]').click();
    await expect(page.locator('[data-anatomy-panel="memory"]')).toBeVisible();
  });

  test('Lesson page interactive checklist updates score and language switcher links to exact counterpart', async ({ page }) => {
    await page.goto('/lessons/two-phase-commit-for-ai-agents/');
    await expect(page.locator('h1')).toContainText('Prepare → Confirm');

    const scoreBadge = page.locator('[data-checklist-score]');
    await expect(scoreBadge).toContainText('0 / 4');

    const firstCheck = page.locator('[data-checklist-root] input[type="checkbox"]').first();
    await firstCheck.check();
    await expect(scoreBadge).toContainText('1 / 4');

    // Interactive MCP lab steps
    await page.locator('[data-mcp-step="prepare"]').click();
    await expect(page.locator('[data-mcp-panel="prepare"]')).toBeVisible();

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
