import { create } from 'zustand';

export interface BreadcrumbItem {
  key: string;
  /** i18n key (namespace "menu") used to render the visible label */
  label: string;
  path: string;
  isCurrent: boolean;
}

export interface BreadcrumbState {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
