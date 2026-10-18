import Link from 'next/link';
import { routes, siteConfig } from '@/shared/config';
import { Container } from '@/shared/ui';
import styles from './PublicFooter.module.css';

export function PublicFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p>
          © {new Date().getFullYear()} {siteConfig.organization.name}
        </p>
        <nav aria-label="Ссылки в подвале" className={styles.links}>
          <Link href={routes.startups}>Стартапы</Link>
          <Link href={routes.auth}>Регистрация</Link>
          <Link href={routes.login}>Вход</Link>
        </nav>
      </Container>
    </footer>
  );
}
