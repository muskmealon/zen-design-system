import { type ReactNode } from 'react';
import {
  TooltipTrigger,
  Tooltip as AriaTooltip,
} from 'react-aria-components';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 300,
  disabled = false,
}: TooltipProps) {
  return (
    <TooltipTrigger delay={delay} isDisabled={disabled}>
      {/* React Aria needs the trigger to be a focusable element */}
      <span className={styles.wrapper}>{children}</span>
      <AriaTooltip
        placement={placement}
        className={[styles.tooltip, styles[placement], styles.visible].join(' ')}
        offset={10}
      >
        {content}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
