import { type ReactNode, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
}

const ELLIPSIS_KEY = '__ellipsis__';

export function Breadcrumb({
  items,
  separator = <ChevronRight size={14} aria-hidden="true" />,
  maxItems,
}: BreadcrumbProps) {
  const [expanded, setExpanded] = useState(false);

  const shouldCollapse =
    !expanded &&
    maxItems !== undefined &&
    items.length > maxItems;

  let visibleItems: Array<BreadcrumbItem | typeof ELLIPSIS_KEY>;

  if (shouldCollapse && maxItems !== undefined) {
    // Always show first 1 and last (maxItems - 2), collapsing the middle
    const keepFromStart = 1;
    const keepFromEnd = maxItems - 1;
    const start = items.slice(0, keepFromStart);
    const end = items.slice(items.length - keepFromEnd);
    visibleItems = [...start, ELLIPSIS_KEY, ...end];
  } else {
    visibleItems = items;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.list}>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = item === ELLIPSIS_KEY;

          return (
            <li key={isEllipsis ? 'ellipsis' : (item as BreadcrumbItem).label + index} className={styles.item}>
              {index > 0 && (
                <span className={styles.separator}>{separator}</span>
              )}

              {isEllipsis ? (
                <button
                  type="button"
                  className={styles.ellipsisButton}
                  onClick={() => setExpanded(true)}
                  aria-label="Show all breadcrumb items"
                >
                  &hellip;
                </button>
              ) : isLast ? (
                <span className={styles.current} aria-current="page">
                  {(item as BreadcrumbItem).icon && (
                    <span className={styles.icon}>{(item as BreadcrumbItem).icon}</span>
                  )}
                  {(item as BreadcrumbItem).label}
                </span>
              ) : (item as BreadcrumbItem).href ? (
                <a href={(item as BreadcrumbItem).href} className={styles.link}>
                  {(item as BreadcrumbItem).icon && (
                    <span className={styles.icon}>{(item as BreadcrumbItem).icon}</span>
                  )}
                  {(item as BreadcrumbItem).label}
                </a>
              ) : (
                <span className={styles.text}>
                  {(item as BreadcrumbItem).icon && (
                    <span className={styles.icon}>{(item as BreadcrumbItem).icon}</span>
                  )}
                  {(item as BreadcrumbItem).label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
