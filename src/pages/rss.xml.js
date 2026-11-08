import rss from '@astrojs/rss';
import { getAllItems } from '../lib/content';

export async function GET(context) {
  const items = (await getAllItems())
    .filter((i) => i.type === 'blog' || i.type === 'khawater')
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());

  return rss({
    title: 'مدونة أبو جو',
    description: 'تدوينات وخواطر وقراءات، مع اهتمام بأنظمة BSD وأمن الشبكات.',
    site: context.site,
    items: items.map((item) => ({
      title: item.title,
      description: item.description ?? '',
      pubDate: item.date,
      link: item.url,
    })),
  });
}
