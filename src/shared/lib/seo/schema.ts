import { siteConfig } from '@/shared/config';

/**
 * Absolute URL of a site path. Keeps the sub-path of siteConfig.url (GitHub Pages serves the site from
 * /<repo>/) and adds the trailing slash every route has (trailingSlash: true), so URLs match canonicals.
 */
export const absoluteUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) return path;
  const [pathname, query] = path.split('?');
  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  const normalized = isFile || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${siteConfig.url.replace(/\/$/, '')}${normalized}${query ? `?${query}` : ''}`;
};

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.organization.name,
    url: siteConfig.organization.url,
    logo: absoluteUrl(siteConfig.organization.logo),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: absoluteUrl('/'),
    inLanguage: 'ru-RU',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/startups')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
