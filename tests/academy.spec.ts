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
  HYBRID_VERIFICATION_CODE,
  LESSON15_LAB_HTML_APP,
} from '../src/content/lesson-playwright-browser-automation';
import { playbooksContent } from '../src/content/playbooks';

test.describe('MUMRO Academy — Bilingual (EN/PL), Interactive & SEO Verification', () => {
  test('EN homepage renders 5-stage loop explorer, 4 tracks, and filterable 15-lesson catalog', async ({ page }) => {
    await page.goto('/?lang=en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('living brand systems');

    const lessonCards = page.locator('[data-lesson-card]');
    await expect(lessonCards).toHaveCount(15);

    // Latest Additions (Lessons 13, 14 & 15) and Open-Source CLI Tools
    await expect(page.locator('[data-latest-lesson]')).toHaveCount(3);
    await expect(page.locator('[data-open-source-tool]')).toHaveCount(3);
    await expect(page.locator('[data-open-source-tool="agent-harness-kit"]')).toContainText('RolePlayingTech/agent-harness-kit');
    await expect(page.locator('[data-open-source-tool="mcp-surface-kit"]')).toContainText('RolePlayingTech/mcp-surface-kit');
    await expect(page.locator('[data-open-source-tool="playwright-harness-kit"]')).toContainText('RolePlayingTech/playwright-harness-kit');

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

  test('Lesson 15 companion contract executes real playwright-harness-kit CLI (origin URL validation, --verify-files, build --prune, and SHA-256 verification)', () => {
    const cliBin = resolve(process.cwd(), 'node_modules/playwright-harness-kit/bin/playwright-harness.mjs');
    expect(existsSync(cliBin), `Expected pinned playwright-harness-kit CLI at ${cliBin}`).toBe(true);

    const playbook07 = playbooksContent.en.items.find((item) => item.id === 'playwright-verification-spec');
    expect(playbook07).toBeDefined();
    const validSpec = JSON.parse(playbook07!.templateCode);

    const workDir = mkdtempSync(join(tmpdir(), 'academy-lesson15-lab-'));
    try {
      const specDir = join(workDir, '.playwright-harness');
      mkdirSync(specDir, { recursive: true });

      // 1. Broken spec with allowSharedStorageState=true under single-use refresh rotation must fail `check --strict`
      const brokenSpec = {
        ...validSpec,
        authSessionPolicy: {
          ...validSpec.authSessionPolicy,
          allowSharedStorageState: true,
        },
      };
      writeFileSync(join(specDir, 'spec.json'), JSON.stringify(brokenSpec, null, 2), 'utf8');
      const cliBroken = spawnSync(process.execPath, [cliBin, 'check', workDir, '--strict'], { encoding: 'utf8' });
      expect(cliBroken.status).toBe(1);
      expect(cliBroken.stdout).toContain('allowSharedStorageState cannot be true when singleUseRefreshRotation is true');

      // 2. Deceptive ui-contract origin (`https://localhost.attacker.example`) must fail URL structural validation
      const deceptiveOriginSpec = {
        ...validSpec,
        tiers: {
          ...validSpec.tiers,
          'ui-contract': {
            ...validSpec.tiers['ui-contract'],
            origin: 'https://localhost.attacker.example',
          },
        },
      };
      writeFileSync(join(specDir, 'spec.json'), JSON.stringify(deceptiveOriginSpec, null, 2), 'utf8');
      const cliDeceptiveOrigin = spawnSync(process.execPath, [cliBin, 'check', workDir, '--strict'], { encoding: 'utf8' });
      expect(cliDeceptiveOrigin.status).toBe(1);
      expect(cliDeceptiveOrigin.stdout).toContain(
        'origin "https://localhost.attacker.example" (host "localhost.attacker.example") is not allowed for ui-contract'
      );

      // 3. Valid Playbook 07 browser verification spec + extra temporary skill to test `build --prune`
      const twoSkillSpec = {
        ...validSpec,
        skills: [
          ...validSpec.skills,
          {
            name: 'temporary-audit-skill',
            description: 'Temporary browser skill for mobile layout checks. Use when auditing temporary mobile scenarios.',
            covers: ['M-UX-01'],
          },
        ],
      };
      writeFileSync(join(specDir, 'spec.json'), JSON.stringify(twoSkillSpec, null, 2), 'utf8');
      const cliInitialBuild = spawnSync(process.execPath, [cliBin, 'build', workDir], { encoding: 'utf8' });
      expect(cliInitialBuild.status).toBe(0);
      expect(existsSync(join(workDir, '.claude/skills/temporary-audit-skill/SKILL.md'))).toBe(true);

      // Remove `temporary-audit-skill` from spec.json and run `build --prune`
      writeFileSync(join(specDir, 'spec.json'), JSON.stringify(validSpec, null, 2), 'utf8');
      const cliBuildPrune = spawnSync(process.execPath, [cliBin, 'build', workDir, '--prune'], { encoding: 'utf8' });
      expect(cliBuildPrune.status).toBe(0);
      expect(cliBuildPrune.stdout).toContain('[prune    ] .claude/skills/temporary-audit-skill/SKILL.md');
      expect(existsSync(join(workDir, '.claude/skills/temporary-audit-skill/SKILL.md'))).toBe(false);

      const cliCheck = spawnSync(process.execPath, [cliBin, 'check', workDir, '--strict'], { encoding: 'utf8' });
      expect(cliCheck.status).toBe(0);
      expect(cliCheck.stdout.trim()).toBe(
        'PASS: Playwright verification spec is internally consistent (strict mode, 0 warnings).'
      );

      // 4. `--verify-files` must fail when scenario `.spec.ts` files do not exist on disk
      const cliMissingFiles = spawnSync(process.execPath, [cliBin, 'check', workDir, '--strict', '--verify-files'], {
        encoding: 'utf8',
      });
      expect(cliMissingFiles.status).toBe(1);
      expect(cliMissingFiles.stdout).toContain(
        'M-AUTH-01: spec file "frontend/e2e/ui-contract/auth-session.spec.ts" does not exist on disk'
      );

      // 5. Write scenario `.spec.ts` files, `frontend/package.json`, and `.gitignore` and verify `--verify-files` passes
      mkdirSync(join(workDir, 'frontend/e2e/ui-contract'), { recursive: true });
      writeFileSync(
        join(workDir, 'frontend/e2e/ui-contract/auth-session.spec.ts'),
        HYBRID_VERIFICATION_CODE,
        'utf8'
      );
      writeFileSync(
        join(workDir, 'frontend/e2e/ui-contract/ux-shell-mobile.spec.ts'),
        HYBRID_VERIFICATION_CODE,
        'utf8'
      );
      writeFileSync(
        join(workDir, 'frontend/package.json'),
        JSON.stringify(
          {
            name: 'mumro-web-verification-fixture',
            private: true,
            scripts: {
              'test:e2e:contract': 'playwright test',
              'test:e2e:integrated': 'playwright test',
            },
          },
          null,
          2
        ),
        'utf8'
      );
      writeFileSync(
        join(workDir, '.gitignore'),
        'playwright-report/\ntest-results/\nplaywright/.auth/\n',
        'utf8'
      );

      const cliVerified = spawnSync(
        process.execPath,
        [cliBin, 'check', workDir, '--strict', '--verify-files', '--json'],
        { encoding: 'utf8' }
      );
      expect(cliVerified.status).toBe(0);
      const verifiedReport = JSON.parse(cliVerified.stdout);
      expect(verifiedReport.ok).toBe(true);
      const evidenceByPolicy = Object.fromEntries(
        verifiedReport.evidence.map((entry: { policy: string; status: string }) => [entry.policy, entry.status])
      );
      expect(evidenceByPolicy.scenarioSpecFiles).toBe('observed');
      expect(evidenceByPolicy.tierCommands).toBe('observed');
      expect(evidenceByPolicy.gitIgnoreHygiene).toBe('observed');
      expect(evidenceByPolicy.uiContractNetworkIsolation).toBe('not-verified');

      const builtSkill = readFileSync(join(workDir, '.claude/skills/verify-browser-scenarios/SKILL.md'), 'utf8');
      const markerMatch = builtSkill.match(/<!-- playwright-harness-kit:managed sha256=([a-f0-9]{64}) -->/);
      expect(markerMatch).not.toBeNull();
      const recordedDigest = markerMatch![1];
      const zeroedSkill = builtSkill.replace(
        `<!-- playwright-harness-kit:managed sha256=${recordedDigest} -->`,
        `<!-- playwright-harness-kit:managed sha256=${'0'.repeat(64)} -->`
      );
      const computedDigest = createHash('sha256').update(zeroedSkill, 'utf8').digest('hex');
      expect(computedDigest).toBe(recordedDigest);

      console.log(
        `PASS: Executed real playwright-harness-kit CLI (${cliBin}) against Playbook 07 / Lesson 15 spec (sha256=${recordedDigest}).`
      );
    } finally {
      rmSync(workDir, { recursive: true, force: true });
    }
  });

  test('Lesson 15 executable offline UI lab reproduces broken state and verifies fixed state under fail-closed ui-contract fixture', async ({ browser }) => {
    const ORIGIN = 'https://offline-ui-contract.invalid';
    const context = await browser.newContext({
      baseURL: ORIGIN,
      serviceWorkers: 'block',
    });

    try {
      const blockedRequests: string[] = [];
      let forgotPasswordCalls = 0;

      await context.routeWebSocket(/.*/, (ws) => {
        ws.close({ code: 1008, reason: 'Blocked by ui-contract networkPolicy: deny-unhandled' });
      });

      await context.route('**/*', async (route) => {
        const req = route.request();
        const url = new URL(req.url());

        if (url.origin !== ORIGIN || url.username || url.password) {
          blockedRequests.push(req.url());
          return route.abort('blockedbyclient');
        }

        if (url.pathname === '/api/auth/password/forgot' && req.method() === 'POST') {
          forgotPasswordCalls += 1;
          return route.fulfill({
            status: 503,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'service_unavailable' }),
          });
        }

        if (url.pathname === '/' || url.pathname === '/forgot-password') {
          return route.fulfill({
            status: 200,
            contentType: 'text/html; charset=utf-8',
            body: LESSON15_LAB_HTML_APP,
          });
        }

        blockedRequests.push(req.url());
        await route.abort('blockedbyclient');
      });

      const page = await context.newPage();

      // 1. BROKEN MODE (`/forgot-password?mode=broken`): reproduce both intentional bugs
      await page.goto(`${ORIGIN}/forgot-password?mode=broken`);
      const emailInput = page.getByLabel('Email');
      await emailInput.fill('qa-reset@example.invalid');
      await page.getByRole('button', { name: 'Send reset link' }).click();
      await expect(page.getByRole('alert')).toBeVisible();
      // Bug 1 reproduced: broken mode wipes the user's email input on HTTP 503 and fires a duplicate background POST
      await expect(emailInput).toHaveValue('');
      await page.waitForTimeout(120);
      expect(forgotPasswordCalls).toBe(2);

      await page.setViewportSize({ width: 390, height: 844 });
      const drawer = page.getByRole('dialog', { name: 'Release schedule preview' });
      const closeBtn = page.getByRole('button', { name: 'Close drawer' });
      // ARIA snapshot sees the dialog and button as visible, but DOM geometry catches the 540px overflow on 390px viewport
      await expect(drawer).toBeVisible();
      await expect(closeBtn).toBeVisible();
      const brokenOverflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(brokenOverflow.scrollWidth).toBeGreaterThan(brokenOverflow.innerWidth);
      const brokenCloseBox = await closeBtn.boundingBox();
      expect(brokenCloseBox).not.toBeNull();
      expect(brokenCloseBox!.x + brokenCloseBox!.width).toBeGreaterThan(390);

      // 2. FIXED MODE (`/forgot-password?mode=fixed`): verify M-AUTH-01 and M-UX-01 pass
      forgotPasswordCalls = 0;
      await page.goto(`${ORIGIN}/forgot-password?mode=fixed`);
      await emailInput.fill('qa-reset@example.invalid');
      await page.getByRole('button', { name: 'Send reset link' }).click();
      await expect(page.getByRole('alert')).toBeVisible();
      await expect(emailInput).toHaveValue('qa-reset@example.invalid');
      await page.waitForTimeout(120);
      expect(forgotPasswordCalls).toBe(1);

      await page.setViewportSize({ width: 390, height: 844 });
      await expect(drawer).toBeVisible();
      await expect(closeBtn).toBeVisible();
      const fixedOverflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(fixedOverflow.scrollWidth).toBeLessThanOrEqual(fixedOverflow.innerWidth);
      const fixedCloseBox = await closeBtn.boundingBox();
      expect(fixedCloseBox).not.toBeNull();
      expect(fixedCloseBox!.x).toBeGreaterThanOrEqual(0);
      expect(fixedCloseBox!.x + fixedCloseBox!.width).toBeLessThanOrEqual(390);
      expect(blockedRequests).toEqual([]);

      // 3. NEGATIVE BOUNDARY TEST: unmocked third-party request is blocked by default-deny route
      await expect(page.evaluate(() => fetch('https://analytics.example.com/ping'))).rejects.toThrow();
      expect(blockedRequests).toEqual(['https://analytics.example.com/ping']);
    } finally {
      await context.close();
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

  test('Lesson 15 (Playwright & Multimodal Browser Verification) renders browser modality simulator and hands-on mini-lab in PL and EN', async ({ page }) => {
    await page.goto('/pl/lessons/playwright-browser-automation-and-verification/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.locator('h1')).toContainText('Playwright');

    await expect(page.locator('[data-browser-panel="hybrid"]')).toBeVisible();
    await page.locator('[data-browser-mode="aria"]').click();
    await expect(page.locator('[data-browser-panel="aria"]')).toBeVisible();

    await page.locator('[data-browser-layer-trigger="session"]').click();
    await expect(page.locator('[data-browser-layer-panel="session"]')).toBeVisible();

    await expect(page.locator('#hands-on-mini-lab')).toContainText('examples/offline-ui');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('--verify-files');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('?mode=broken');

    await page.goto('/lessons/playwright-browser-automation-and-verification/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('Playwright');
    await expect(page.locator('[data-browser-panel="hybrid"]')).toBeVisible();
    await expect(page.locator('#hands-on-mini-lab')).toContainText('examples/offline-ui');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('--verify-files');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('?mode=fixed');
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
