import styles from './ProgressBar.module.css';

export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'error' | 'brand';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  indeterminate?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = false,
  indeterminate = false,
}: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = indeterminate ? 100 : (clampedValue / max) * 100;
  const labelText = label ?? `${Math.round(percentage)}%`;

  const trackClasses = [styles.track, styles[size]].filter(Boolean).join(' ');

  const fillClasses = [
    styles.fill,
    styles[variant],
    animated && !indeterminate && styles.animated,
    indeterminate && styles.indeterminate,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {(showLabel || label) && (
        <div className={styles.labelRow}>
          {label && <span className={styles.labelText}>{label}</span>}
          {showLabel && !label && (
            <span className={styles.labelText}>{labelText}</span>
          )}
          {showLabel && label && (
            <span className={styles.percentText}>{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div
        className={trackClasses}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? 'Progress'}
        aria-busy={indeterminate ? true : undefined}
      >
        <div
          className={fillClasses}
          style={
            indeterminate
              ? undefined
              : { width: `${percentage}%` }
          }
        />
      </div>
    </div>
  );
}
