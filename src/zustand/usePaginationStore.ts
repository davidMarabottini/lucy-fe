import { create } from 'zustand';

export interface ListState {
  page: number;
  filters: Record<string, string>;
}

interface PaginationStore {
  lists: Record<string, ListState>;
  setPage: (entityKey: string, page: number) => void;
  setFilter: (entityKey: string, key: string, value: string) => void;
  resetList: (entityKey: string) => void;
}

export const usePaginationStore = create<PaginationStore>((set) => ({
  lists: {},
  
  setPage: (entity, page) =>
    set((state) => ({
      lists: {
        ...state.lists,
        [entity]: { 
          ...state.lists[entity], 
          page, 
          filters: state.lists[entity]?.filters || {} 
        },
      },
    })),
    
  setFilter: (entity, key, value) =>
    set((state) => {
      const currentList = state.lists[entity] || { page: 1, filters: {} };
      return {
        lists: {
          ...state.lists,
          [entity]: {
            ...currentList,
            page: 1,
            filters: { ...currentList.filters, [key]: value },
          },
        },
      };
    }),
    
  resetList: (entity) =>
    set((state) => {
      const newLists = { ...state.lists };
      delete newLists[entity];
      return { lists: newLists };
    }),
}));