import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://academy.mumro.io',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
