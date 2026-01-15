import { create } from 'zustand'
interface ManaCostState {
  cost: number
  update: (by: number) => void
}

const STORAGE_KEY = 'tindedh.manaCost';

const readStoredCost = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? Number(raw) : null;
  } catch {
    return null;
  }
};

const persistCost = (cost: number) => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(STORAGE_KEY, String(cost));
};

const initialCost = readStoredCost();

const useManaCostStore = create<ManaCostState>()((set) => ({
  cost: Number.isFinite(initialCost) ? (initialCost as number) : 5,
  update: (by) => set(() => {
    persistCost(by);
    return { cost: by };
  }),
}))

export { useManaCostStore }
export type { ManaCostState }
