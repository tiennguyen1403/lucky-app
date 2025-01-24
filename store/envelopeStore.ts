import { create } from "zustand";

import { IEnvelopes } from "@/types/envelope.types";

type EnvelopeStore = {
  envelopes: IEnvelopes;
  myEnvelopes: IEnvelopes;
  setupEnvelopes: IEnvelopes;
  setEnvelopes: (envelopes: IEnvelopes) => void;
  setMyEnvelopes: (myEnvelopes: IEnvelopes) => void;
  setSetupEnvelopes: (setupEnvelopes: IEnvelopes) => void;
};

const useEnvelopeStore = create<EnvelopeStore>((set) => ({
  envelopes: [],
  myEnvelopes: [],
  setupEnvelopes: [],
  setEnvelopes: (envelopes) => set((state) => ({ ...state, envelopes })),
  setMyEnvelopes: (myEnvelopes) => set((state) => ({ ...state, myEnvelopes })),
  setSetupEnvelopes: (setupEnvelopes) => set((state) => ({ ...state, setupEnvelopes })),
}));

export default useEnvelopeStore;
