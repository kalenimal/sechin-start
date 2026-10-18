import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './TextLink.module.css';

type TextLinkProps = {
  href?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'l' | 'm';
  tone?: 'primary' | 'muted';
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

/** Semibold primary text action ("Забыли пароль?", "У меня уже есть аккаунт"). Renders a link or a button. */
export function TextLink({
  href,
  align = 'left',
  size = 'l',
  tone = 'primary',
  icon,
  className,
  children,
  ...rest
}: TextLinkProps) {
  const classes = cn(styles.link, styles[align], styles[size], styles[tone], className);
  const content = (
    <>
      {children}
      {icon}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
