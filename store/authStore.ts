import { create } from "zustand";

import { IUser } from "@/types/user.types";

export type AuthStore = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
}));

export default useAuthStore;
