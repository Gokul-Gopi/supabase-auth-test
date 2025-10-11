import { IUser } from "@/utils/types";
import { create } from "zustand";

interface IUserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

const useAuthStore = create<IUserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
