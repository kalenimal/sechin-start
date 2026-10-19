import { Suspense } from 'react';
import { getStartups, startupListSchema } from '@/entities/startup';
import { routes } from '@/shared/config';
import { breadcrumbSchema, JsonLd } from '@/shared/lib/seo';
import { Container } from '@/shared/ui/Container';
import homeStyles from '../home/HomePage.module.css';
import { StartupsCatalog } from './StartupsCatalog';

/** The full list is pre-rendered (indexable); search and tag filters are applied in the browser. */
export async function StartupsPage() {
  const startups = await getStartups();

  return (
    <Container as="section" className={homeStyles.section} aria-labelledby="startups-title">
      <h1 id="startups-title" className={homeStyles.title}>
        Медицинские цифровые сервисы
      </h1>

      <Suspense fallback={<StartupsCatalog startups={startups} />}>
        <StartupsCatalog startups={startups} withQuery />
      </Suspense>

      <JsonLd
        data={[
          startupListSchema(startups),
          breadcrumbSchema([
            { name: 'Главная', path: routes.home },
            { name: 'Цифровые сервисы', path: routes.startups },
          ]),
        ]}
      />
    </Container>
  );
}
