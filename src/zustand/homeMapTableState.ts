import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MapChoose {
  mapChose: 'positive' | 'negative' | null;
  setMapChose: (mapChose: 'positive' | 'negative' | null) => void;
}

export const useMapChooseStore = create<MapChoose>()(
  persist(
    (set) => ({
      mapChose: null,
      setMapChose: (mapChose) => set({ mapChose }),
    }),
    {
      name: 'map-choose',
    }
  )
);