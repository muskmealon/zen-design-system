import { type ReactNode } from 'react';
import styles from './Avatar.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  className?: string;
}

export interface AvatarGroupProps {
  children: ReactNode;
  max?: number;
  size?: AvatarSize;
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extract up to two initials from a display name.
 * "John Doe" → "JD", "Alice" → "A", "" → "?"
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Deterministic background color from name.
 * Uses the first character's char code to index into a palette of brand colors.
 */
const AVATAR_COLORS = [
  '#377E7F', // teal-500
  '#2F26C9', // indigo-500
  '#3491F4', // blue-500
  '#2EA5FA', // purple-500
  '#5FC96F', // green-500
  '#FF7429', // orange-500
];

function getAvatarColor(name: string): string {
  if (!name) return AVATAR_COLORS[0];
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
  className,
}: AvatarProps) {
  const rootClass = [
    styles.avatar,
    styles[size],
    styles[shape],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const initials = name ? getInitials(name) : '?';
  const bgColor = name ? getAvatarColor(name) : '#748FA1';

  return (
    <span className={rootClass} aria-label={alt ?? name}>
      {src ? (
        <img
          src={src}
          alt={alt ?? name ?? ''}
          className={styles.image}
          draggable={false}
        />
      ) : (
        <span
          className={styles.initials}
          style={{ backgroundColor: bgColor }}
          aria-hidden
        >
          {initials}
        </span>
      )}

      {status && (
        <span
          className={[styles.statusDot, styles[`status-${status}`]]
            .filter(Boolean)
            .join(' ')}
          aria-label={`Status: ${status}`}
        />
      )}
    </span>
  );
}

// ─── AvatarGroup ──────────────────────────────────────────────────────────────

export function AvatarGroup({
  children,
  max,
  size = 'md',
  className,
}: AvatarGroupProps) {
  const childArray = Array.isArray(children)
    ? children
    : children
    ? [children]
    : [];

  const visible = max !== undefined ? childArray.slice(0, max) : childArray;
  const overflow = max !== undefined ? childArray.length - max : 0;

  const overflowBg = '#748FA1';

  return (
    <div className={[styles.group, className].filter(Boolean).join(' ')}>
      {visible.map((child, i) => (
        <span key={i} className={styles.groupItem}>
          {child}
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={[styles.avatar, styles[size], styles.circle, styles.overflow]
            .filter(Boolean)
            .join(' ')}
          aria-label={`${overflow} more`}
        >
          <span
            className={styles.initials}
            style={{ backgroundColor: overflowBg }}
            aria-hidden
          >
            +{overflow}
          </span>
        </span>
      )}
    </div>
  );
}
