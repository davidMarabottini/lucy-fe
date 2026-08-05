import { create } from 'zustand';

export interface OpenSettingsModalState {
  isOpenedSettings: boolean;
  openedSettings: () => void;
  closeSettings: () => void;
  toggleSettings: () => void;
}

export const useOpenSettingsModal = create<OpenSettingsModalState>((set) => ({
  isOpenedSettings: false,
  openedSettings: () => set({ isOpenedSettings: true }),
  closeSettings: () => set({ isOpenedSettings: false }),
  toggleSettings: () => set(state => ({ isOpenedSettings: !state.isOpenedSettings })),
}));