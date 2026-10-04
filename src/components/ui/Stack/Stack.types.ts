import type { ClassValue } from "clsx";

export interface StackProperties extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'>{
  children: React.ReactNode;
  spacing?: 'lg' | 'md' | 'sm';
  direction?: 'column' | 'row';
  additionalClassName?: ClassValue;
}