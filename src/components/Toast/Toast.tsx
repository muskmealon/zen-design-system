import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import ReactDOM from 'react-dom';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  dismissible?: boolean;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

export interface ToastProps extends ToastOptions {
  onDismiss?: () => void;
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICONS: Record<ToastVariant, ReactNode> = {
  info: <Info size={16} aria-hidden />,
  success: <CheckCircle2 size={16} aria-hidden />,
  warning: <AlertTriangle size={16} aria-hidden />,
  error: <XCircle size={16} aria-hidden />,
};

// ─── Toast (visual component) ─────────────────────────────────────────────────

export function Toast({
  variant = 'info',
  title,
  description,
  dismissible = true,
  onDismiss,
  action,
  duration = 5000,
}: ToastProps) {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, onDismiss]);

  if (!visible) return null;

  const handleDismiss = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
    onDismiss?.();
  };

  const rootClass = [styles.toast, styles[variant]].join(' ');

  return (
    <div className={rootClass} role="alert" aria-live="assertive">
      <span className={styles.icon}>{ICONS[variant]}</span>

      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        {description && <p className={styles.description}>{description}</p>}
        {action && (
          <button
            type="button"
            className={styles.actionButton}
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          className={styles.dismissButton}
          onClick={handleDismiss}
          aria-label="Dismiss notification"
        >
          <X size={14} aria-hidden />
        </button>
      )}
    </div>
  );
}

// ─── ToastProvider & useToast ─────────────────────────────────────────────────

interface ToastEntry extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const baseId = useId();
  const counterRef = useRef(0);

  const addToast = useCallback((options: ToastOptions) => {
    const id = `${baseId}-toast-${++counterRef.current}`;
    setToasts((prev) => [...prev, { ...options, id }]);
  }, [baseId]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {ReactDOM.createPortal(
        <div className={styles.container} aria-label="Notifications">
          {toasts.map((t) => (
            <Toast
              key={t.id}
              variant={t.variant}
              title={t.title}
              description={t.description}
              dismissible={t.dismissible ?? true}
              action={t.action}
              duration={t.duration ?? 5000}
              onDismiss={() => removeToast(t.id)}
            />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>.');
  }
  return ctx;
}
