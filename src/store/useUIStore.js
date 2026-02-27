import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // Search State
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),

  // Auth Modal State (NEW)
  isAuthOpen: false,
  toggleAuth: () => set((state) => ({ isAuthOpen: !state.isAuthOpen })),
  closeAuth: () => set({ isAuthOpen: false }),
}));