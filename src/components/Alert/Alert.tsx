import { useState, type ReactNode } from 'react';
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
} from 'lucide-react';
import styles from './Alert.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

// ─── Default icons per variant ────────────────────────────────────────────────

const DEFAULT_ICONS: Record<AlertVariant, ReactNode> = {
  info: <Info size={16} aria-hidden />,
  success: <CheckCircle2 size={16} aria-hidden />,
  warning: <AlertTriangle size={16} aria-hidden />,
  error: <XCircle size={16} aria-hidden />,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  action,
  className,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const rootClass = [styles.alert, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  const resolvedIcon = icon !== undefined ? icon : DEFAULT_ICONS[variant];

  return (
    <div className={rootClass} role="alert" aria-live="polite">
      {resolvedIcon && (
        <span className={styles.iconSlot}>{resolvedIcon}</span>
      )}

      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.description}>{children}</div>}
        {action && <div className={styles.action}>{action}</div>}
      </div>

      {dismissible && (
        <button
          type="button"
          className={styles.dismissButton}
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <X size={14} aria-hidden />
        </button>
      )}
    </div>
  );
}
