export const siteConfig = {
  name: 'Sechenov Platform',
  shortName: 'Sechenov Platform',
  description:
    'Платформа объединяет медицинские проекты, экспертов, инвесторов и корпорации — чтобы перспективные решения проходили профессиональную оценку, находили возможности для пилотирования, инвестиций и масштабирования.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
  locale: 'ru_RU',
  organization: {
    name: 'Сеченовский Университет',
    url: 'https://www.sechenov.ru',
    logo: '/images/sechenov-logo.svg',
  },
} as const;
