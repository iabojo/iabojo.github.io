import { getCollection } from 'astro:content';

export type ItemType = 'blog' | 'khawater' | 'books' | 'videos';

export interface Item {
  type: ItemType;
  title: string;
  description?: string;
  url: string;
  date: Date;
  tags: string[];
}

export const TYPE_ORDER: ItemType[] = ['blog', 'khawater', 'books', 'videos'];

export const TYPE_LABELS: Record<ItemType, string> = {
  blog: 'التدوينات',
  khawater: 'خواطر',
  books: 'الكتب',
  videos: 'الفيديوهات',
};

export const cleanTags = (tags: string[] = []): string[] => [
  ...new Set(tags.map((t) => t.trim()).filter(Boolean)),
];

export const tagUrl = (tag: string): string => `/tags/${encodeURIComponent(tag)}/`;

export function excerpt(markdown: string, max = 70): string {
  const text = markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[#>*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export function formatDate(date: Date, month: 'short' | 'long' = 'short'): string {
  return new Intl.DateTimeFormat('ar-EG-u-nu-latn', {
    year: 'numeric',
    month,
    day: '2-digit',
  }).format(date);
}

export async function getAllItems(): Promise<Item[]> {
  const [blog, khawater, books, videos] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('khawater', ({ data }) => !data.draft),
    getCollection('books', ({ data }) => !data.draft),
    getCollection('videos'),
  ]);

  const items: Item[] = [
    ...blog.map((e): Item => ({
      type: 'blog',
      title: e.data.title,
      description: e.data.description,
      url: `/blog/${e.slug}/`,
      date: e.data.pubDate,
      tags: cleanTags(e.data.tags),
    })),
    ...khawater.map((e): Item => ({
      type: 'khawater',
      title: e.data.title ?? (excerpt(e.body) || 'خاطرة'),
      url: `/khawater/${e.slug}/`,
      date: e.data.pubDate,
      tags: cleanTags(e.data.tags),
    })),
    ...books.map((e): Item => ({
      type: 'books',
      title: `${e.data.title} — ${e.data.author}`,
      url: `/books/#${e.slug}`,
      date: e.data.date,
      tags: cleanTags(e.data.tags),
    })),
    ...videos.map((e): Item => ({
      type: 'videos',
      title: e.data.title,
      description: e.data.description,
      url: '/videos/',
      date: e.data.pubDate,
      tags: cleanTags(e.data.tags),
    })),
  ];

  return items.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}
