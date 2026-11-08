import { defineCollection, z } from 'astro:content';

const optionalText = z
  .string()
  .optional()
  .transform((v) => v?.trim() || undefined);

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const khawater = defineCollection({
  type: 'content',
  schema: z.object({
    title: optionalText,
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const books = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(['reading', 'finished', 'wishlist']).default('finished'),
    cover: optionalText,
    downloadUrl: optionalText.refine(
      (v) => v === undefined || /^https?:\/\//i.test(v),
      'downloadUrl must start with http:// or https://',
    ),
    rating: z.number().int().min(1).max(5).optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const videos = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    youtubeId: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, khawater, books, videos };
