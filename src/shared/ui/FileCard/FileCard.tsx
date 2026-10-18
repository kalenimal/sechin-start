import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import styles from './FileCard.module.css';

type FileCardProps = {
  name: string;
  size: string;
  href?: string;
  variant?: 'default' | 'wide';
  className?: string;
};

/** PDF document tile used on project pages and public startup pages. */
export function FileCard({ name, size, href, variant = 'default', className }: FileCardProps) {
  const content = (
    <>
      <Image src="/icons/pdf.svg" alt="" width={48} height={48} className={styles.icon} />
      <span className={styles.name} title={name}>
        {name}
      </span>
      <span className={styles.size}>{size}</span>
    </>
  );
  const classes = cn(styles.card, styles[variant], className);
  return href ? (
    <a href={href} className={classes} download>
      {content}
    </a>
  ) : (
    <div className={classes}>{content}</div>
  );
}
