import {
  createContext,
  useContext,
  useState,
  useId,
  type ReactNode,
} from 'react';
import styles from './Tabs.module.css';

// ─── Context ──────────────────────────────────────────────────────────────────

type TabsVariant = 'line' | 'pill';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsVariant;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('Tabs sub-components must be used within a <Tabs> component.');
  }
  return ctx;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  variant?: TabsVariant;
}

export function Tabs({
  defaultValue = '',
  value,
  onChange,
  children,
  variant = 'line',
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const baseId = useId();

  const isControlled = value !== undefined;
  const activeTab = isControlled ? value! : internalValue;

  const setActiveTab = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant, baseId }}>
      <div className={[styles.tabs, styles[variant]].join(' ')}>{children}</div>
    </TabsContext.Provider>
  );
}

// ─── TabList ──────────────────────────────────────────────────────────────────

export interface TabListProps {
  children: ReactNode;
  'aria-label'?: string;
}

export function TabList({ children, 'aria-label': ariaLabel }: TabListProps) {
  const { variant } = useTabsContext();
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={[styles.tabList, styles[`tabList_${variant}`]].join(' ')}
    >
      {children}
    </div>
  );
}

// ─── Tab ─────────────────────────────────────────────────────────────────────

export interface TabProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  icon?: ReactNode;
}

export function Tab({ value, disabled = false, children, icon }: TabProps) {
  const { activeTab, setActiveTab, variant, baseId } = useTabsContext();
  const isActive = activeTab === value;

  const classes = [
    styles.tab,
    styles[`tab_${variant}`],
    isActive ? styles[`tab_${variant}_active`] : '',
    disabled ? styles.tab_disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={isActive}
      disabled={disabled}
      className={classes}
      onClick={() => !disabled && setActiveTab(value)}
      type="button"
      tabIndex={isActive ? 0 : -1}
    >
      {icon && <span className={styles.tabIcon}>{icon}</span>}
      {children}
    </button>
  );
}

// ─── TabPanel ─────────────────────────────────────────────────────────────────

export interface TabPanelProps {
  value: string;
  children: ReactNode;
}

export function TabPanel({ value, children }: TabPanelProps) {
  const { activeTab, baseId } = useTabsContext();
  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      className={styles.tabPanel}
    >
      {children}
    </div>
  );
}
