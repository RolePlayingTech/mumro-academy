import { readFile, readdir, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';

const distRoot = new URL('../dist/', import.meta.url);

export const expectedSlugs = [
  'versioned-brand-strategy',
  'brand-voice-architecture',
  'evidence-led-research-pipelines',
  'one-story-multi-channel-architecture',
  'carousel-and-visual-storytelling',
  'reliable-publishing-queues-and-cadence',
  'content-hub-and-cms-architecture',
  'grounded-website-assistants-and-faq-mining',
  'cohort-analytics-and-strategy-iteration',
  'mcp-for-marketing-and-content-systems',
  'two-phase-commit-for-ai-agents',
  'autonomy-levels-and-guardrails',
  'ai-agent-harness-engineering',
  'mcp-tools-skills-and-product-surfaces',
  'playwright-browser-automation-and-verification',
  'git-and-github-for-ai-coding-agents',
];

const contractsSource = await readFile(new URL('../src/lib/contracts.ts', import.meta.url), 'utf8');
const contractsSlugArrayMatch = contractsSource.match(/export const lessonSlugs = \[([\s\S]*?)\] as const;/);
assert.ok(contractsSlugArrayMatch, 'src/lib/contracts.ts must export lessonSlugs');
const contractsSlugs = Array.from(contractsSlugArrayMatch[1].matchAll(/'([^']+)'/g), (m) => m[1]);
assert.deepEqual(
  expectedSlugs,
  contractsSlugs,
  'expectedSlugs in verify-build.mjs must match authoritative lessonSlugs in src/lib/contracts.ts'
);

const expectedTracks = [
  'brand-systems',
  'multi-format-distribution',
  'website-seo-conversations',
  'agents-mcp-governance',
];

const routePairs = [
  ['index.html', 'en', 'https://academy.mumro.io/'],
  ['pl/index.html', 'pl', 'https://academy.mumro.io/pl/'],
  ['playbooks/index.html', 'en', 'https://academy.mumro.io/playbooks/'],
  ['pl/playbooks/index.html', 'pl', 'https://academy.mumro.io/pl/playbooks/'],
  ['glossary/index.html', 'en', 'https://academy.mumro.io/glossary/'],
  ['pl/glossary/index.html', 'pl', 'https://academy.mumro.io/pl/glossary/'],
  ...expectedTracks.flatMap((id) => [
    [`tracks/${id}/index.html`, 'en', `https://academy.mumro.io/tracks/${id}/`],
    [`pl/tracks/${id}/index.html`, 'pl', `https://academy.mumro.io/pl/tracks/${id}/`],
  ]),
  ...expectedSlugs.flatMap((slug) => [
    [`lessons/${slug}/index.html`, 'en', `https://academy.mumro.io/lessons/${slug}/`],
    [`pl/lessons/${slug}/index.html`, 'pl', `https://academy.mumro.io/pl/lessons/${slug}/`],
  ]),
];

for (const [relPath, lang, canonicalUrl] of routePairs) {
  const html = await readFile(new URL(relPath, distRoot), 'utf8');
  assert.match(html, new RegExp(`<html[^>]+lang="${lang}"`), `${relPath} must have lang="${lang}"`);

  const h1 = html.match(/<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '').trim();
  assert.ok(h1 && h1.length > 5, `${relPath} must have a non-empty H1`);

  assert.ok(
    html.includes(`<link rel="canonical" href="${canonicalUrl}"`),
    `${relPath} must have exact canonical ${canonicalUrl}`
  );
  assert.match(html, /<link rel="alternate" hreflang="en" href="https:\/\/academy\.mumro\.io\//, `${relPath} missing hreflang en`);
  assert.match(html, /<link rel="alternate" hreflang="pl" href="https:\/\/academy\.mumro\.io\/pl\//, `${relPath} missing hreflang pl`);
  assert.match(html, /<link rel="alternate" hreflang="x-default" href="https:\/\/academy\.mumro\.io\//, `${relPath} missing hreflang x-default`);

  const ldJsonRaw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(ldJsonRaw, `${relPath} must include JSON-LD structured data`);
  const parsedLd = JSON.parse(ldJsonRaw);
  assert.equal(parsedLd['@context'], 'https://schema.org');
  assert.ok(Array.isArray(parsedLd['@graph']) && parsedLd['@graph'].length >= 2);
}

// Check 404, sitemap.xml, robots.txt, llms.txt, RSS feeds, and share images
await readFile(new URL('404.html', distRoot), 'utf8');
const sitemap = await readFile(new URL('sitemap.xml', distRoot), 'utf8');
for (const slug of expectedSlugs) {
  assert.ok(sitemap.includes(`https://academy.mumro.io/lessons/${slug}/`), `sitemap.xml missing EN lesson ${slug}`);
  assert.ok(sitemap.includes(`https://academy.mumro.io/pl/lessons/${slug}/`), `sitemap.xml missing PL lesson ${slug}`);
}

const robots = await readFile(new URL('robots.txt', distRoot), 'utf8');
assert.ok(robots.includes('Sitemap: https://academy.mumro.io/sitemap.xml'));

const llms = await readFile(new URL('llms.txt', distRoot), 'utf8');
assert.ok(llms.includes('# MUMRO Academy (academy.mumro.io)'));

const llmsFull = await readFile(new URL('llms-full.txt', distRoot), 'utf8');
assert.ok(llmsFull.includes('# MUMRO Academy — Complete Bilingual Knowledge Base (`llms-full.txt`)'));
assert.ok(llmsFull.length > 20000, 'llms-full.txt must contain the full bilingual curriculum');

const rssEn = await readFile(new URL('rss.xml', distRoot), 'utf8');
const rssPl = await readFile(new URL('pl/rss.xml', distRoot), 'utf8');
assert.ok(rssEn.includes('<rss version="2.0"'));
assert.ok(rssPl.includes('<rss version="2.0"'));

const shareEn = await stat(new URL('media/share-en.png', distRoot));
const sharePl = await stat(new URL('media/share-pl.png', distRoot));
assert.ok(shareEn.size > 10000 && sharePl.size > 10000, 'Open Graph share PNGs must be present');

const allFiles = await readdir(distRoot, { recursive: true });
assert.ok(
  `Verified ${routePairs.length} localized HTML pages, 404, sitemap, robots, llms.txt, RSS feeds, and ${allFiles.length} build artifacts.`
);
console.log(
  `PASS: Verified ${routePairs.length} EN/PL static HTML routes, canonical/hreflang symmetry, JSON-LD graphs, sitemap.xml, robots.txt, llms.txt, and RSS feeds.`
);
