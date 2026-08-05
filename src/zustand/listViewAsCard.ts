import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ViewState {
  isCardView: boolean;
  toggleView: () => void;
  setView: (isCard: boolean) => void;
}

export const useViewStore = create<ViewState>()(
  persist(
    (set) => ({
      isCardView: true,
      toggleView: () => set((state) => ({ isCardView: !state.isCardView })),
      setView: isCardView => set({ isCardView }),
    }),
    {
      name: 'list-view-mode-storage',
    }
  )
);