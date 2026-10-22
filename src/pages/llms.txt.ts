import type { APIRoute } from 'astro';
import { getLessons } from '../content/lessons';
import { tracksContent } from '../content/tracks';
import { ecosystemContent } from '../content/tools';
import { trackIds } from '../lib/contracts';

export const GET: APIRoute = () => {
  const enTracks = tracksContent.en;
  const plTracks = tracksContent.pl;
  const enLessons = getLessons('en');
  const plLessons = getLessons('pl');
  const enTools = ecosystemContent.en.toolsSection.items;

  const lines: string[] = [
    '# MUMRO Academy (academy.mumro.io)',
    '',
    '> Bilingual (EN/PL) open engineering and marketing handbook for living brand systems, multi-channel content operations, technical SEO, and Model Context Protocol (MCP) AI agents — built by MUMRO (https://mumro.io).',
    '',
    '## About MUMRO',
    '- Main platform (EN): https://mumro.io/',
    '- Main platform (PL): https://mumro.io/pl/',
    '- Creator: RolePlayingTech (https://roleplayingtech.com/)',
    '- Core product loop: Versioned Brand Strategy -> Shared Brand Voice -> Evidence-Led Research -> Multi-Format Content Studio (Articles, 5-Slide Carousels, Social Posts) -> Durable Publishing Queues -> Website & Grounded Assistant -> 7/30/90-Day Cohort Analytics -> MCP AI Agents with Prepare -> Confirm Gates & 3 Autonomy Modes.',
    '',
    '## Learning Tracks (EN)',
    ...trackIds.map(
      (id) => `- [${enTracks[id].number}: ${enTracks[id].title}](https://academy.mumro.io/tracks/${id}/): ${enTracks[id].subtitle}`
    ),
    '',
    `## All ${enLessons.length} Lessons (EN)`,
    ...enLessons.map(
      (l) => `- [${l.number}: ${l.title}](https://academy.mumro.io/lessons/${l.slug}/): ${l.metaDescription}`
    ),
    '',
    '## Ścieżki edukacyjne (PL)',
    ...trackIds.map(
      (id) => `- [${plTracks[id].number}: ${plTracks[id].title}](https://academy.mumro.io/pl/tracks/${id}/): ${plTracks[id].subtitle}`
    ),
    '',
    `## Wszystkie ${plLessons.length} lekcji (PL)`,
    ...plLessons.map(
      (l) => `- [${l.number}: ${l.title}](https://academy.mumro.io/pl/lessons/${l.slug}/): ${l.metaDescription}`
    ),
    '',
    '## Playbooks, Glossary & Open-Source Kits',
    '- [Playbooks & Blueprints (EN)](https://academy.mumro.io/playbooks/)',
    '- [Playbooki i Szablony (PL)](https://academy.mumro.io/pl/playbooks/)',
    '- [Glossary of Connected Brand Operations (EN)](https://academy.mumro.io/glossary/)',
    '- [Słownik Systemów Marki i Agentów AI (PL)](https://academy.mumro.io/pl/glossary/)',
    ...enTools.map((t) => `- [${t.name} (${t.repoLabel})](${t.repoUrl}): ${t.focus}`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
