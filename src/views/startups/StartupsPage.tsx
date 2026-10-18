import Link from 'next/link';
import { getStartups, StartupCard, startupListSchema, startupsTags } from '@/entities/startup';
import { routes } from '@/shared/config';
import { cn } from '@/shared/lib/cn';
import { breadcrumbSchema, JsonLd } from '@/shared/lib/seo';
import { Button, Container, EmptyState } from '@/shared/ui';
import homeStyles from '../home/HomePage.module.css';
import styles from './StartupsPage.module.css';

type StartupsPageProps = { q?: string; tag?: string };

export async function StartupsPage({ q, tag }: StartupsPageProps) {
  const startups = await getStartups({ q, tag });
  const tagHref = (value?: string) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (value) params.set('tag', value);
    const query = params.toString();
    return query ? `${routes.startups}?${query}` : routes.startups;
  };

  return (
    <Container as="section" className={homeStyles.section} aria-labelledby="startups-title">
      <h1 id="startups-title" className={homeStyles.title}>
        Медицинские стартапы
      </h1>

      <form action={routes.startups} method="get" className={styles.search} role="search">
        <label htmlFor="startups-q" className="visually-hidden">
          Поиск по стартапам
        </label>
        <input
          id="startups-q"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Ищите по названию, направлению или описанию"
          className={styles.input}
        />
        {tag && <input type="hidden" name="tag" value={tag} />}
        <Button type="submit" size="s">
          Поиск
        </Button>
      </form>

      <nav className={styles.tags} aria-label="Направления">
        <Link href={tagHref()} className={cn(styles.tag, !tag && styles.tagActive)}>
          Все направления
        </Link>
        {startupsTags.map((value) => (
          <Link key={value} href={tagHref(value)} className={cn(styles.tag, tag === value && styles.tagActive)}>
            {value}
          </Link>
        ))}
      </nav>

      {startups.length ? (
        <ul className={`${homeStyles.grid} stagger`}>
          {startups.map((startup, index) => (
            <li key={startup.slug}>
              <StartupCard startup={startup} priority={index < 3} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="По вашему запросу результатов не найдено..." />
      )}

      <JsonLd
        data={[
          startupListSchema(startups),
          breadcrumbSchema([
            { name: 'Главная', path: routes.home },
            { name: 'Стартапы', path: routes.startups },
          ]),
        ]}
      />
    </Container>
  );
}
