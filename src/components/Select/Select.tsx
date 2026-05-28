import { useState, useId, type ChangeEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: SelectSize;
  label?: string;
  helperText?: string;
  errorText?: string;
  id?: string;
}

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  size = 'md',
  label,
  helperText,
  errorText,
  id: idProp,
}: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const selectValue = isControlled ? value : internalValue;

  const hasError = Boolean(errorText);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  }

  const wrapperClasses = [styles.wrapper, styles[size]].filter(Boolean).join(' ');

  const selectClasses = [
    styles.select,
    hasError ? styles.selectError : '',
    disabled ? styles.selectDisabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 18;

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.selectWrapper}>
        <select
          id={id}
          className={selectClasses}
          value={selectValue}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={errorText || helperText ? `${id}-helper` : undefined}
        >
          {placeholder && (
            <option value="" disabled={!selectValue}>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.icon} aria-hidden="true">
          <ChevronDown size={iconSize} />
        </span>
      </div>
      {(errorText || helperText) && (
        <span
          id={`${id}-helper`}
          className={`${styles.helperText} ${hasError ? styles.helperTextError : ''}`}
          role={hasError ? 'alert' : undefined}
        >
          {errorText || helperText}
        </span>
      )}
    </div>
  );
}

Select.displayName = 'Select';
