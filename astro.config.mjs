// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Fully static output. No adapter, so there are no serverless functions in
// production and no server-rendered admin routes.
export default defineConfig({
  site: 'https://omarmohammed.co',
  output: 'static',
  integrations: [sitemap()],
  // Project cards carry data-astro-prefetch="viewport": once the cards scroll
  // into view their pages (13 to 24 KB each) are fetched, so a click or tap
  // lands on a page that is already here. Hover alone would miss phones.
  prefetch: { prefetchAll: false },
  build: {
    // The whole stylesheet is a few KB compressed. Inlining it removes two
    // render-blocking requests from the critical path, which matters more on a
    // high-latency connection than the bytes do.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
