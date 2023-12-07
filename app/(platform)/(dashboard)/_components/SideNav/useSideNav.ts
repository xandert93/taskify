import { create } from 'zustand'

type Store = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useSideNav = create<Store>((set) => ({
  isOpen: false,
  // toggle: () => set(state => ({ isOpen: !state.isOpen }))
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
