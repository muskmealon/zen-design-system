import {
  createContext,
  useContext,
  useId,
  type ReactNode,
  type ChangeEvent,
} from 'react';
import styles from './Radio.module.css';

export type RadioSize = 'sm' | 'md';

/* ── Context for RadioGroup ───────────────────────────────── */

interface RadioGroupContextValue {
  groupValue?: string;
  onChange?: (value: string) => void;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

/* ── Radio ────────────────────────────────────────────────── */

export interface RadioProps {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  size?: RadioSize;
  id?: string;
}

export function Radio({
  value,
  checked: checkedProp,
  onChange: onChangeProp,
  label,
  disabled = false,
  size = 'md',
  id: idProp,
}: RadioProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const ctx = useContext(RadioGroupContext);

  const isChecked =
    checkedProp !== undefined
      ? checkedProp
      : ctx.groupValue !== undefined
      ? ctx.groupValue === value
      : false;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      onChangeProp?.(value);
      ctx.onChange?.(value);
    }
  }

  const circleClasses = [
    styles.circle,
    styles[size],
    isChecked ? styles.selected : '',
    disabled ? styles.circleDisabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${styles.root} ${disabled ? styles.rootDisabled : ''}`}>
      <label className={styles.label} htmlFor={id}>
        <input
          id={id}
          type="radio"
          className={styles.hiddenInput}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          name={ctx.name}
        />
        <span className={circleClasses} aria-hidden="true">
          {isChecked && !disabled && <span className={`${styles.dot} ${styles[size + 'Dot']}`} />}
          {isChecked && disabled && <span className={`${styles.dot} ${styles[size + 'Dot']} ${styles.dotDisabled}`} />}
        </span>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
    </div>
  );
}

Radio.displayName = 'Radio';

/* ── RadioGroup ───────────────────────────────────────────── */

export interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
  name?: string;
}

export function RadioGroup({
  value,
  onChange,
  label,
  orientation = 'vertical',
  children,
  name,
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name ?? generatedName;

  return (
    <RadioGroupContext.Provider value={{ groupValue: value, onChange, name: groupName }}>
      <fieldset className={styles.group} role="radiogroup">
        {label && <legend className={styles.groupLabel}>{label}</legend>}
        <div
          className={`${styles.groupItems} ${
            orientation === 'horizontal' ? styles.horizontal : styles.vertical
          }`}
        >
          {children}
        </div>
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

RadioGroup.displayName = 'RadioGroup';
