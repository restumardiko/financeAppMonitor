"use client";
import { create } from "zustand";
import api from "@/lib/api";

const useUserInformation = create((set) => ({
  name: "",
  email: "",
  total_balance: "",
  created_at: "",
  isLoading: false,
  error: null,

  // action: fetch data dari API
  fetchInformation: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/userInformation");

      const data = await res.data;
      set({
        name: data.name,
        email: data.email,
        total_balance: data.total_balance,
        created_at: data.created_at,
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

export default useUserInformation;
