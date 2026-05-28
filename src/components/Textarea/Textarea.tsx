import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type TextareaHTMLAttributes,
} from 'react';
import styles from './Textarea.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TextareaResize = 'none' | 'vertical' | 'both';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  rows?: number;
  resize?: TextareaResize;
  showCount?: boolean;
  maxLength?: number;
  disabled?: boolean;
  id?: string;
  placeholder?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorText,
      rows = 4,
      resize = 'vertical',
      showCount = false,
      maxLength,
      disabled = false,
      id,
      placeholder,
      className,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    // Track character count — handle both controlled and uncontrolled
    const [charCount, setCharCount] = useState<number>(() => {
      if (value !== undefined) return String(value).length;
      if (defaultValue !== undefined) return String(defaultValue).length;
      return 0;
    });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const hasError = Boolean(errorText);

    const textareaClass = [
      styles.textarea,
      hasError ? styles.error : '',
      styles[`resize_${resize}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const ariaDescribedBy = [
      hasError ? errorId : null,
      helperText && !hasError ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-describedby={ariaDescribedBy}
          aria-invalid={hasError || undefined}
          className={textareaClass}
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />

        {(helperText || errorText || showCount) && (
          <div className={styles.footer}>
            <span>
              {hasError ? (
                <span id={errorId} className={styles.errorText}>
                  {errorText}
                </span>
              ) : helperText ? (
                <span id={helperId} className={styles.helperText}>
                  {helperText}
                </span>
              ) : null}
            </span>

            {showCount && (
              <span className={[styles.charCount, hasError ? styles.charCountError : ''].filter(Boolean).join(' ')}>
                {charCount}
                {maxLength !== undefined ? `/${maxLength}` : ''}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
