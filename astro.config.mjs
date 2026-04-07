import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import lit from '@semantic-ui/astro-lit';

export default defineConfig({
  integrations: [lit(), mdx()],
  server: { port: 4321 },
});
