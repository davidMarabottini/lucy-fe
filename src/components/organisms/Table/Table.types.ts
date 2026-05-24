import type { ButtonProps } from "@/components/atoms/Button/Button.types";
import type React from "react";

export type TableColumn<T> = {
  header: string;
} & ({
  key:  `__${string}`;
  value: (row: T) => string;
} | {
  key: keyof T;
  value?: (row: T) => string | React.ReactNode;
});

export interface TableAction<T> extends Omit<ButtonProps, 'onClick'> {
  action: (row: T) => void;
};

export type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  actions?: ((row: T) => React.ReactNode)[];
  getRowKey?: (row: T) => string | number;
  additionalContainer?: {[key: string | number]: (row: T) => React.ReactNode};
};