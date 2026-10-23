import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Vsebino ureja administracija (public/admin/config.yml) - polja morajo ostati usklajena.

const programi = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/programi' }),
  schema: z.object({
    naziv: z.string(),
    kratek_opis: z.string().optional(),
    kategorija: z.string().optional(),
    verzija: z.string().optional(),
    datum: z.coerce.date().optional(),
    prenos: z.string().optional(),
    spremembe: z.string().optional(),
    slika: z.string().optional(),
    vrstni_red: z.number().default(999),
    arhiv: z.boolean().default(false),
  }),
});

const novice = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/novice' }),
  schema: z.object({
    naslov: z.string(),
    datum: z.coerce.date(),
    povzetek: z.string().optional(),
  }),
});

const strani = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/strani' }),
  schema: z.object({
    naslov: z.string(),
    navodila: z.string().optional(),
  }),
});

export const collections = { programi, novice, strani };
