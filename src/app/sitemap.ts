import type { MetadataRoute } from 'next';
import { getStartups } from '@/entities/startup';
import { siteConfig } from '@/shared/config';

const TABS = ['', '/team', '/reviews', '/documents'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const startups = await getStartups();
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${siteConfig.url}/startups`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteConfig.url}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteConfig.url}/offer`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    ...startups.flatMap((startup) =>
      TABS.map((tab) => ({
        url: `${siteConfig.url}/startups/${startup.slug}${tab}`,
        lastModified: new Date(startup.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: tab ? 0.6 : 0.8,
      })),
    ),
  ];
}
