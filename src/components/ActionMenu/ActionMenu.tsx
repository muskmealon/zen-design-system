import { type ReactNode } from 'react';
import {
  MenuTrigger,
  Menu,
  MenuItem,
  Popover,
  Button as AriaButton,
  Separator,
} from 'react-aria-components';
import styles from './ActionMenu.module.css';

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

export function ActionMenuItem({
  icon,
  label,
  onClick,
  disabled = false,
  variant = 'default',
}: ActionMenuItemProps) {
  return (
    <MenuItem
      onAction={disabled ? undefined : onClick}
      isDisabled={disabled}
      className={({ isDisabled, isFocused }) =>
        [
          styles.item,
          variant === 'danger' ? styles.itemDanger : '',
          isDisabled ? styles.itemDisabled : '',
          isFocused ? styles.itemFocused : '',
        ].filter(Boolean).join(' ')
      }
    >
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      <span className={styles.itemLabel}>{label}</span>
    </MenuItem>
  );
}

export interface ActionMenuProps {
  trigger: ReactNode;
  items: ActionMenuItemDef[];
  align?: 'left' | 'right';
  className?: string;
}

export function ActionMenu({ trigger, items, align = 'left', className }: ActionMenuProps) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <MenuTrigger>
        <AriaButton className={styles.trigger}>{trigger}</AriaButton>
        <Popover
          placement={align === 'right' ? 'bottom end' : 'bottom start'}
          className={styles.panel}
        >
          <Menu className={styles.menuList}>
            {items.map((item, index) => (
              <div key={index}>
                {item.dividerAbove && <Separator className={styles.divider} />}
                <ActionMenuItem
                  icon={item.icon}
                  label={item.label}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  variant={item.variant}
                />
              </div>
            ))}
          </Menu>
        </Popover>
      </MenuTrigger>
    </div>
  );
}
