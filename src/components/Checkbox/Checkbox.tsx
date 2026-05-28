import {
  useRef,
  useEffect,
  useId,
  useState,
  type ReactNode,
  type ChangeEvent,
} from 'react';
import { Check, Minus } from 'lucide-react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: CheckboxSize;
  id?: string;
}

export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  helperText,
  disabled = false,
  indeterminate = false,
  size = 'md',
  id: idProp,
}: CheckboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isChecked = isControlled ? checked : internalChecked;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e.target.checked);
  }

  const boxClasses = [
    styles.box,
    styles[size],
    isChecked && !indeterminate ? styles.checked : '',
    indeterminate ? styles.indeterminate : '',
    disabled ? styles.boxDisabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${styles.root} ${disabled ? styles.rootDisabled : ''}`}>
      <label className={styles.label} htmlFor={id}>
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          className={styles.hiddenInput}
          checked={isControlled ? checked : internalChecked}
          onChange={handleChange}
          disabled={disabled}
          aria-describedby={helperText ? `${id}-helper` : undefined}
        />
        <span className={boxClasses} aria-hidden="true">
          {indeterminate && <Minus size={size === 'sm' ? 10 : 12} strokeWidth={3} />}
          {!indeterminate && isChecked && (
            <Check size={size === 'sm' ? 10 : 12} strokeWidth={3} />
          )}
        </span>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
      {helperText && (
        <span id={`${id}-helper`} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
}

Checkbox.displayName = 'Checkbox';

/* ── CheckboxGroup ─────────────────────────────────────────── */

export interface CheckboxGroupProps {
  label?: string;
  children: ReactNode;
  orientation?: 'vertical' | 'horizontal';
}

export function CheckboxGroup({
  label,
  children,
  orientation = 'vertical',
}: CheckboxGroupProps) {
  return (
    <fieldset className={styles.group}>
      {label && <legend className={styles.groupLabel}>{label}</legend>}
      <div
        className={`${styles.groupItems} ${
          orientation === 'horizontal' ? styles.horizontal : styles.vertical
        }`}
      >
        {children}
      </div>
    </fieldset>
  );
}

CheckboxGroup.displayName = 'CheckboxGroup';
