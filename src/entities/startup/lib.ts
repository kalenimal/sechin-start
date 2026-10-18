import { absoluteUrl } from '@/shared/lib/seo';
import { routes } from '@/shared/config';
import type { Startup } from './model/types';

/** schema.org Organization + Product description of a startup for rich results. */
export function startupSchema(startup: Startup) {
  const ratings = startup.reviews.map((review) => review.rating);
  const avg = ratings.length ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length : null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: startup.name,
    description: startup.shortDescription,
    url: absoluteUrl(routes.startup(startup.slug)),
    logo: absoluteUrl(startup.cover),
    image: absoluteUrl(startup.heroImage),
    keywords: startup.tags.join(', '),
    foundingDate: startup.publishedAt,
    employee: startup.team.map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
      image: absoluteUrl(member.photo),
    })),
    ...(avg && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avg.toFixed(1),
        reviewCount: ratings.length,
        bestRating: 5,
      },
      review: startup.reviews.map((review) => ({
        '@type': 'Review',
        reviewBody: review.text,
        reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: 5 },
        author: { '@type': 'Person', name: review.author },
      })),
    }),
  };
}

export function startupListSchema(startups: Startup[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: startups.map((startup, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(routes.startup(startup.slug)),
      name: startup.name,
    })),
  };
}
