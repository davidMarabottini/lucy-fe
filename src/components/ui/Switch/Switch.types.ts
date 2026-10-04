import type { ClassValue } from "clsx";
import type { LucideIcon } from "lucide-react";

export type SwitchValue = boolean | null;

export interface SwitchProps  {
  label?: string;
  value?: SwitchValue;
  onChange: (value: SwitchValue) => void;
  disabled?: boolean;
  error?: string;
  name?: string;
  allowIndeterminate?: boolean;
  additionalClassName?: ClassValue;
  OKIcon?: LucideIcon
  KOIcon?: LucideIcon
  IndeterminatedIcon?: LucideIcon
  dataTestid?: string
}