import {
  type ReactNode,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import styles from './Dialog.module.css';

/* ── Types ─────────────────────────────────────────────────── */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

/* ── Dialog (root) ─────────────────────────────────────────── */
export interface DialogProps {
  open: boolean;
  onClose: () => void;
  size?: DialogSize;
  children: ReactNode;
  closeOnOverlayClick?: boolean;
}

export function Dialog({
  open,
  onClose,
  size = 'md',
  children,
  closeOnOverlayClick = true,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    first?.focus();
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [open]);

  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick) onClose();
  }, [closeOnOverlayClick, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="presentation"
      aria-hidden={!open}
    >
      <div
        ref={panelRef}
        className={[styles.panel, styles[size]].join(' ')}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

/* ── DialogHeader ───────────────────────────────────────────── */
export interface DialogHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
}

export function DialogHeader({ title, subtitle, onClose }: DialogHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerText}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {onClose && (
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close dialog"
          type="button"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

/* ── DialogBody ─────────────────────────────────────────────── */
export interface DialogBodyProps {
  children: ReactNode;
  scrollable?: boolean;
}

export function DialogBody({ children, scrollable = false }: DialogBodyProps) {
  return (
    <div className={[styles.body, scrollable && styles.bodyScrollable].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

/* ── DialogFooter ───────────────────────────────────────────── */
export interface DialogFooterProps {
  children: ReactNode;
}

export function DialogFooter({ children }: DialogFooterProps) {
  return <div className={styles.footer}>{children}</div>;
}
