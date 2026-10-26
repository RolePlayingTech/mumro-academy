import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test, expect } from '@playwright/test';
import { SURFACE_COMMANDS } from '../src/content/lesson-mcp-tools-skills';
import { playbooksContent } from '../src/content/playbooks';

const cli = resolve(process.cwd(), 'node_modules/mcp-surface-kit/bin/mcp-surface.mjs');
function call(args: string[]) {
  const output = spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
  expect(output.status, output.stderr || output.stdout).toBe(0);
  return output.stdout.trim();
}

test('Lesson 14 CLI transcript and bilingual Playbook 06 stay aligned with the pinned kit', () => {
  const specs = (['en', 'pl'] as const).map((locale) => {
    const playbook = playbooksContent[locale].items.find((item) => item.id === 'mcp-surface-spec');
    expect(playbook).toBeDefined();
    return JSON.parse(playbook!.templateCode);
  });
  expect(specs[0]).toEqual(specs[1]);
  for (const spec of specs) {
    const publish = spec.skills.find((skill: { name: string }) => skill.name === 'publish-content');
    const deletion = spec.skills.find((skill: { name: string }) => skill.name === 'delete-draft');
    expect(spec.tools).toHaveLength(7);
    expect(spec.skills).toHaveLength(2);
    expect(publish).toBeDefined();
    expect(deletion).toBeDefined();
    expect(publish.uses).not.toContain('delete_publication_draft');
    expect(publish.uses.slice(-3)).toEqual([
      'create_publication_draft', 'prepare_publication_action', 'confirm_publication_action',
    ]);
    expect(deletion.uses).toEqual(['get_workspace_context', 'delete_publication_draft']);
    expect(deletion.description).toContain('explicitly requests deletion');

    const dir = mkdtempSync(join(tmpdir(), 'academy-mcp-surface-sync-'));
    try {
      mkdirSync(join(dir, '.mcp-surface'), { recursive: true });
      writeFileSync(join(dir, '.mcp-surface', 'spec.json'), JSON.stringify(spec, null, 2), 'utf8');
      const explain = call(['explain', dir]);
      expect(SURFACE_COMMANDS).toContain(
        '$ node bin/mcp-surface.mjs explain examples/content-workspace\n' + explain + '\n'
      );
      const check = call(['check', dir, '--strict']);
      expect(SURFACE_COMMANDS).toContain(
        '$ node bin/mcp-surface.mjs check examples/content-workspace --strict\n' + check
      );
      const dry = call(['build', dir, '--dry-run']);
      const drySummary = dry.split('\n').slice(0, 5).join('\n');
      expect(SURFACE_COMMANDS).toContain(
        '$ node bin/mcp-surface.mjs build examples/content-workspace --dry-run\n' + drySummary
      );
      expect(drySummary).toContain('create: 4, update: 0, unchanged: 0, conflict: 0');
      expect(drySummary).toContain('.claude/skills/delete-draft/SKILL.md');
      call(['build', dir]);
      const publishMd = readFileSync(join(dir, '.mcp-surface/skills/publish-content/SKILL.md'), 'utf8');
      const deletionMd = readFileSync(join(dir, '.mcp-surface/skills/delete-draft/SKILL.md'), 'utf8');
      expect(publishMd).not.toContain('delete_publication_draft');
      expect(publishMd).toContain('5. `prepare_publication_action`');
      expect(publishMd).toContain('6. `confirm_publication_action`');
      expect(deletionMd).toContain('2. `delete_publication_draft`');
      expect(deletionMd).toContain('delete:local_draft_only');
      expect(readFileSync(join(dir, '.claude/skills/delete-draft/SKILL.md'), 'utf8')).toBe(deletionMd);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }
});
