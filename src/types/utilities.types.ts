
export type MarkRequired<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>;
};

export type ValueOf<T extends object> = T[keyof T];
