import { create } from "zustand";
import api from "@/lib/api";

const useTransactionStore = create((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  // action: fetch data dari API
  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/transactions");

      const data = await res.data.data;
      set({ transactions: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // action tambahan
  addTransaction: (t) =>
    set((state) => ({ transactions: [...state.transactions, t] })),
}));
export default useTransactionStore;
