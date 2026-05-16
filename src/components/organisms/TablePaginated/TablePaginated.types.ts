import type { UseQueryResult } from "@tanstack/react-query";
import type { TableColumn } from "../Table/Table.types";
import type { AppError } from "@/hooks/useAppApi/error";
import type { PaginatedData } from "@/types/utilities.types";

export type { PaginatedData };

export interface FilterConfig {
  key: string;
  placeholder: string;
  label?: string;
  value?: string;
  type?: 'text' | 'hidden';
}

export type PaginatedResponse<T> = T[] | PaginatedData<T>;

export interface TablePaginatedProps<T extends object> {
  useQueryHook: (params: Record<string, unknown>) => UseQueryResult<PaginatedResponse<T>, AppError>;
  columns: TableColumn<T>[];
  actions?: ((row: T) => React.ReactNode)[];
  initialPerPage?: number;
  filterConfig?: FilterConfig[];
}
