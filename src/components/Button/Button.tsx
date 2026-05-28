import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'neutral';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconOnly?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      iconOnly = false,
      leadingIcon,
      trailingIcon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.button,
      styles[size],
      styles[variant],
      fullWidth && styles.fullWidth,
      iconOnly && styles.iconOnly,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} {...props}>
        {leadingIcon}
        {!iconOnly && children}
        {trailingIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
