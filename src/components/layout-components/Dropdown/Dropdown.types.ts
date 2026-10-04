import type { Dispatch, ReactNode, SetStateAction } from "react";

export type DropDownItemBase = {
  key: string,
  label: string,
  onClick?: () => unknown,
}

export interface DropdownHeadProps {
  label: ReactNode;
  className?: string;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export interface DropdownProps<T> extends Omit<DropdownHeadProps, 'children'> {
  options: T[];
  children: (ddo: T) => ReactNode;
}