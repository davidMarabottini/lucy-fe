import type { LucideIcon } from "lucide-react";

export type DropdownProp = {
  key: string,
  label: string,
  onClick: () => void,
  Icon: LucideIcon,
  path: string,
}

export interface HeaderProps {
  logout?: () => void;
  userDetails?: string | null;
};