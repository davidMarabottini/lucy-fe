import type { ClassValue } from "clsx";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  onValueChange?: (value: string) => void;
  fieldClassName?: ClassValue
}