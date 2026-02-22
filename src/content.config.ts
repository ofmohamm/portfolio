import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    category: z.enum(['hardware', 'fpga', 'embedded', 'software']),
    tags: z.array(z.string()),
    tools: z.array(z.string()).optional(),
    techSpecs: z.record(z.string()).optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    video: z.string().optional(),
    model3d: z.string().optional(),
    github: z.string().optional(),
    external: z.string().optional(),
    hoverEffect: z.enum(['pop', 'wiggle']).default('pop'),
    imageStyle: z.enum(['cover', 'contain']).default('cover'),
    order: z.number().default(0),
  }),
});

export const collections = { projects };
