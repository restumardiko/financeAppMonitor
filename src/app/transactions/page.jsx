"use client";
import api from "@/lib/api";

import { useQuery } from "@tanstack/react-query";

export default function AllTransactionsHistory() {
  const { data, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await api.get("/transactions");
      console.log(groupTransactions(res.data.data));

      return groupTransactions(res.data.data);
    },
  });

  if (isLoading) return <p>Loading…</p>;

  function groupTransactions(transactions) {
    const grouped = {};

    for (const t of transactions) {
      const dt = new Date(t.created_at);
      const y = dt.getFullYear();
      const m = String(dt.getMonth() + 1).padStart(2, "0");
      const monthKey = `${y}-${m}`;

      const day = String(dt.getDate()).padStart(2, "0");

      if (!grouped[monthKey]) grouped[monthKey] = {};
      if (!grouped[monthKey][day]) grouped[monthKey][day] = [];

      grouped[monthKey][day].push(t);
    }

    return grouped;
  }

  return (
    <div className="all_transactions gap-2 flex flex-col">
      <div>transactions{"-->>"}</div>
      {data && Object.keys(data).length > 0 ? (
        Object.keys(data).map((item, index) => (
          <div key={index} className="flex flex-row gap-1 ">
            {item}
          </div>
        ))
      ) : (
        <div>No transactions</div>
      )}
    </div>
  );
}
