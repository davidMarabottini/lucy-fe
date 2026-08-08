import type { ButtonProps } from "@/components/atoms/Button/Button.types";
import type React from "react";

type DynamicValue<T> = (row: T) => string | number | React.ReactNode;
export type TableColumn<T> = {
  header: string;
} & ({
  key:  `__${string}`;
  value: DynamicValue<T>;
} | {
  key: keyof T;
  value?: DynamicValue<T> | React.ReactNode;
});

export interface TableAction<T> extends Omit<ButtonProps, 'onClick'> {
  action: (row: T) => void;
};

export type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  actions?: (row: T) => (React.ReactNode[]);
  getRowKey?: (row: T) => string | number;
  additionalContainer?: (row: T) => React.ReactNode;
};