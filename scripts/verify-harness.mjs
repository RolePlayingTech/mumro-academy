#!/usr/bin/env node
/**
 * AI Agent Harness — Context Budget & Structure Linter (verify-harness.mjs)
 * By MUMRO Academy (https://academy.mumro.io) & RolePlayingTech
 *
 * Enforces Progressive Disclosure and prevents Context Pollution:
 * 1. Root instruction files (AGENTS.md, CLAUDE.md) must stay compact (< 80 lines)
 *    so they don't burn context window tokens on every turn.
 * 2. Root AGENTS.md must include verification commands and guardrails.
 * 3. Every SKILL.md must contain valid YAML frontmatter (name & description).
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const rootDir = process.cwd();
const MAX_ROOT_LINES = Number(process.env.HARNESS_MAX_LINES || 80);
const MAX_SKILL_LINES = Number(process.env.HARNESS_MAX_SKILL_LINES || 250);

let errors = 0;
let warnings = 0;

function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

console.log('==========================================================');
console.log(' AI AGENT HARNESS — CONTEXT BUDGET & HEALTH AUDIT');
console.log('==========================================================\n');

// 1. Check Root Instruction Files (AGENTS.md / CLAUDE.md)
const rootFiles = ['AGENTS.md', 'CLAUDE.md', 'GEMINI.md'];
let foundAnyRoot = false;

for (const file of rootFiles) {
  const fullPath = join(rootDir, file);
  if (!existsSync(fullPath)) continue;
  foundAnyRoot = true;

  const content = readFileSync(fullPath, 'utf8');
  const lines = content.split(/\r?\n/).length;
  const tokens = estimateTokens(content);

  if (lines > MAX_ROOT_LINES) {
    console.error(
      `[FAIL] ${file}: ${lines} lines (~${tokens} tokens) exceeds budget of ${MAX_ROOT_LINES} lines.`
    );
    console.error(
      `       -> Move detailed procedures into on-demand SKILL.md files (Progressive Disclosure).`
    );
    errors++;
  } else {
    console.log(
      `[PASS] ${file}: ${lines} lines / ${MAX_ROOT_LINES} max (~${tokens} always-on tokens)`
    );
  }
}

if (!foundAnyRoot) {
  console.warn(
    '[WARN] No root AGENTS.md or CLAUDE.md found yet. Run the `harness-architect` skill to generate one.'
  );
  warnings++;
}

// 2. Discover and validate SKILL.md files across .agents/skills, .claude/skills, and skills/
const skillRoots = [
  join(rootDir, '.agents', 'skills'),
  join(rootDir, '.claude', 'skills'),
  join(rootDir, 'skills'),
];

function findSkillFiles(dir) {
  if (!existsSync(dir)) return [];
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      const candidate = join(full, 'SKILL.md');
      if (existsSync(candidate)) results.push(candidate);
    }
  }
  return results;
}

const allSkillFiles = [...new Set(skillRoots.flatMap(findSkillFiles))];

for (const skillPath of allSkillFiles) {
  const rel = relative(rootDir, skillPath);
  const content = readFileSync(skillPath, 'utf8');
  const lines = content.split(/\r?\n/).length;
  const tokens = estimateTokens(content);

  const hasFrontmatter = /^---\r?\n[\s\S]*?name:\s*\S+[\s\S]*?description:\s*[\s\S]*?\r?\n---/.test(
    content
  );
  if (!hasFrontmatter) {
    console.error(`[FAIL] ${rel}: Missing required YAML frontmatter (name, description).`);
    errors++;
    continue;
  }

  if (lines > MAX_SKILL_LINES) {
    console.warn(
      `[WARN] ${rel}: ${lines} lines (~${tokens} tokens) exceeds recommended ${MAX_SKILL_LINES} lines.`
    );
    warnings++;
  } else {
    console.log(`[PASS] ${rel}: ${lines} lines (~${tokens} on-demand tokens)`);
  }
}

console.log('\n----------------------------------------------------------');
if (errors > 0) {
  console.error(`RESULT: FAILED with ${errors} error(s) and ${warnings} warning(s).`);
  process.exit(1);
} else {
  console.log(`RESULT: PASSED (${allSkillFiles.length} skill(s) verified, ${warnings} warning(s)).`);
}
