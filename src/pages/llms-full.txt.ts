import type { APIRoute } from 'astro';
import { getLessons } from '../content/lessons';
import { playbooksContent } from '../content/playbooks';
import { glossaryContent } from '../content/glossary';
import { tracksContent } from '../content/tracks';
import { ecosystemContent } from '../content/tools';
import { trackIds } from '../lib/contracts';

export const GET: APIRoute = () => {
  const chunks: string[] = [
    '# MUMRO Academy — Complete Bilingual Knowledge Base (`llms-full.txt`)',
    '',
    'Canonical domain: https://academy.mumro.io',
    'Main MUMRO platform: https://mumro.io (EN) | https://mumro.io/pl/ (PL)',
    'Created by: RolePlayingTech (https://roleplayingtech.com)',
    '',
  ];

  for (const locale of ['en', 'pl'] as const) {
    const tracks = tracksContent[locale];
    const lessons = getLessons(locale);
    const playbooks = playbooksContent[locale];
    const glossary = glossaryContent[locale];
    const tools = ecosystemContent[locale].toolsSection.items;

    chunks.push(`====================================================================`);
    chunks.push(`# EDITION: ${locale.toUpperCase()}`);
    chunks.push(`====================================================================`, '');

    chunks.push(`## Tracks (${locale.toUpperCase()})`, '');
    for (const id of trackIds) {
      const t = tracks[id];
      chunks.push(`### ${t.number}: ${t.title}`);
      chunks.push(`URL: https://academy.mumro.io${locale === 'pl' ? '/pl' : ''}/tracks/${t.id}/`);
      chunks.push(t.summary);
      chunks.push(`- Problem: ${t.coreProblem}`);
      chunks.push(`- Outcome: ${t.systemOutcome}`);
      chunks.push(`- MUMRO Capability: ${t.mumroCapability}`, '');
    }

    chunks.push(`## All ${lessons.length} Lessons (${locale.toUpperCase()})`, '');
    for (const l of lessons) {
      chunks.push(`### ${l.number}: ${l.title}`);
      chunks.push(`URL: https://academy.mumro.io${locale === 'pl' ? '/pl' : ''}/lessons/${l.slug}/`);
      chunks.push(`Subtitle: ${l.subtitle}`);
      chunks.push(`Key Takeaways:`);
      for (const k of l.keyTakeaways) chunks.push(`- ${k}`);
      chunks.push(`Problem Diagnosis (${l.problemStatement.heading}): ${l.problemStatement.body}`);
      chunks.push(`- Anti-pattern: ${l.problemStatement.antiPattern}`);
      chunks.push(`- Connected pattern: ${l.problemStatement.connectedPattern}`);
      for (const sec of l.sections) {
        chunks.push(`#### ${sec.heading}`);
        for (const p of sec.paragraphs) chunks.push(p);
      }
      chunks.push(`Case Study (${l.caseStudy.brand} — ${l.caseStudy.scenarioTitle}): ${l.caseStudy.context}`);
      chunks.push(`Connected in MUMRO (${l.mumroIntegration.title}): ${l.mumroIntegration.summary}`, '');
    }

    chunks.push(`## Playbooks (${locale.toUpperCase()})`, '');
    for (const pb of playbooks.items) {
      chunks.push(`### ${pb.number}: ${pb.title}`);
      chunks.push(`${pb.subtitle} — ${pb.mumroBenefit}`, '');
    }

    chunks.push(`## Open-Source CLI Kits (${locale.toUpperCase()})`, '');
    for (const tool of tools) {
      chunks.push(`### ${tool.name} (${tool.repoUrl})`);
      chunks.push(`- ${tool.focusLabel}: ${tool.focus}`);
      chunks.push(`- ${tool.problemLabel}: ${tool.problemSolved}`);
      for (const cap of tool.capabilities) chunks.push(`  * ${cap}`);
      chunks.push('');
    }

    chunks.push(`## Glossary (${locale.toUpperCase()})`, '');
    for (const term of glossary.terms) {
      chunks.push(`- **${term.term}** (${term.category}): ${term.definition} Why it matters: ${term.whyItMatters}`);
    }
    chunks.push('');
  }

  return new Response(chunks.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
