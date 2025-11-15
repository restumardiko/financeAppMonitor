"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TransactionsCard from "./transactionsCard";
import api from "@/lib/api";

export default function TransactionsHistory() {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["latestTransactions"],
    queryFn: async () => {
      const res = await api.get("/latestTransactions");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // data dianggap fresh 5 menit
    initialData: () => {
      // ambil data cache kalau ada
      return queryClient.getQueryData(["latestTransactions"]);
    },
  });

  if (isLoading && !data) return <div>Loading...</div>;

  return (
    <div className="recent_transactions gap-2 flex flex-col">
      {isFetching && (
        <span className="text-xs text-gray-400">Refreshing...</span>
      )}
      <TransactionsCard transactions={data} />
    </div>
  );
}
