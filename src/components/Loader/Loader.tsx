import type { ReactNode } from 'react';
import styles from './Loader.module.css';

export type LoaderVariant = 'spinner' | 'dots' | 'bar';
export type LoaderSize = 'sm' | 'md' | 'lg';
export type LoaderColor = 'brand' | 'white' | 'muted';

export interface LoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  color?: LoaderColor;
  label?: string;
}

function SpinnerSVG(): ReactNode {
  return (
    <svg
      className={styles.spinnerSvg}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        className={styles.spinnerTrack}
        cx="12"
        cy="12"
        r="10"
        strokeWidth="2.5"
      />
      <circle
        className={styles.spinnerArc}
        cx="12"
        cy="12"
        r="10"
        strokeWidth="2.5"
        strokeDasharray="31.4 62.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DotsIndicator(): ReactNode {
  return (
    <div className={styles.dotsContainer} aria-hidden="true">
      <span className={`${styles.dot} ${styles.dot1}`} />
      <span className={`${styles.dot} ${styles.dot2}`} />
      <span className={`${styles.dot} ${styles.dot3}`} />
    </div>
  );
}

function BarIndicator(): ReactNode {
  return (
    <div className={styles.barTrack} aria-hidden="true">
      <span className={styles.barFill} />
    </div>
  );
}

export function Loader({
  variant = 'spinner',
  size = 'md',
  color = 'brand',
  label,
}: LoaderProps) {
  const rootClasses = [styles.root, styles[size], styles[color]]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClasses}
      role="status"
      aria-label={label ?? 'Loading'}
      aria-busy="true"
    >
      {variant === 'spinner' && <SpinnerSVG />}
      {variant === 'dots' && <DotsIndicator />}
      {variant === 'bar' && <BarIndicator />}
      {label && (
        <span className={styles.label} aria-hidden="true">
          {label}
        </span>
      )}
    </div>
  );
}
