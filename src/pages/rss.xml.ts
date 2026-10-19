import type { APIRoute } from 'astro';
import { getLessons } from '../content/lessons';
import { shellContent } from '../content/shell';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = () => {
  const lessons = getLessons('en');
  const meta = shellContent.en.metadata;
  const items = lessons
    .map(
      (lesson) => `    <item>
      <title>${escapeXml(`${lesson.number}: ${lesson.title}`)}</title>
      <link>https://academy.mumro.io/lessons/${lesson.slug}/</link>
      <guid isPermaLink="true">https://academy.mumro.io/lessons/${lesson.slug}/</guid>
      <description>${escapeXml(lesson.metaDescription)}</description>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(meta.title)}</title>
    <link>https://academy.mumro.io/</link>
    <description>${escapeXml(meta.description)}</description>
    <language>en</language>
    <atom:link href="https://academy.mumro.io/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
