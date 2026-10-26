import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test, expect } from '@playwright/test';
import { learningJourneys, lessonPractice } from '../src/content/learning-journeys';
import { lessonSlugs } from '../src/lib/contracts';
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
import {
  HYBRID_VERIFICATION_CODE,
  LESSON15_LAB_HTML_APP,
  UI_CONTRACT_FIXTURE_CODE,
} from '../src/content/lesson-playwright-browser-automation';
import { playbooksContent } from '../src/content/playbooks';

test.describe('MUMRO Academy — Bilingual (EN/PL), Interactive & SEO Verification', () => {
  test('EN homepage renders 5-stage loop explorer, 4 tracks, and filterable 16-lesson catalog', async ({ page }) => {
    await page.goto('/?lang=en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('living brand systems');

    const lessonCards = page.locator('[data-lesson-card]');
    await expect(lessonCards).toHaveCount(16);

    // Latest Additions (Lessons 13, 14, 15 & 16) and Open-Source CLI Tools
    await expect(page.locator('[data-latest-lesson]')).toHaveCount(4);
    await expect(page.locator('[data-open-source-tool]')).toHaveCount(4);
    await expect(page.locator('[data-open-source-tool="agent-harness-kit"]')).toContainText('RolePlayingTech/agent-harness-kit');
    await expect(page.locator('[data-open-source-tool="mcp-surface-kit"]')).toContainText('RolePlayingTech/mcp-surface-kit');
    await expect(page.locator('[data-open-source-tool="playwright-harness-kit"]')).toContainText('RolePlayingTech/playwright-harness-kit');
    await expect(page.locator('[data-open-source-tool="playwright-harness-kit"]')).toContainText(
      'Helps specify and check browser verification constraints'
    );
    await expect(page.locator('[data-open-source-tool="playwright-harness-kit"]')).not.toContainText(
      'Prevents brittle'
    );
    await expect(page.locator('[data-open-source-tool="git-agent-workflow-kit"]')).toContainText('RolePlayingTech/git-agent-workflow-kit');

    // Dynamic lesson counts per track (3 vs 7)
    await expect(page.locator('#tracks')).toContainText('Lessons in this track (3):');
    await expect(page.locator('#tracks')).toContainText('Lessons in this track (7):');

    // Filter by Track 04 (Agents & MCP)
    await page.locator('[data-track-filter="agents-mcp-governance"]').click();
    await expect(page.locator('[data-lesson-card]:not([hidden])')).toHaveCount(7);

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
    await expect(page.locator('[data-lesson-card]')).toHaveCount(16);
    await expect(page.locator('[data-latest-lesson]')).toHaveCount(4);
    await expect(page.locator('[data-open-source-tool]')).toHaveCount(4);
    await expect(page.locator('[data-open-source-tool="playwright-harness-kit"]')).toContainText(
      'Pomaga wyspecyfikować i statycznie sprawdzić ograniczenia weryfikacji'
    );
    await expect(page.locator('[data-open-source-tool="playwright-harness-kit"]')).not.toContainText(
      'Eliminuje kruche klikanie'
    );
    await expect(page.locator('#tracks')).toContainText('W tej ścieżce (3 lekcje):');
    await expect(page.locator('#tracks')).toContainText('W tej ścieżce (7 lekcji):');

    await page.locator('#tracks a[href="/pl/lessons/mcp-for-marketing-and-content-systems/"]').first().click();
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

    // 0. Assert Lesson 15 code snippets stay byte-for-byte synced with `examples/offline-ui/` (Issue #15)
    const offlineUiRoot = resolve(process.cwd(), 'node_modules/playwright-harness-kit/examples/offline-ui');
    const normalizeLf = (text: string) => text.replace(/\r\n/g, '\n').trim();
    expect(normalizeLf(LESSON15_LAB_HTML_APP)).toBe(
      normalizeLf(readFileSync(join(offlineUiRoot, 'app/index.html'), 'utf8'))
    );
    expect(normalizeLf(UI_CONTRACT_FIXTURE_CODE)).toBe(
      normalizeLf(readFileSync(join(offlineUiRoot, 'e2e/fixtures.ts'), 'utf8'))
    );
    expect(normalizeLf(HYBRID_VERIFICATION_CODE)).toBe(
      normalizeLf(readFileSync(join(offlineUiRoot, 'e2e/ui-contract.spec.ts'), 'utf8'))
    );

    // Verify `check --verify-files --json` observes `DEMO-AUTH-01` & `DEMO-UX-01` in the runnable offline UI lab
    // (Note: npm strips `.gitignore` inside `node_modules/`, so we assert `errors === []` and `scenarioSpecFiles`/`tierCommands` === `'observed'`)
    const cliOfflineUi = spawnSync(
      process.execPath,
      [cliBin, 'check', offlineUiRoot, '--verify-files', '--json'],
      { encoding: 'utf8' }
    );
    expect(cliOfflineUi.status).toBe(0);
    const offlineUiReport = JSON.parse(cliOfflineUi.stdout);
    expect(offlineUiReport.errors).toEqual([]);
    const offlineUiEvidence = Object.fromEntries(
      offlineUiReport.evidence.map((entry: { policy: string; status: string }) => [entry.policy, entry.status])
    );
    expect(offlineUiEvidence.scenarioSpecFiles).toBe('observed');
    expect(offlineUiEvidence.tierCommands).toBe('observed');

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

      // 3b. Issue #6 regression: tampered `.managed-manifest.json` with `README.md` or unmanaged `SKILL.md` must never be deleted by `build --prune --force`
      writeFileSync(join(workDir, 'README.md'), '# Protected Repository Readme\n', 'utf8');
      mkdirSync(join(workDir, '.claude/skills/manual-unmanaged'), { recursive: true });
      writeFileSync(
        join(workDir, '.claude/skills/manual-unmanaged/SKILL.md'),
        '# Hand-authored unmanaged skill\n',
        'utf8'
      );
      writeFileSync(
        join(specDir, '.managed-manifest.json'),
        JSON.stringify(
          {
            version: 1,
            skillTargets: ['.playwright-harness/skills', '.claude/skills'],
            managedFiles: [
              '.playwright-harness/skills/verify-browser-scenarios/SKILL.md',
              '.claude/skills/verify-browser-scenarios/SKILL.md',
              'README.md',
              '.claude/skills/manual-unmanaged/SKILL.md',
            ],
          },
          null,
          2
        ),
        'utf8'
      );
      const cliTamperedPrune = spawnSync(
        process.execPath,
        [cliBin, 'build', workDir, '--prune', '--force'],
        { encoding: 'utf8' }
      );
      expect(cliTamperedPrune.status).toBe(0);
      expect(cliTamperedPrune.stdout).toContain('rejected untrusted entry "README.md"');
      expect(cliTamperedPrune.stdout).toContain(
        'ignoring unmanaged file ".claude/skills/manual-unmanaged/SKILL.md" (missing playwright-harness-kit ownership marker; refusing to delete even with --force)'
      );
      expect(readFileSync(join(workDir, 'README.md'), 'utf8')).toBe('# Protected Repository Readme\n');
      expect(readFileSync(join(workDir, '.claude/skills/manual-unmanaged/SKILL.md'), 'utf8')).toBe(
        '# Hand-authored unmanaged skill\n'
      );

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
        `// M-AUTH-01\n${HYBRID_VERIFICATION_CODE}`,
        'utf8'
      );
      writeFileSync(
        join(workDir, 'frontend/e2e/ui-contract/ux-shell-mobile.spec.ts'),
        `// M-UX-01\n${HYBRID_VERIFICATION_CODE}`,
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

  test('Lesson 15 executable offline UI lab reproduces broken state and verifies fixed state under fail-closed ui-contract fixture', async ({ browser }, testInfo) => {
    const ORIGIN = 'https://offline-ui-contract.invalid';
    const context = await browser.newContext({
      baseURL: ORIGIN,
      serviceWorkers: 'block',
    });

    try {
      const blockedRequests: string[] = [];
      const blockedWebSockets: string[] = [];
      let forgotPasswordCalls = 0;

      await context.routeWebSocket(/.*/, (ws) => {
        blockedWebSockets.push(ws.url());
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

      // 1. BROKEN MODE (`/forgot-password?mode=broken`): reproduce both intentional bugs (DEMO-AUTH-01 & DEMO-UX-01)
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

      const brokenScreenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('demo-ux-01-mobile-390x844-broken.png', {
        body: brokenScreenshot,
        contentType: 'image/png',
      });

      const brokenOverflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(brokenOverflow.scrollWidth).toBeGreaterThan(brokenOverflow.innerWidth);
      const brokenCloseBox = await closeBtn.boundingBox();
      expect(brokenCloseBox).not.toBeNull();
      expect(brokenCloseBox!.x + brokenCloseBox!.width).toBeGreaterThan(390);

      // 2. FIXED MODE (`/forgot-password?mode=fixed`): verify DEMO-AUTH-01 and DEMO-UX-01 pass
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

      const fixedScreenshot = await page.screenshot({ fullPage: true });
      expect(fixedScreenshot.byteLength).toBeGreaterThan(1000);
      await testInfo.attach('demo-ux-01-mobile-390x844-fixed.png', {
        body: fixedScreenshot,
        contentType: 'image/png',
      });
      await testInfo.attach('demo-ux-01-visual-rubric-fixed.json', {
        body: Buffer.from(
          JSON.stringify(
            {
              scenarioId: 'DEMO-UX-01',
              mode: 'fixed',
              viewport: '390x844',
              syntheticFixturesOnly: true,
              nonDeterministicVisualComplement: true,
              rubric4Point: ['Truncation', 'Occlusion', 'Alignment', 'Contrast'],
            },
            null,
            2
          ),
          'utf8'
        ),
        contentType: 'application/json',
      });

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
      expect(blockedWebSockets).toEqual([]);

      // 3. NEGATIVE BOUNDARY TEST: unmocked third-party HTTP request and WebSocket are both blocked by default-deny route
      await expect(page.evaluate(() => fetch('https://analytics.example.com/ping'))).rejects.toThrow();
      const wsClose = await page.evaluate(
        () =>
          new Promise<{ code: number; wasClean: boolean }>((resolveWs) => {
            const ws = new WebSocket('wss://realtime.example.com/socket');
            ws.addEventListener('close', (event) => {
              resolveWs({ code: event.code, wasClean: event.wasClean });
            });
          })
      );
      expect(wsClose.code).toBe(1008);
      expect(blockedRequests).toEqual(['https://analytics.example.com/ping']);
      expect(blockedWebSockets).toEqual(['wss://realtime.example.com/socket']);
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

  test('Lesson 15 (Playwright & Multimodal Browser Verification) renders browser modality simulator and hands-on mini-lab in PL and EN', async ({ page }) => {
    await page.goto('/pl/lessons/playwright-browser-automation-and-verification/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.locator('h1')).toContainText('Playwright');

    await expect(page.locator('[data-browser-panel="hybrid"]')).toBeVisible();
    await page.locator('[data-browser-mode="aria"]').click();
    await expect(page.locator('[data-browser-panel="aria"]')).toBeVisible();

    await page.locator('[data-browser-layer-trigger="session"]').click();
    await expect(page.locator('[data-browser-layer-panel="session"]')).toBeVisible();

    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('npm install -g @playwright/cli@latest');
    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('playwright-cli install --skills');
    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('playwright-cli open https://demo.playwright.dev/todomvc/');
    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('playwright-cli snapshot');
    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('playwright-cli type "Buy groceries"');
    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('playwright-cli press Enter');
    await expect(
      page.locator('#playwright-mcp-and-test-agents a[href="https://playwright.dev/docs/getting-started-cli"]')
    ).toBeVisible();

    await expect(page.locator('#hands-on-mini-lab')).toContainText('examples/offline-ui');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('DEMO-AUTH-01');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('DEMO-UX-01');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('--verify-files');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('?mode=broken');

    await page.goto('/lessons/playwright-browser-automation-and-verification/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('Playwright');
    await expect(page.locator('[data-browser-panel="hybrid"]')).toBeVisible();
    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('npm install -g @playwright/cli@latest');
    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('playwright-cli install --skills');
    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('playwright-cli open https://demo.playwright.dev/todomvc/');
    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('playwright-cli snapshot');
    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('playwright-cli type "Buy groceries"');
    await expect(page.locator('#playwright-mcp-and-test-agents')).toContainText('playwright-cli press Enter');
    await expect(
      page.locator('#playwright-mcp-and-test-agents a[href="https://playwright.dev/docs/getting-started-cli"]')
    ).toBeVisible();
    await expect(page.locator('#hands-on-mini-lab')).toContainText('examples/offline-ui');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('DEMO-AUTH-01');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('DEMO-UX-01');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('--verify-files');
    await expect(page.locator('#hands-on-mini-lab')).toContainText('?mode=fixed');
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

test.describe('MUMRO Academy — guided learning journeys', () => {
  test('the role-based paths cover all lessons without duplicates and agree across locales', () => {
    const en = learningJourneys.en;
    const pl = learningJourneys.pl;
    expect(en.map((route) => route.id)).toEqual(pl.map((route) => route.id));

    for (const locale of ['en', 'pl'] as const) {
      const covered = new Set<string>();
      for (const journey of learningJourneys[locale]) {
        expect(new Set(journey.lessonSlugs).size).toBe(journey.lessonSlugs.length);
        expect(journey.lessonSlugs.length).toBeGreaterThan(0);
        journey.lessonSlugs.forEach((slug) => covered.add(slug));
      }
      expect([...covered].sort()).toEqual([...lessonSlugs].sort());
      lessonSlugs.forEach((slug) => {
        const practice = lessonPractice[locale][slug];
        expect(practice.objective.length).toBeGreaterThan(5);
        expect(practice.assignment.length).toBeGreaterThan(20);
        expect(practice.evidence.length).toBeGreaterThan(15);
        expect(practice.prerequisites).not.toContain(slug);
        practice.prerequisites.forEach((dependency) => expect(lessonSlugs).toContain(dependency));
      });
    }
    en.forEach((journey, index) => {
      expect(journey.lessonSlugs).toEqual(pl[index]!.lessonSlugs);
    });
  });

  test('a newcomer sees guided routes before newest releases, in English and Polish', async ({ page }) => {
    for (const root of ['/', '/pl/']) {
      await page.goto(root);
      const cards = page.locator('[data-learning-journey]');
      await expect(cards).toHaveCount(3);
      await expect(cards.nth(0).locator('a.journey-start')).toHaveAttribute(
        'href', root + 'lessons/versioned-brand-strategy/'
      );
      await cards.nth(0).locator('summary').click();
      await expect(cards.nth(0).locator('ol li')).toHaveCount(9);
      await expect(cards.nth(1).locator('a.journey-start')).toHaveAttribute(
        'href', root + 'lessons/evidence-led-research-pipelines/'
      );
      await cards.nth(2).locator('summary').click();
      await expect(cards.nth(2).locator('ol li')).toHaveCount(7);
      await expect(cards.nth(2).locator(`a[href="${root}lessons/playwright-browser-automation-and-verification/"]`)).toHaveCount(1);
      await expect(cards.nth(2).locator(`a[href="${root}lessons/git-and-github-for-ai-coding-agents/"]`)).toHaveCount(1);
      const firstId = await page.locator('#learning-routes').evaluate((el) => el.compareDocumentPosition(document.querySelector('#latest-lessons')!));
      expect(firstId & 4).toBe(4);
    }
  });

  test('a lesson offers independent practice, helpful context and correct route links', async ({ page }) => {
    await page.goto('/pl/lessons/mcp-tools-skills-and-product-surfaces/');
    const guidance = page.locator('[data-lesson-practice]');
    await expect(guidance).toBeVisible();
    await expect(guidance).toContainText('test odmowy');
    await expect(guidance.locator('a[href="/pl/lessons/mcp-for-marketing-and-content-systems/"]')).toHaveCount(1);
    await expect(guidance.locator('a[href="/pl/#route-agent-engineering"]')).toHaveCount(1);
    await expect(guidance.locator('a[href="/pl/#route-agent-ops"]')).toHaveCount(1);

    await page.goto('/pl/lessons/playwright-browser-automation-and-verification/');
    const pl15Guidance = page.locator('[data-lesson-practice]');
    await expect(pl15Guidance).toBeVisible();
    await expect(pl15Guidance).toContainText('ui-contract');
    await expect(pl15Guidance).toContainText('390×844');
    await expect(pl15Guidance.locator('a[href="/pl/lessons/ai-agent-harness-engineering/"]')).toHaveCount(1);
    await expect(pl15Guidance.locator('a[href="/pl/lessons/mcp-tools-skills-and-product-surfaces/"]')).toHaveCount(1);
    await expect(pl15Guidance.locator('a[href="/pl/#route-agent-engineering"]')).toHaveCount(1);
    await expect(pl15Guidance.locator('a[href="/pl/lessons/git-and-github-for-ai-coding-agents/"]')).toHaveCount(1);

    await page.goto('/lessons/playwright-browser-automation-and-verification/');
    const en15Guidance = page.locator('[data-lesson-practice]');
    await expect(en15Guidance).toBeVisible();
    await expect(en15Guidance).toContainText('ui-contract');
    await expect(en15Guidance).toContainText('390×844');
    await expect(en15Guidance.locator('a[href="/lessons/ai-agent-harness-engineering/"]')).toHaveCount(1);
    await expect(en15Guidance.locator('a[href="/lessons/mcp-tools-skills-and-product-surfaces/"]')).toHaveCount(1);
    await expect(en15Guidance.locator('a[href="/#route-agent-engineering"]')).toHaveCount(1);
    await expect(en15Guidance.locator('a[href="/lessons/git-and-github-for-ai-coding-agents/"]')).toHaveCount(1);

    await page.goto('/pl/lessons/git-and-github-for-ai-coding-agents/');
    const pl16Guidance = page.locator('[data-lesson-practice]');
    await expect(pl16Guidance).toBeVisible();
    await expect(pl16Guidance).toContainText('worktree');
    await expect(pl16Guidance.locator('a[href="/pl/lessons/ai-agent-harness-engineering/"]')).toHaveCount(1);
    await expect(pl16Guidance.locator('a[href="/pl/lessons/playwright-browser-automation-and-verification/"]')).toHaveCount(1);
    await expect(pl16Guidance.locator('a[href="/pl/#route-agent-engineering"]')).toHaveCount(1);

    await page.goto('/lessons/git-and-github-for-ai-coding-agents/');
    const en16Guidance = page.locator('[data-lesson-practice]');
    await expect(en16Guidance).toBeVisible();
    await expect(en16Guidance).toContainText('worktree');
    await expect(en16Guidance.locator('a[href="/lessons/ai-agent-harness-engineering/"]')).toHaveCount(1);
    await expect(en16Guidance.locator('a[href="/lessons/playwright-browser-automation-and-verification/"]')).toHaveCount(1);
    await expect(en16Guidance.locator('a[href="/#route-agent-engineering"]')).toHaveCount(1);

    await page.goto('/lessons/versioned-brand-strategy/');
    await expect(page.locator('[data-lesson-practice]')).toContainText('You can start with this lesson.');

    // Mobile 390x844 smoke check for PL journey cards and Lesson 15 & 16 practice panels
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/pl/');
    await page.locator('[data-learning-journey="agent-engineering"] summary').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-learning-journey="agent-engineering"] ol')).toBeVisible();
    const homeOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(homeOverflow).toBe(false);

    await page.goto('/pl/lessons/playwright-browser-automation-and-verification/');
    const lessonOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(lessonOverflow).toBe(false);

    await page.goto('/pl/lessons/git-and-github-for-ai-coding-agents/');
    const lesson16Overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(lesson16Overflow).toBe(false);
  });
});
