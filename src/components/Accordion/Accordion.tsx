import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';

// ─── Context ─────────────────────────────────────────────────────────────────

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (id: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used inside an Accordion');
  return ctx;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type AccordionSize = 'sm' | 'md' | 'lg';

export interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  className?: string;
}

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  size?: AccordionSize;
  /** Unique id; auto-generated from title if omitted */
  id?: string;
}

// ─── Accordion wrapper ────────────────────────────────────────────────────────

let _counter = 0;

export function Accordion({ children, allowMultiple = true, className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle, allowMultiple }}>
      <div className={[styles.accordion, className].filter(Boolean).join(' ')}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ─── AccordionItem ────────────────────────────────────────────────────────────

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  size = 'md',
  id: idProp,
}: AccordionItemProps) {
  // Generate stable id once
  const [id] = useState(() => idProp ?? `accordion-item-${++_counter}`);

  // Register defaultOpen on first render via lazy init
  const ctx = useAccordionContext();

  // Mirror defaultOpen into context on mount only
  const [initialised, setInitialised] = useState(false);
  if (!initialised && defaultOpen && !ctx.openItems.has(id)) {
    ctx.toggle(id);
    setInitialised(true);
  }
  if (!initialised && !defaultOpen) {
    setInitialised(true);
  }

  const isOpen = ctx.openItems.has(id);

  const handleClick = () => {
    if (!disabled) ctx.toggle(id);
  };

  const itemClass = [
    styles.item,
    styles[size],
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={itemClass}>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
        disabled={disabled}
      >
        <span className={styles.triggerTitle}>{title}</span>
        <ChevronDown
          size={16}
          className={[styles.chevron, isOpen && styles.chevronOpen]
            .filter(Boolean)
            .join(' ')}
          aria-hidden
        />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={[styles.panel, isOpen && styles.panelOpen]
          .filter(Boolean)
          .join(' ')}
      >
        <div className={styles.panelInner}>{children}</div>
      </div>
    </div>
  );
}
