import {
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';
import styles from './Tooltip.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  disabled?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 300,
  disabled = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const show = useCallback(() => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [disabled, delay]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  const tooltipClass = [
    styles.tooltip,
    styles[placement],
    visible ? styles.visible : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {!disabled && (
        <span
          role="tooltip"
          className={tooltipClass}
          aria-hidden={!visible}
        >
          {content}
        </span>
      )}
    </span>
  );
}
