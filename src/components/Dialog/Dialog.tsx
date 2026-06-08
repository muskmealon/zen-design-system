import { type ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  Dialog as AriaDialog,
} from 'react-aria-components';
import { X } from 'lucide-react';
import styles from './Dialog.module.css';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

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
  return (
    <ModalOverlay
      isOpen={open}
      onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}
      isDismissable={closeOnOverlayClick}
      className={styles.overlay}
    >
      <Modal className={[styles.panel, styles[size]].join(' ')}>
        <AriaDialog aria-label="Dialog">
          {children}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}

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

export interface DialogFooterProps {
  children: ReactNode;
}

export function DialogFooter({ children }: DialogFooterProps) {
  return <div className={styles.footer}>{children}</div>;
}
