import { type ReactNode } from 'react';
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from 'react-aria-components';
import styles from './Radio.module.css';

export type RadioSize = 'sm' | 'md';

export interface RadioProps {
  value: string;
  label?: string;
  disabled?: boolean;
  size?: RadioSize;
  id?: string;
}

export function Radio({ value, label, disabled = false, size = 'md', id }: RadioProps) {
  return (
    <AriaRadio
      id={id}
      value={value}
      isDisabled={disabled}
      className={({ isDisabled }) =>
        [styles.root, isDisabled && styles.rootDisabled].filter(Boolean).join(' ')
      }
    >
      {({ isSelected, isDisabled: isDis, isFocusVisible }) => (
        <span className={styles.label}>
          <span
            className={[
              styles.circle,
              styles[size],
              isSelected ? styles.selected : '',
              isDis ? styles.circleDisabled : '',
              isFocusVisible ? styles.circleFocused : '',
            ].filter(Boolean).join(' ')}
            aria-hidden="true"
          >
            {isSelected && (
              <span
                className={[
                  styles.dot,
                  styles[`${size}Dot`],
                  isDis ? styles.dotDisabled : '',
                ].filter(Boolean).join(' ')}
              />
            )}
          </span>
          {label && <span className={styles.labelText}>{label}</span>}
        </span>
      )}
    </AriaRadio>
  );
}

Radio.displayName = 'Radio';

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
  name?: string;
}

export function RadioGroup({
  value,
  defaultValue,
  onChange,
  label,
  orientation = 'vertical',
  children,
  name,
}: RadioGroupProps) {
  return (
    <AriaRadioGroup
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      name={name}
      className={styles.group}
    >
      {label && <span className={styles.groupLabel}>{label}</span>}
      <div
        className={`${styles.groupItems} ${
          orientation === 'horizontal' ? styles.horizontal : styles.vertical
        }`}
      >
        {children}
      </div>
    </AriaRadioGroup>
  );
}

RadioGroup.displayName = 'RadioGroup';
