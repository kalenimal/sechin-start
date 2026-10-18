# SEO

## Что сделано

- **SSG** для публичных страниц: главная, страницы стартапов и их вкладки (`generateStaticParams`, `dynamicParams = false`).
- **Метаданные** через `buildMetadata()` (`shared/lib/seo/metadata.ts`): title по шаблону `%s | Sechenov Platform`, description, canonical, Open Graph, Twitter Card, robots.
- **JSON-LD** (`shared/lib/seo/schema.ts`, `entities/startup/lib.ts`):
  - на всех страницах: `Organization`, `WebSite` + `SearchAction`;
  - каталог: `ItemList`;
  - стартап: `Organization` с `employee: Person[]`, `AggregateRating`, `Review[]`, `BreadcrumbList`.
- **Индексация:** `robots.txt` закрывает `/dashboard`, `/auth`, `/api`; страницы кабинета и auth помечены `noindex`; результаты поиска `/startups?q=` — `noindex, follow`.
- **sitemap.xml** собирается из списка стартапов (все 4 вкладки на каждый).
- **Семантика:** один `h1` на страницу, `article/nav/section`, скрытые хлебные крошки, `lang="ru"`.
- **Производительность:** `next/image` (AVIF/WebP, `sizes`, `priority` для LCP), шрифт через `next/font` без CLS, `optimizePackageImports` для `lucide-react`.
- **OG-изображение** по умолчанию — `public/images/og-default.jpg`, для стартапа — его hero-картинка.

## Абсолютные URL

`siteConfig.url` берётся из `NEXT_PUBLIC_SITE_URL`, затем из `VERCEL_PROJECT_PRODUCTION_URL`, иначе `http://localhost:3000`.

## Чек-лист для новой публичной страницы

1. `export const metadata = buildMetadata({ title, description, path })` или `generateMetadata`.
2. Ровно один `h1`.
3. Если страница генерируется из данных — `generateStaticParams`.
4. Добавить URL в `app/sitemap.ts`.
5. При необходимости — JSON-LD через `<JsonLd data={…} />`.
