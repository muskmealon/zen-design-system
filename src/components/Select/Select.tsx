import {
  Select as AriaSelect,
  SelectValue,
  Button as AriaButton,
  Popover,
  ListBox,
  ListBoxItem,
  Label,
} from 'react-aria-components';
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
  placeholder = 'Select an option',
  disabled = false,
  size = 'md',
  label,
  helperText,
  errorText,
  id,
}: SelectProps) {
  const hasError = Boolean(errorText);
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 18;

  return (
    <AriaSelect
      id={id}
      selectedKey={value}
      defaultSelectedKey={defaultValue}
      onSelectionChange={(key) => onChange?.(String(key))}
      isDisabled={disabled}
      placeholder={placeholder}
      className={[styles.wrapper, styles[size]].join(' ')}
      aria-describedby={errorText || helperText ? `${id ?? ''}-helper` : undefined}
      aria-invalid={hasError}
    >
      {label && <Label className={styles.label}>{label}</Label>}
      <div className={styles.selectWrapper}>
        <AriaButton
          className={[
            styles.select,
            hasError ? styles.selectError : '',
            disabled ? styles.selectDisabled : '',
          ].filter(Boolean).join(' ')}
        >
          <SelectValue />
          <span className={styles.icon} aria-hidden="true">
            <ChevronDown size={iconSize} />
          </span>
        </AriaButton>
      </div>

      <Popover className={styles.popover}>
        <ListBox className={styles.listbox}>
          {options.map((opt) => (
            <ListBoxItem
              key={opt.value}
              id={opt.value}
              isDisabled={opt.disabled}
              className={({ isDisabled, isFocused, isSelected }) =>
                [
                  styles.option,
                  isDisabled ? styles.optionDisabled : '',
                  isFocused ? styles.optionFocused : '',
                  isSelected ? styles.optionSelected : '',
                ].filter(Boolean).join(' ')
              }
            >
              {opt.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>

      {(errorText || helperText) && (
        <span
          id={id ? `${id}-helper` : undefined}
          className={`${styles.helperText} ${hasError ? styles.helperTextError : ''}`}
          role={hasError ? 'alert' : undefined}
        >
          {errorText || helperText}
        </span>
      )}
    </AriaSelect>
  );
}

Select.displayName = 'Select';
