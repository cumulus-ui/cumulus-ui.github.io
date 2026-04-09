import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const components = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/components' }),
  schema: z.object({
    description: z.string(),
    tag: z.string(),
  }),
});

export const collections = { components };
