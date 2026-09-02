// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Fully static output. No adapter, so there are no serverless functions in
// production and no server-rendered admin routes.
export default defineConfig({
  site: 'https://omarmohammed.co',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
