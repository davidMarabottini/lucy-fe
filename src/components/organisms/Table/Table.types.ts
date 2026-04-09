import type { ButtonProps } from "@/components/atoms/Button/Button.types";
import type React from "react";

export type TableColumn<T> = {
  key: keyof T | `__${string}`;
  header: string;
  value?: (row: T) => string;
};

export interface TableAction<T> extends Omit<ButtonProps, 'onClick'> {
  action: (row: T) => void;
};

export type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  actions?: ((row: T) => React.ReactNode)[];
};