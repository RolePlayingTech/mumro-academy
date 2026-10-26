import { test, expect } from '@playwright/test';
import { playbooksContent } from '../src/content/playbooks';

test('Playbook 03 documents workspace-bound MCP args and a guarded confirm in both locales', () => {
  for (const locale of ['en', 'pl'] as const) {
    const playbook = playbooksContent[locale].items.find((item) => item.id === 'mcp-campaign-loop-runbook');
    expect(playbook).toBeDefined();
    const example = playbook!.templateCode;

    expect(example).toContain('get_workspace_context({})');
    expect(example).not.toContain('"workspace":');
    expect(example).toContain('"account_id": 42');
    expect(example).toContain('"targets":');
    expect(example).toContain('"operation": "schedule_draft"');
    expect(example).toContain('"scheduled_at": "2026-11-05T17:00:00Z"');
    expect(example).toContain('"confirmation_phrase":');
    expect(example).not.toContain('confirmationToken');
    expect(example).not.toContain('2026-10-11');
    expect(example).toContain('confirmation_mode=user');
  }
});

test('MCP lab uses the Thursday November 5 preview in both locales', async ({ page }) => {
  for (const locale of ['en', 'pl'] as const) {
    const path = locale === 'pl'
      ? '/pl/lessons/two-phase-commit-for-ai-agents/'
      : '/lessons/two-phase-commit-for-ai-agents/';
    await page.goto(path);
    await page.locator('[data-mcp-step="prepare"]').click();
    const preview = page.locator('[data-mcp-panel="prepare"]');
    await expect(preview).toBeVisible();
    await expect(preview).toContainText('18:00 CET');
    await expect(preview).toContainText('schedule-instagram-thu-18-fieldwork-9f82');
    await expect(preview).not.toContainText('Oct 11');
    await expect(preview).not.toContainText('11 paź');
  }
});
