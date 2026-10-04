import { type ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  text: ReactNode;
  children?: ReactNode;
  position?: TooltipPosition;
  className?: string;
}