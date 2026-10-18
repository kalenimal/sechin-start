import { LogIn } from 'lucide-react';
import { routes } from '@/shared/config';
import { Button, Container, Logo } from '@/shared/ui';
import { PublicNav } from './PublicNav';
import styles from './PublicHeader.module.css';

export function PublicHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo variant="horizontal" />
        <PublicNav />
        <Button href={routes.auth} color="grey" size="m" iconRight={<LogIn aria-hidden />} className={styles.login}>
          Вход в платформу
        </Button>
      </Container>
    </header>
  );
}
