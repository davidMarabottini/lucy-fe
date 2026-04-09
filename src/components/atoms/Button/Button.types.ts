import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'custom';
  rounded?: boolean;
  additionalClassName?: string;
  asChild?: boolean;
}
