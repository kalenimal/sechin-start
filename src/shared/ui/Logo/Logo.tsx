import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/shared/lib/cn';
import styles from './Logo.module.css';

type LogoProps = {
  href?: string;
  variant?: 'vertical' | 'horizontal';
  /** Rendered height in px; width keeps the original aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
};

const sizes = {
  vertical: { src: '/images/sechenov-logo.svg', width: 97, height: 130 },
  horizontal: { src: '/images/sechenov-logo-horizontal.svg', width: 175, height: 56 },
} as const;

export function Logo({
  href = '/',
  variant = 'vertical',
  height: targetHeight,
  className,
  priority = true,
}: LogoProps) {
  const source = sizes[variant];
  const height = targetHeight ?? source.height;
  const width = Math.round((source.width * height) / source.height);
  const { src } = source;
  return (
    <Link href={href} className={cn(styles.root, className)} aria-label="Сеченовский Университет — на главную">
      <Image src={src} alt="Сеченовский Университет" width={width} height={height} priority={priority} />
    </Link>
  );
}
