import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Content is plain YAML on disk, loaded at build time. This replaces the
// Keystatic reader, which required a server adapter and shipped a public
// /keystatic admin route.

const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    subtitle: z.string().optional(),
    oneLiner: z.string().optional(),
    order: z.number().default(0),
    // Every project is a still image now; the 3D model and the video are gone.
    mediaType: z.literal('image').default('image'),
    tech: z.array(z.string()).default([]),
    github: z.string().url().optional(),
    body: z.array(z.string()).default([]),
    specs: z.array(z.object({ key: z.string(), value: z.string() })).default([]),
  }),
});

// hero / featured / skills / seo each live in one YAML file. They have
// different shapes, so every field is optional and only the relevant ones
// are present per file.
const site = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/site' }),
  schema: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    positioning: z.array(z.string()).optional(),
    avatar: z.string().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    oneLiner: z.string().optional(),
    tech: z.array(z.string()).optional(),
    body: z.array(z.string()).optional(),
    note: z.string().optional(),
    groups: z
      .array(z.object({ label: z.string(), items: z.array(z.string()) }))
      .optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { projects, site };
