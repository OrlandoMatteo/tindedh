import { create } from 'zustand'
interface ManaCostState {
  cost: number
  update: (by: number) => void
}

const useManaCostStore = create<ManaCostState>()((set) => ({
  cost: 5,
  update: (by) => set({ cost: by }),
}))

export { useManaCostStore }
export type { ManaCostState }
