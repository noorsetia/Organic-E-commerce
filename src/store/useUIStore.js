import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // Search State
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),

  // Auth Modal State
  isAuthOpen: false,
  toggleAuth: () => set((state) => ({ isAuthOpen: !state.isAuthOpen })),
  closeAuth: () => set({ isAuthOpen: false }),

  // Quick View State 
  quickViewProduct: null,
  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),

  // Filter Drawer State (NEW)
  isFilterOpen: false,
  toggleFilter: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),

}));