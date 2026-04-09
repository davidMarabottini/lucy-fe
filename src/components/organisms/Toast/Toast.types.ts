import type { AvailableStatusesType } from "@/types/contentsFormDatas.types";
import type { ReactNode } from "react";

export interface IToastContext {
  addToast: (msg: string, type: AvailableStatusesType) => void;
  toasts: IToastItem[];
}

export interface IToastProviderProps {
  children: ReactNode;
}

export interface IToastItem {
  id: number;
  msg: string;
  type: AvailableStatusesType;
}
