import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';
import styles from './ActionMenu.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionMenuItemVariant = 'default' | 'danger';

export interface ActionMenuItemDef {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ActionMenuItemVariant;
  dividerAbove?: boolean;
}

export interface ActionMenuItemProps {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ActionMenuItemVariant;
}

export interface ActionMenuProps {
  trigger: ReactNode;
  items: ActionMenuItemDef[];
  align?: 'left' | 'right';
  className?: string;
}

// ─── ActionMenuItem (standalone / composable) ─────────────────────────────────

export function ActionMenuItem({
  icon,
  label,
  onClick,
  disabled = false,
  variant = 'default',
}: ActionMenuItemProps) {
  const itemClass = [
    styles.item,
    variant === 'danger' && styles.itemDanger,
    disabled && styles.itemDisabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={itemClass}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      role="menuitem"
    >
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      <span className={styles.itemLabel}>{label}</span>
    </button>
  );
}

// ─── ActionMenu ───────────────────────────────────────────────────────────────

export function ActionMenu({
  trigger,
  items,
  align = 'left',
  className,
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Click-outside detection
  useEffect(() => {
    if (!open) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open, close]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, close]);

  const panelClass = [
    styles.panel,
    align === 'right' && styles.panelRight,
    open && styles.panelVisible,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={wrapperRef}
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
    >
      {/* Trigger */}
      <div
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </div>

      {/* Menu panel */}
      <div
        className={panelClass}
        role="menu"
        aria-hidden={!open}
      >
        {items.map((item, index) => (
          <div key={index}>
            {item.dividerAbove && <div className={styles.divider} role="separator" />}
            <ActionMenuItem
              icon={item.icon}
              label={item.label}
              onClick={() => {
                item.onClick?.();
                close();
              }}
              disabled={item.disabled}
              variant={item.variant}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
