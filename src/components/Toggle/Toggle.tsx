import { useState, useId, type KeyboardEvent } from 'react';
import styles from './Toggle.module.css';

export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleLabelPosition = 'left' | 'right';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
  label?: string;
  labelPosition?: ToggleLabelPosition;
  id?: string;
}

export function Toggle({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = 'md',
  label,
  labelPosition = 'right',
  id: idProp,
}: ToggleProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isOn = isControlled ? checked : internalChecked;

  function toggle() {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  }

  const trackClasses = [
    styles.track,
    styles[size],
    isOn ? styles.trackOn : styles.trackOff,
    disabled ? styles.trackDisabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const thumbClasses = [
    styles.thumb,
    styles[size + 'Thumb'],
    isOn ? styles.thumbOn : '',
    disabled ? styles.thumbDisabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelEl = label ? (
    <span
      id={`${id}-label`}
      className={`${styles.label} ${disabled ? styles.labelDisabled : ''}`}
    >
      {label}
    </span>
  ) : null;

  return (
    <div
      className={`${styles.root} ${disabled ? styles.rootDisabled : ''}`}
    >
      {label && labelPosition === 'left' && labelEl}
      <button
        id={id}
        role="switch"
        type="button"
        aria-checked={isOn}
        aria-labelledby={label ? `${id}-label` : undefined}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={trackClasses}
      >
        <span className={thumbClasses} />
      </button>
      {label && labelPosition === 'right' && labelEl}
    </div>
  );
}

Toggle.displayName = 'Toggle';
