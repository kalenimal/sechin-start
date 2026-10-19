import type { MetadataRoute } from 'next';
import { getStartups } from '@/entities/startup';
import { absoluteUrl } from '@/shared/lib/seo';

export const dynamic = 'force-static';

const TABS = ['', '/team', '/reviews', '/documents'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const startups = await getStartups();
  const now = new Date();
  return [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: absoluteUrl('/startups'), lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: absoluteUrl('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/offer'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    ...startups.flatMap((startup) =>
      TABS.map((tab) => ({
        url: absoluteUrl(`/startups/${startup.slug}${tab}`),
        lastModified: new Date(startup.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: tab ? 0.6 : 0.8,
      })),
    ),
  ];
}
