import type { MetadataRoute } from 'next';
import { siteConfig, withBasePath } from '@/shared/config';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: withBasePath('/'),
    display: 'standalone',
    background_color: '#f2f4f5',
    theme_color: '#387184',
    lang: 'ru',
    icons: [{ src: withBasePath('/favicon.ico'), sizes: 'any', type: 'image/x-icon' }],
  };
}
