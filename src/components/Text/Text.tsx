import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Text.module.css';

export type TextVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body1' | 'body2'
  | 'caption' | 'overline' | 'label' | 'code';

export type TextColor =
  | 'primary' | 'secondary' | 'tertiary' | 'muted'
  | 'brand' | 'error' | 'success' | 'warning' | 'info'
  | 'inverse' | 'disabled';

export type TextWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

const defaultTags: Record<TextVariant, ElementType> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
  body1: 'p', body2: 'p',
  caption: 'span', overline: 'span', label: 'span', code: 'code',
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: TextColor;
  weight?: TextWeight;
  truncate?: boolean;
  as?: ElementType;
  children?: ReactNode;
}

export function Text({
  variant = 'body1',
  color = 'primary',
  weight,
  truncate = false,
  as,
  children,
  className,
  ...props
}: TextProps) {
  const Tag = as ?? defaultTags[variant];

  const colorClass = `color${color.charAt(0).toUpperCase()}${color.slice(1)}` as keyof typeof styles;
  const weightClass = weight
    ? (`weight${weight.charAt(0).toUpperCase()}${weight.slice(1)}` as keyof typeof styles)
    : null;

  const classes = [
    styles.text,
    styles[variant],
    styles[colorClass],
    weightClass && styles[weightClass],
    truncate && styles.truncate,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
