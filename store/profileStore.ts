import { create } from "zustand";

import { IProfile, IReceive, ISend } from "@/types/profile";
import { INIT_PROFILE } from "@/constants";

type ProfileStore = IProfile & {
  setRound: (round: number) => void;
  setTitle: (title: string) => void;
  setSend: (send: Array<ISend>) => void;
  setReceive: (receive: Array<IReceive>) => void;
  setDescription: (description: string) => void;
};

const useProfileStore = create<ProfileStore>((set) => ({
  ...INIT_PROFILE,
  setSend: (send) => set((state) => ({ ...state, send })),
  setRound: (round) => set((state) => ({ ...state, round })),
  setTitle: (title) => set((state) => ({ ...state, title })),
  setReceive: (receive) => set((state) => ({ ...state, receive })),
  setDescription: (description) => set((state) => ({ ...state, description })),
}));

export default useProfileStore;
