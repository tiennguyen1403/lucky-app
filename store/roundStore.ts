import { create } from "zustand";

import { IRound, RoundState } from "@/types/round";
import { INIT_ROUND } from "@/constants";
import { IRounds } from "@/types/round.types";

type RoundStore = IRound & {
  rounds: IRounds;
  isSetupTime: boolean;
  setRoundState: (roundState: RoundState) => void;
  setRounds: (rounds: IRounds) => void;
  setIsSetupTime: (isSetupTime: boolean) => void;
  setRound: (round: number) => void;
  setError: (error: string | null) => void;
  setDescription: (description: string) => void;
};

const useRoundStore = create<RoundStore>((set) => ({
  ...INIT_ROUND,
  rounds: [],
  isSetupTime: true,
  roundState: RoundState.SETUP,
  setRoundState: (roundState) => set((state) => ({ ...state, roundState })),
  setIsSetupTime: (isSetupTime) => set((state) => ({ ...state, isSetupTime })),
  setRounds: (rounds) => set((state) => ({ ...state, rounds })),
  setRound: (round) => set((state) => ({ ...state, round })),
  setError: (error) => set((state) => ({ ...state, error })),
  setDescription: (description) => set((state) => ({ ...state, description })),
}));

export default useRoundStore;
