import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small';
type TypographyColor = 'text' | 'muted' | 'primary' | 'secondary' | 'success' | 'error';

interface TypographyBaseProps<T extends ElementType> {
  children: ReactNode;
  variant?: TypographyVariant;
  as?: T;
  additionalClasses?: string;
  color?: TypographyColor;
}

export type TypographyProps<T extends ElementType> = TypographyBaseProps<T> & 
  Omit<ComponentPropsWithoutRef<T>, keyof TypographyBaseProps<T>>;