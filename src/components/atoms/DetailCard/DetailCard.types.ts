import type { ReactNode } from "react";

export interface DetailCardProps {
  header: ReactNode;
  body: ReactNode;
  actions?: ReactNode[];
  isSelected?: boolean;
}
