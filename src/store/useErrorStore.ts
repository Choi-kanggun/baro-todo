import { create } from "zustand";

type ErrorStore = {
  errorMessage: string;
  setError: (message: string) => void;
  clearError: () => void;
};

const useErrorStore = create<ErrorStore>((set) => ({
  errorMessage: "",
  setError: (message) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: "" }),
}));

export default useErrorStore;
