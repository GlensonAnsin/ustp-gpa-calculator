import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  sem: string | null
}

type Action = {
  setSem: (sem: State['sem']) => void
  removeSem: () => void;
}

export const useSemStore = create<State & Action>()(
  persist(
    (set) => ({
      sem: null,
      setSem: (sem) => set(() => ({ sem: sem })),
      removeSem: () => set(() => ({ sem: null })),
    }),
    {
      name: 'sem-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)