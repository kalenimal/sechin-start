import { Button } from '@/shared/ui/Button';
import { EmptyState } from '@/shared/ui/EmptyState';
import styles from './not-found.module.css';

export const metadata = { title: 'Страница не найдена', robots: { index: false } };

export default function NotFound() {
  return (
    <main className={styles.root}>
      <EmptyState
        title="Страница не найдена"
        action={
          <Button href="/" size="m">
            На главную
          </Button>
        }
      />
    </main>
  );
}
