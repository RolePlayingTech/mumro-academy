import type { APIRoute } from 'astro';
import { lessonSlugs, localePath, trackIds } from '../lib/contracts';

const origin = 'https://academy.mumro.io';

const subpaths = [
  '',
  'playbooks',
  'glossary',
  ...trackIds.map((id) => `tracks/${id}`),
  ...lessonSlugs.map((slug) => `lessons/${slug}`),
];

export const GET: APIRoute = () => {
  const entries: string[] = [];

  for (const sub of subpaths) {
    const enLoc = new URL(localePath('en', sub), origin).href;
    const plLoc = new URL(localePath('pl', sub), origin).href;

    for (const loc of [enLoc, plLoc]) {
      entries.push(`  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}" />
    <xhtml:link rel="alternate" hreflang="pl" href="${plLoc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}" />
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
