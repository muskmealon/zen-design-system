import { type ReactNode } from 'react';
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
} from 'react-aria-components';
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
  id,
}: CheckboxProps) {
  const iconSize = size === 'sm' ? 10 : 12;

  return (
    <div className={styles.root}>
      <AriaCheckbox
        id={id}
        isSelected={checked}
        defaultSelected={defaultChecked}
        onChange={onChange}
        isDisabled={disabled}
        isIndeterminate={indeterminate}
        className={({ isDisabled }) =>
          [styles.label, isDisabled && styles.rootDisabled].filter(Boolean).join(' ')
        }
      >
        {({ isSelected, isIndeterminate: isIndet, isDisabled: isDis, isFocusVisible }) => (
          <>
            <span
              className={[
                styles.box,
                styles[size],
                isSelected && !isIndet ? styles.checked : '',
                isIndet ? styles.indeterminate : '',
                isDis ? styles.boxDisabled : '',
                isFocusVisible ? styles.boxFocused : '',
              ].filter(Boolean).join(' ')}
              aria-hidden="true"
            >
              {isIndet && <Minus size={iconSize} strokeWidth={3} />}
              {!isIndet && isSelected && <Check size={iconSize} strokeWidth={3} />}
            </span>
            {label && <span className={styles.labelText}>{label}</span>}
          </>
        )}
      </AriaCheckbox>
      {helperText && (
        <span id={id ? `${id}-helper` : undefined} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
}

Checkbox.displayName = 'Checkbox';

export interface CheckboxGroupProps {
  label?: string;
  children: ReactNode;
  orientation?: 'vertical' | 'horizontal';
}

export function CheckboxGroup({ label, children, orientation = 'vertical' }: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup className={styles.group}>
      {label && <span className={styles.groupLabel}>{label}</span>}
      <div
        className={`${styles.groupItems} ${
          orientation === 'horizontal' ? styles.horizontal : styles.vertical
        }`}
      >
        {children}
      </div>
    </AriaCheckboxGroup>
  );
}

CheckboxGroup.displayName = 'CheckboxGroup';
