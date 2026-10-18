import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './Button.module.css';

export type ButtonColor = 'primary' | 'secondary' | 'white' | 'white50' | 'grey';
export type ButtonSize = 'l' | 'm' | 's' | 'xs';

type BaseProps = {
  color?: ButtonColor;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  /** Square icon-only button; pass the icon as children and an aria-label. */
  iconOnly?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = BaseProps & Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps> & { href?: undefined };
type ButtonAsLink = BaseProps & Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    color = 'primary',
    size = 'l',
    iconLeft,
    iconRight,
    iconOnly = false,
    fullWidth = false,
    loading = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    styles.button,
    styles[color],
    styles[size],
    iconOnly && styles.iconOnly,
    !iconOnly && iconLeft && styles.withIconLeft,
    !iconOnly && iconRight && styles.withIconRight,
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  );

  const content = (
    <>
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      {iconOnly ? <span className={styles.icon}>{children}</span> : children}
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const { type = 'button', disabled, ...buttonProps } = rest as ButtonAsButton;
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
