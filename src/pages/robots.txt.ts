import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const hide = import.meta.env.SITE_NOINDEX === 'true';
  const body = hide
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: https://academy.mumro.io/sitemap.xml\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
