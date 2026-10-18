import type { Metadata } from 'next';
import { siteConfig } from '@/shared/config';

type BuildMetadataParams = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image = '/images/og-default.jpg',
  noIndex = false,
  type = 'website',
}: BuildMetadataParams = {}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: path,
      siteName: siteConfig.name,
      title: title ?? siteConfig.name,
      description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? siteConfig.name,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
  };
}
