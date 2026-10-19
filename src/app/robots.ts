import type { MetadataRoute } from 'next';
import { basePath } from '@/shared/config';
import { absoluteUrl } from '@/shared/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: [`${basePath}/dashboard/`, `${basePath}/auth/`] }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  };
}
