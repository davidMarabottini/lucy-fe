
export type MarkRequired<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>;
};

export type ValueOf<T extends object> = T[keyof T];

export interface PaginatedData<T> {
  has_next: boolean;
  has_prev: boolean;
  items: T[];
  page: number;
  pages: number;
  total: number;
}
