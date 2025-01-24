import { create } from "zustand";

import { IRound } from "@/types/round";
import { INIT_ROUND } from "@/constants";
import { IRounds } from "@/types/round.types";

type RoundStore = IRound & {
  rounds: IRounds;
  setRounds: (rounds: IRounds) => void;
  setTitle: (title: string) => void;
  setRound: (round: number) => void;
  setError: (error: string | null) => void;
  setDescription: (description: string) => void;
  setNextRoundTime: (nextRoundTime: number) => void;
};

const useRoundStore = create<RoundStore>((set) => ({
  ...INIT_ROUND,
  rounds: [],
  setRounds: (rounds) => set((state) => ({ ...state, rounds })),
  setTitle: (title) => set((state) => ({ ...state, title })),
  setRound: (round) => set((state) => ({ ...state, round })),
  setError: (error) => set((state) => ({ ...state, error })),
  setDescription: (description) => set((state) => ({ ...state, description })),
  setNextRoundTime: (nextRoundTime: number) => set((state) => ({ ...state, nextRoundTime })),
}));

export default useRoundStore;
