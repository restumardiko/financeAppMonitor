import { create } from "zustand";
import api from "@/lib/api";

const useLatestTransactionStore = create((set) => ({
  LatestTransactions: [],
  isLoading: false,
  error: null,

  // action: fetch data dari API
  fetchLatestTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/latestTransactions");

      const data = await res.data.data;
      set({ LatestTransactions: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // action tambahan
  addTransaction: (t) =>
    set((state) => ({ LatestTransactions: [t, ...state.LatestTransactions] })),
}));
export default useLatestTransactionStore;
