import type { ReactNode } from "react";

export interface DetailCard {
  header: ReactNode;
  body: ReactNode;
  actions?: ReactNode[];
  isSelected?: boolean;
}
