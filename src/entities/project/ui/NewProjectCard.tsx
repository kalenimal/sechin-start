import Link from 'next/link';
import { Plus } from 'lucide-react';
import { ChamferFrame } from '@/shared/ui/ChamferFrame';
import styles from './NewProjectCard.module.css';

type NewProjectCardProps = { label?: string } & (
  { href: string; onClick?: never } | { onClick: () => void; href?: never }
);

/** Dashed "+ Новый проект / Новый запрос" tile with two cut corners. */
export function NewProjectCard({ href, onClick, label = 'Новый проект' }: NewProjectCardProps) {
  const content = (
    <>
      <ChamferFrame
        width={286}
        height={323}
        corners="tl-br"
        cut={36}
        dashed
        stroke="var(--color-primary)"
        fill="rgba(242, 244, 245, 0.6)"
      />
      <span className={styles.icon} aria-hidden>
        <Plus />
      </span>
      <span className={styles.label}>{label}</span>
    </>
  );
  return href ? (
    <Link href={href} className={styles.card}>
      {content}
    </Link>
  ) : (
    <button type="button" className={styles.card} onClick={onClick}>
      {content}
    </button>
  );
}
