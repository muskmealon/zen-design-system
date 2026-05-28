import { type ReactNode } from 'react';
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
} from 'react-aria-components';
import styles from './Tabs.module.css';

type TabsVariant = 'line' | 'pill';

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  variant?: TabsVariant;
}

export function Tabs({ defaultValue, value, onChange, children, variant = 'line' }: TabsProps) {
  return (
    <AriaTabs
      selectedKey={value}
      defaultSelectedKey={defaultValue}
      onSelectionChange={(key) => onChange?.(String(key))}
      className={[styles.tabs, styles[variant]].join(' ')}
      // Pass variant down via data attribute for child access
      data-variant={variant}
    >
      {children}
    </AriaTabs>
  );
}

export interface TabListProps {
  children: ReactNode;
  'aria-label'?: string;
  variant?: TabsVariant;
}

export function TabList({ children, 'aria-label': ariaLabel, variant = 'line' }: TabListProps) {
  return (
    <AriaTabList
      aria-label={ariaLabel}
      className={[styles.tabList, styles[`tabList_${variant}`]].join(' ')}
    >
      {children}
    </AriaTabList>
  );
}

export interface TabProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  icon?: ReactNode;
  variant?: TabsVariant;
}

export function Tab({ value, disabled = false, children, icon, variant = 'line' }: TabProps) {
  return (
    <AriaTab
      id={value}
      isDisabled={disabled}
      className={({ isSelected, isDisabled: isDis }) =>
        [
          styles.tab,
          styles[`tab_${variant}`],
          isSelected ? styles[`tab_${variant}_active`] : '',
          isDis ? styles.tab_disabled : '',
        ].filter(Boolean).join(' ')
      }
    >
      {icon && <span className={styles.tabIcon}>{icon}</span>}
      {children}
    </AriaTab>
  );
}

export interface TabPanelProps {
  value: string;
  children: ReactNode;
}

export function TabPanel({ value, children }: TabPanelProps) {
  return (
    <AriaTabPanel id={value} className={styles.tabPanel}>
      {children}
    </AriaTabPanel>
  );
}
