import type { ReactNode } from "react";

export type DetailCardProps = {
  header: ReactNode;
  body: ReactNode;
  actions?: ReactNode[];
  isSelected?: boolean;
} &({
  actions: never;
  actionDirection?: never;
}) | ({
  actions: ReactNode[];
  actionDirection?: "normal" | "reverse"
})
