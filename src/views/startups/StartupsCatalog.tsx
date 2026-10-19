'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { filterStartups, StartupCard, startupsTags, type Startup } from '@/entities/startup';
import { routes } from '@/shared/config';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import { EmptyState } from '@/shared/ui/EmptyState';
import homeStyles from '../home/HomePage.module.css';
import styles from './StartupsPage.module.css';

type Query = { q?: string; tag?: string };

const catalogHref = ({ q, tag }: Query) => {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (tag) params.set('tag', tag);
  const query = params.toString();
  return query ? `${routes.startups}?${query}` : routes.startups;
};

/** `withQuery` reads ?q=&tag= (needs <Suspense>); without it renders the unfiltered list for the static HTML. */
export function StartupsCatalog({ startups, withQuery = false }: { startups: Startup[]; withQuery?: boolean }) {
  return withQuery ? <CatalogFromQuery startups={startups} /> : <Catalog startups={startups} query={{}} />;
}

function CatalogFromQuery({ startups }: { startups: Startup[] }) {
  const params = useSearchParams();
  return (
    <Catalog startups={startups} query={{ q: params.get('q') ?? undefined, tag: params.get('tag') ?? undefined }} />
  );
}

function Catalog({ startups, query }: { startups: Startup[]; query: Query }) {
  const router = useRouter();
  const { q, tag } = query;
  const visible = filterStartups(startups, query);

  return (
    <>
      <form
        className={styles.search}
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          const value = new FormData(event.currentTarget).get('q');
          router.push(catalogHref({ q: typeof value === 'string' ? value.trim() : undefined, tag }));
        }}
      >
        <label htmlFor="startups-q" className="visually-hidden">
          Поиск по стартапам
        </label>
        <input
          key={q}
          id="startups-q"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Ищите по названию, направлению или описанию"
          className={styles.input}
        />
        <Button type="submit" size="s">
          Поиск
        </Button>
      </form>

      <nav className={styles.tags} aria-label="Направления">
        <Link href={catalogHref({ q })} className={cn(styles.tag, !tag && styles.tagActive)}>
          Все направления
        </Link>
        {startupsTags.map((value) => (
          <Link
            key={value}
            href={catalogHref({ q, tag: value })}
            className={cn(styles.tag, tag === value && styles.tagActive)}
          >
            {value}
          </Link>
        ))}
      </nav>

      {visible.length ? (
        <ul className={`${homeStyles.grid} stagger`}>
          {visible.map((startup, index) => (
            <li key={startup.slug}>
              <StartupCard startup={startup} priority={index === 0} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="По вашему запросу результатов не найдено..." />
      )}
    </>
  );
}
