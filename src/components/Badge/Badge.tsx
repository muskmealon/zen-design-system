import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant =
  | 'default'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'accent'
  | 'brandFilled'
  | 'successFilled'
  | 'errorFilled';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  children,
  className,
  ...props
}: BadgeProps) {
  const classes = [
    styles.badge,
    styles[size],
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {dot && <span className={styles.dot} aria-hidden />}
      {icon}
      {children}
    </span>
  );
}
