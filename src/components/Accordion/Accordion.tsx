import { type ReactNode } from 'react';
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Button as AriaButton,
} from 'react-aria-components';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';

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
  id?: string;
}

export function Accordion({ children, allowMultiple = true, className }: AccordionProps) {
  return (
    <DisclosureGroup
      allowsMultipleExpanded={allowMultiple}
      className={[styles.accordion, className].filter(Boolean).join(' ')}
    >
      {children}
    </DisclosureGroup>
  );
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  size = 'md',
}: AccordionItemProps) {
  return (
    <Disclosure
      isDisabled={disabled}
      defaultExpanded={defaultOpen}
      className={({ isDisabled }) =>
        [styles.item, styles[size], isDisabled && styles.disabled].filter(Boolean).join(' ')
      }
    >
      {({ isExpanded }) => (
        <>
          <AriaButton
            slot="trigger"
            className={styles.trigger}
          >
            <span className={styles.triggerTitle}>{title}</span>
            <ChevronDown
              size={16}
              className={[styles.chevron, isExpanded && styles.chevronOpen].filter(Boolean).join(' ')}
              aria-hidden
            />
          </AriaButton>
          <DisclosurePanel
            className={[styles.panel, isExpanded && styles.panelOpen].filter(Boolean).join(' ')}
          >
            <div className={styles.panelInner}>{children}</div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
