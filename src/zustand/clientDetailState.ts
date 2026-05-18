import { create } from 'zustand';

export interface ClientDetailState {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setNextDay: () => void;
  setPreviousDay: () => void;
}

export const useClientDetailStore = create<ClientDetailState>((set) => ({
  selectedDate: new Date().toISOString().split('T')[0],
  setSelectedDate: (date) => set({ selectedDate: date }),
  setNextDay: () => set((state) => {
    const nextDate = new Date(state.selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    return { selectedDate: nextDate.toISOString().split('T')[0] };
  }),
  setPreviousDay: () => set((state) => {
    const prevDate = new Date(state.selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    return { selectedDate: prevDate.toISOString().split('T')[0] };
  }),
}));
