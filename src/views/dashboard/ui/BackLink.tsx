import { ChevronLeft } from 'lucide-react';
import { Button } from '@/shared/ui';
import styles from './BackLink.module.css';

export function BackLink({ href }: { href: string }) {
  return (
    <Button href={href} size="s" color="white50" iconLeft={<ChevronLeft aria-hidden />} className={styles.back}>
      Назад
    </Button>
  );
}
