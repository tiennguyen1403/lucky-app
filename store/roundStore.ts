import { create } from "zustand";

import { IRounds, RoundStatus } from "@/types/round.types";

type RoundStore = {
  rounds: IRounds;
  roundStatus: RoundStatus;
  currentRound: number | null;
  nextRoundTime: string | null;
  setRounds: (rounds: IRounds) => void;
  setRoundStatus: (roundStatus: RoundStatus) => void;
  setCurrentRound: (currentRound: number | null) => void;
  setNextRoundTime: (nextRoundTime: string | null) => void;
};

const useRoundStore = create<RoundStore>((set) => ({
  rounds: [],
  currentRound: null,
  nextRoundTime: null,
  roundStatus: RoundStatus.FINISHED,
  setRounds: (rounds) => set((state) => ({ ...state, rounds })),
  setRoundStatus: (roundStatus) => set((state) => ({ ...state, roundStatus })),
  setCurrentRound: (currentRound) => set((state) => ({ ...state, currentRound })),
  setNextRoundTime: (nextRoundTime) => set((state) => ({ ...state, nextRoundTime })),
}));

export default useRoundStore;
