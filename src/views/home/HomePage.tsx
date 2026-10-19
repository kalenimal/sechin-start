import { getStartups, StartupCard, startupListSchema } from '@/entities/startup';
import { JsonLd } from '@/shared/lib/seo';
import { Container } from '@/shared/ui/Container';
import styles from './HomePage.module.css';

export async function HomePage() {
  const startups = await getStartups();
  return (
    <Container as="section" className={styles.section} aria-labelledby="home-title">
      <h1 id="home-title" className={styles.title}>
        Цифровые сервисы, развивающиеся вместе с нами
      </h1>
      <p className="visually-hidden">
        Платформа Сеченовского Университета объединяет медицинские проекты, экспертов, инвесторов и корпорации.
      </p>
      <ul className={`${styles.grid} stagger`}>
        {startups.map((startup, index) => (
          <li key={startup.slug}>
            <StartupCard startup={startup} priority={index === 0} headingLevel="h2" />
          </li>
        ))}
      </ul>
      <JsonLd data={startupListSchema(startups)} />
    </Container>
  );
}
