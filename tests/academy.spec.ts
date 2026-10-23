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
import {
  LAB_A_EXPECTED_DOCTOR_FAIL,
  LAB_A_EXPECTED_PR_FAIL,
  LAB_A_EXPECTED_PR_PASS,
  LAB_B_EXPECTED_AGENT3_PR_FAIL,
  LAB_B_EXPECTED_CONFLICT_DOCTOR,
} from '../src/content/lesson-git-agent-workflow';

test.describe('MUMRO Academy — Bilingual (EN/PL), Interactive & SEO Verification', () => {
  test('EN homepage renders 5-stage loop explorer, 4 tracks, and filterable 15-lesson catalog', async ({ page }) => {
    await page.goto('/?lang=en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('living brand systems');

    const lessonCards = page.locator('[data-lesson-card]');
    await expect(lessonCards).toHaveCount(15);

    // Latest Additions (Lessons 13, 14 & 16) and Open-Source CLI Tools
    await expect(page.locator('[data-latest-lesson]')).toHaveCount(3);
    await expect(page.locator('[data-open-source-tool]')).toHaveCount(3);
    await expect(page.locator('[data-open-source-tool="agent-harness-kit"]')).toContainText('RolePlayingTech/agent-harness-kit');
    await expect(page.locator('[data-open-source-tool="mcp-surface-kit"]')).toContainText('RolePlayingTech/mcp-surface-kit');
    await expect(page.locator('[data-open-source-tool="git-agent-workflow-kit"]')).toContainText('RolePlayingTech/git-agent-workflow-kit');

    // Dynamic lesson counts per track (3 vs 6)
    await expect(page.locator('#tracks')).toContainText('Lessons in this track (3):');
    await expect(page.locator('#tracks')).toContainText('Lessons in this track (6):');

    // Filter by Track 04 (Agents & MCP)
    await page.locator('[data-track-filter="agents-mcp-governance"]').click();
    await expect(page.locator('[data-lesson-card]:not([hidden])')).toHaveCount(6);

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
    await expect(page.locator('[data-lesson-card]')).toHaveCount(15);
    await expect(page.locator('[data-latest-lesson]')).toHaveCount(3);
    await expect(page.locator('[data-open-source-tool]')).toHaveCount(3);
    await expect(page.locator('#tracks')).toContainText('W tej ścieżce (3 lekcje):');
    await expect(page.locator('#tracks')).toContainText('W tej ścieżce (6 lekcji):');

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
    await expect(page.locator('#hands-on-mini-lab')).toContainText('## Responsibility boundary');

    await page.goto('/lessons/mcp-tools-skills-and-product-surfaces/');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('prepare_note_publish');
    await expect(page.locator('#hands-on-mini-lab')).toContainText(
      '<!-- mcp-surface-kit:managed sha256=fc3052dd77ffb6e8b9a7a33c38b03f55a442ca2063641c4a99af713527cfc3d4 -->'
    );
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

  test('Lesson 16 hands-on Lab A & Lab B contract executes real git-agent-workflow-kit CLI (sandbox, doctor, pr-ready, recovery-plan)', () => {
    const cliBin = resolve(process.cwd(), 'node_modules/git-agent-workflow-kit/bin/git-agent.mjs');
    expect(existsSync(cliBin), `Expected pinned git-agent-workflow-kit CLI at ${cliBin}`).toBe(true);

    const gitEnv: NodeJS.ProcessEnv = {
      ...process.env,
      GIT_AUTHOR_DATE: '2026-10-20T11:00:00Z',
      GIT_COMMITTER_DATE: '2026-10-20T11:00:00Z',
      GIT_AUTHOR_NAME: 'MUMRO Academy Learner',
      GIT_AUTHOR_EMAIL: 'learner@academy.mumro.io',
      GIT_COMMITTER_NAME: 'MUMRO Academy Learner',
      GIT_COMMITTER_EMAIL: 'learner@academy.mumro.io',
    };

    const childNodeEnv: NodeJS.ProcessEnv = { ...gitEnv };
    delete childNodeEnv.NODE_TEST_CONTEXT;

    const runCli = (args: string[], cwd: string) =>
      spawnSync(process.execPath, [cliBin, ...args], {
        cwd,
        encoding: 'utf8',
        env: gitEnv,
      });

    const runGit = (args: string[], cwd: string) =>
      spawnSync('git', args, {
        cwd,
        encoding: 'utf8',
        env: gitEnv,
      });

    const runNodeTests = (cwd: string) =>
      spawnSync(process.execPath, ['--test'], {
        cwd,
        encoding: 'utf8',
        env: childNodeEnv,
      });

    const workDir = mkdtempSync(join(tmpdir(), 'academy-lesson16-lab-'));
    try {
      // --- LAB A ---
      const labADir = join(workDir, 'lab-a');
      expect(runCli(['sandbox', 'lab-a', labADir], workDir).status).toBe(0);
      const wsA = join(labADir, 'workspace');

      const docA = runCli(['doctor', '.'], wsA);
      expect(docA.status).toBe(1);
      expect(docA.stdout.trim()).toBe(LAB_A_EXPECTED_DOCTOR_FAIL);

      expect(runGit(['switch', '-c', 'feat/session-expiry'], wsA).status).toBe(0);
      writeFileSync(join(wsA, '.gitignore'), 'node_modules/\ndist/\n.env\n.env.*\n!.env.example\n', 'utf8');
      writeFileSync(
        join(wsA, 'tests/auth.test.js'),
        [
          "import test from 'node:test';",
          "import assert from 'node:assert/strict';",
          "import { verifySession } from '../src/auth.js';",
          '',
          "test('accepts session with userId', () => {",
          "  const res = verifySession({ userId: 'usr_01', expiresAt: 2000, now: 1000 });",
          '  assert.strictEqual(res.valid, true);',
          '});',
          '',
          "test('rejects expired session', () => {",
          "  const res = verifySession({ userId: 'usr_01', expiresAt: 1000, now: 1500 });",
          '  assert.strictEqual(res.valid, false);',
          "  assert.strictEqual(res.reason, 'expired');",
          '});',
          '',
        ].join('\n'),
        'utf8'
      );

      // Before fixing src/auth.js, the new session expiry test must fail
      expect(runNodeTests(wsA).status).not.toBe(0);

      writeFileSync(
        join(wsA, 'src/auth.js'),
        [
          'export function verifySession(session) {',
          "  if (!session || typeof session.userId !== 'string') {",
          "    return { valid: false, reason: 'missing-user' };",
          '  }',
          "  if (typeof session.expiresAt === 'number' && typeof session.now === 'number' && session.now >= session.expiresAt) {",
          "    return { valid: false, reason: 'expired' };",
          '  }',
          '  return { valid: true, userId: session.userId };',
          '}',
          '',
        ].join('\n'),
        'utf8'
      );

      // After fixing src/auth.js, both session tests must pass
      expect(runNodeTests(wsA).status).toBe(0);

      writeFileSync(join(wsA, 'src/dashboard.js'), '// Accidental out-of-scope agent edit\n', 'utf8');
      expect(runGit(['add', '.gitignore', 'src/auth.js', 'tests/auth.test.js', 'src/dashboard.js'], wsA).status).toBe(0);
      expect(runGit(['commit', '-m', 'feat: check session expiry'], wsA).status).toBe(0);

      const prFailA = runCli(
        ['pr-ready', '.', '--base', 'main', '--allow', 'src/auth.js', '--allow', 'tests/auth.test.js', '--allow', '.gitignore'],
        wsA
      );
      expect(prFailA.status).toBe(1);
      expect(prFailA.stdout.trim()).toBe(LAB_A_EXPECTED_PR_FAIL);

      expect(runGit(['restore', '--source=main', '--staged', '--worktree', 'src/dashboard.js'], wsA).status).toBe(0);
      expect(runGit(['commit', '--amend', '-m', 'feat: check session expiry'], wsA).status).toBe(0);

      const prPassA = runCli(
        [
          'pr-ready',
          '.',
          '--base',
          'main',
          '--allow',
          'src/auth.js',
          '--allow',
          'tests/auth.test.js',
          '--allow',
          '.gitignore',
          '--strict',
        ],
        wsA
      );
      expect(prPassA.status).toBe(0);
      expect(prPassA.stdout.trim()).toBe(LAB_A_EXPECTED_PR_PASS);

      // --- LAB B ---
      const labBDir = join(workDir, 'lab-b');
      expect(runCli(['sandbox', 'lab-b', labBDir], workDir).status).toBe(0);
      const wsB = join(labBDir, 'workspace');

      expect(runGit(['merge', 'agent-1/auth-audit'], wsB).status).toBe(0);
      const merge2 = runGit(['merge', 'agent-2/dashboard-cards'], wsB);
      expect(merge2.status).not.toBe(0);

      const docBConflict = runCli(['doctor', '.'], wsB);
      expect(docBConflict.status).toBe(1);
      expect(docBConflict.stdout.trim()).toBe(LAB_B_EXPECTED_CONFLICT_DOCTOR);

      const recConflict = runCli(['recovery-plan', '.'], wsB);
      expect(recConflict.status).toBe(0);
      expect(recConflict.stdout).toContain('[conflict-in-progress]');

      // Resolve conflict in src/auth.js keeping both auditedRole and unified v2 header, then commit the merge
      writeFileSync(
        join(wsB, 'src/auth.js'),
        [
          'export function authorizeRequest(req) {',
          "  const role = req?.user?.role ?? 'guest';",
          "  const header = 'X-App-Auth: v2-unified';",
          "  if (role !== 'admin' && role !== 'editor') {",
          '    return { status: 403, allowed: false, header, auditedRole: role };',
          '  }',
          '  return { status: 200, allowed: true, header, auditedRole: role };',
          '}',
          '',
        ].join('\n'),
        'utf8'
      );
      expect(runGit(['add', 'src/auth.js'], wsB).status).toBe(0);
      expect(runGit(['commit', '-m', 'merge: combine agent-1 audit role and agent-2 dashboard cards'], wsB).status).toBe(0);
      expect(runNodeTests(wsB).status).toBe(0);

      expect(runGit(['switch', 'agent-3/fix-tests'], wsB).status).toBe(0);

      const prFailB = runCli(['pr-ready', '.', '--base', 'main', '--allow', 'tests/**', '--strict'], wsB);
      expect(prFailB.status).toBe(1);
      expect(prFailB.stdout.trim()).toBe(LAB_B_EXPECTED_AGENT3_PR_FAIL);

      // Simulate accidental merge of agent-3/fix-tests onto main and recover via git revert -m 1 HEAD
      expect(runGit(['switch', 'main'], wsB).status).toBe(0);
      expect(runGit(['merge', '--no-ff', '-X', 'theirs', 'agent-3/fix-tests', '-m', 'Merge agent-3/fix-tests'], wsB).status).toBe(0);
      const recMerged = runCli(['recovery-plan', '.'], wsB);
      expect(recMerged.status).toBe(0);
      expect(recMerged.stdout).toContain('[bad-merge-on-main]');
      expect(recMerged.stdout).toContain('git revert -m 1 ');

      expect(runGit(['revert', '-m', '1', 'HEAD', '--no-edit'], wsB).status).toBe(0);
      expect(runNodeTests(wsB).status).toBe(0);

      console.log(`PASS: Executed real git-agent-workflow-kit CLI (${cliBin}) for Lab A and Lab B contracts.`);
    } finally {
      rmSync(workDir, { recursive: true, force: true });
    }
  });

  test('Lesson 16 (Git & AI Coding Agents) renders Multi-Agent Git Simulator, Recovery Matrix & Labs A/B in PL and EN', async ({
    page,
  }) => {
    await page.goto('/pl/lessons/git-and-github-for-ai-coding-agents/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.locator('h1')).toContainText('Git to nie przycisk „Zapisz”');

    await expect(page.locator('[data-git-panel="isolated-worktrees"]')).toBeVisible();
    await page.locator('[data-git-mode="shared-main"]').click();
    await expect(page.locator('[data-git-panel="shared-main"]')).toBeVisible();

    await page.locator('[data-git-recovery-trigger="bad-merge"]').click();
    await expect(page.locator('[data-git-recovery-panel="bad-merge"]')).toBeVisible();

    await expect(page.locator('#hands-on-lab-a-first-pr')).toContainText('git-agent-workflow-kit');
    await expect(page.locator('#hands-on-lab-b-three-agents')).toContainText('git revert -m 1');

    await page.goto('/lessons/git-and-github-for-ai-coding-agents/');
    await expect(page.locator('h1')).toContainText('Git Isn’t a Save Button');
    await expect(page.locator('#hands-on-lab-a-first-pr')).toContainText('Out-of-scope file modified: "src/dashboard.js"');
    await expect(page.locator('#hands-on-lab-b-three-agents')).toContainText('Suspicious test modification in "tests/auth.test.js"');
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
