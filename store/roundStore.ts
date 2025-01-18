import { create } from "zustand";

import { IRound } from "@/types/round";
import { INIT_ROUND } from "@/constants";

type RoundStore = IRound & {
  setTitle: (title: string) => void;
  setRound: (round: number) => void;
  setError: (error: string | null) => void;
  setDescription: (description: string) => void;
  setNextRoundTime: (nextRoundTime: number) => void;
};

const useRoundStore = create<RoundStore>((set) => ({
  ...INIT_ROUND,
  setTitle: (title) => set((state) => ({ ...state, title })),
  setRound: (round) => set((state) => ({ ...state, round })),
  setError: (error) => set((state) => ({ ...state, error })),
  setDescription: (description) => set((state) => ({ ...state, description })),
  setNextRoundTime: (nextRoundTime: number) => set((state) => ({ ...state, nextRoundTime })),
}));

export default useRoundStore;
