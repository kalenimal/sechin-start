import { LogIn } from 'lucide-react';
import { routes } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { Logo } from '@/shared/ui/Logo';
import { HeaderShell } from './HeaderShell';
import { PublicNav } from './PublicNav';
import styles from './PublicHeader.module.css';

export function PublicHeader() {
  return (
    <HeaderShell>
      <Container className={styles.inner}>
        <Logo variant="horizontal" height={40} className={styles.logo} />
        <PublicNav />
        <Button href={routes.auth} color="grey" size="s" iconRight={<LogIn aria-hidden />} className={styles.login}>
          Вход в платформу
        </Button>
      </Container>
    </HeaderShell>
  );
}
