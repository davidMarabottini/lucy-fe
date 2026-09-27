import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface curCompany {
  companyId: number | null;
  companyName: string | null;
  setCompany: (companyId: number, companyName: string) => void;
}

export const useCompanyStore = create<curCompany>()(
  persist(
    (set) => ({
      companyId: null,
      companyName: null,
      setCompany: (companyId, companyName) => set({ companyId, companyName }),
    }),
    {
      name: 'company-storage',
    }
  )
);