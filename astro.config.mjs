// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';


export default defineConfig({
  site: 'https://omarmohammed.co',
  // Static by default; the adapter lets the Keystatic admin routes
  // (/keystatic and /api/keystatic) run server-side on demand.
  output: 'static',
  adapter: netlify(),
  integrations: [react(), mdx(), keystatic()],
  vite: {
    plugins: [tailwindcss()]
  }
});
