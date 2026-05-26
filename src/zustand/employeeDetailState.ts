import { create } from 'zustand';

const toYMD = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const parseYMD = (ymd: string) => new Date(`${ymd}T00:00:00`);

export interface EmployeeDetailState {
  selectedContractId: number | null;
  setSelectedContractId: (id: number | null) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setNextDay: () => void;
  setPreviousDay: () => void;
}

export const useEmployeeDetailStore = create<EmployeeDetailState>((set) => ({
  selectedContractId: null,
  setSelectedContractId: (id) => set({ selectedContractId: id }),
  selectedDate: toYMD(new Date()),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setNextDay: () =>
    set((state) => {
      const nextDate = parseYMD(state.selectedDate);
      nextDate.setDate(nextDate.getDate() + 1);
      return { selectedDate: toYMD(nextDate) };
    }),
  setPreviousDay: () =>
    set((state) => {
      const prevDate = parseYMD(state.selectedDate);
      prevDate.setDate(prevDate.getDate() - 1);
      return { selectedDate: toYMD(prevDate) };
    }),
}));
