import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  label?: string;
  helperText?: string;
  errorText?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      label,
      helperText,
      errorText,
      leadingIcon,
      trailingIcon,
      id,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(errorText);
    const wrapperClasses = [
      styles.wrapper,
      styles[size],
      leadingIcon && styles.hasLeadingIcon,
      trailingIcon && styles.hasTrailingIcon,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      styles.input,
      hasError && styles.errorInput,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {leadingIcon && (
            <span className={`${styles.iconSlot} ${styles.leadingIcon}`} aria-hidden>
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              errorText || helperText ? `${id}-helper` : undefined
            }
            className={inputClasses}
            {...props}
          />
          {trailingIcon && (
            <span className={`${styles.iconSlot} ${styles.trailingIcon}`} aria-hidden>
              {trailingIcon}
            </span>
          )}
        </div>
        {(errorText || helperText) && (
          <span
            id={`${id}-helper`}
            className={`${styles.helperText} ${hasError ? styles.errorText : ''}`}
            role={hasError ? 'alert' : undefined}
          >
            {errorText || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
