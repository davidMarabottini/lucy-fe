import { create } from 'zustand';

export interface EmployeeDetailState {
  selectedContractId: number | null;
  setSelectedContractId: (id: number | null) => void;
}

export const useEmployeeDetailStore = create<EmployeeDetailState>((set) => ({
  selectedContractId: null,
  setSelectedContractId: (id) => set({ selectedContractId: id }),
}));
