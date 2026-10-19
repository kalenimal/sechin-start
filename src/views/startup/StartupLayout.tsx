import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Startup } from '@/entities/startup';
import { startupSchema } from '@/entities/startup';
import { routes } from '@/shared/config';
import { breadcrumbSchema, JsonLd } from '@/shared/lib/seo';
import { Container } from '@/shared/ui/Container';
import { StartupHero } from '@/widgets/startup-hero';
import { StartupTabs } from '@/widgets/startup-tabs';
import styles from './StartupLayout.module.css';

export function StartupLayout({ startup, children }: { startup: Startup; children: ReactNode }) {
  return (
    <Container className={styles.page}>
      <nav aria-label="Хлебные крошки" className="visually-hidden">
        <ol>
          <li>
            <Link href={routes.home}>Главная</Link>
          </li>
          <li>
            <Link href={routes.startups}>Цифровые сервисы</Link>
          </li>
          <li aria-current="page">{startup.name}</li>
        </ol>
      </nav>
      <StartupHero startup={startup} />
      <div className={styles.content}>
        <StartupTabs slug={startup.slug} />
        <div className={styles.panel}>{children}</div>
      </div>
      <JsonLd
        data={[
          startupSchema(startup),
          breadcrumbSchema([
            { name: 'Главная', path: routes.home },
            { name: 'Цифровые сервисы', path: routes.startups },
            { name: startup.name, path: routes.startup(startup.slug) },
          ]),
        ]}
      />
    </Container>
  );
}
