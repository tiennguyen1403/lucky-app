import { create } from "zustand";

import { IEnvelopes } from "@/types/envelope.types";

type EnvelopeStore = {
  setupEnvelopes: IEnvelopes;
  setSetupEnvelopes: (setupEnvelopes: IEnvelopes) => void;
};

const useEnvelopeStore = create<EnvelopeStore>((set) => ({
  setupEnvelopes: [],
  setSetupEnvelopes: (setupEnvelopes) => set((state) => ({ ...state, setupEnvelopes })),
}));

export default useEnvelopeStore;
