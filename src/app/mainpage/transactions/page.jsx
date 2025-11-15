"use client";
import api from "@/lib/api";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AllTransactionsHistory() {
  const [openDays, setOpenDays] = useState({});
  // contoh: { "2025-11-12": true }

  const toggleDay = (monthKey, day) => {
    const key = `${monthKey}-${day}`;
    setOpenDays((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
      <div>transactions --&gt;&gt;</div>

      {data && Object.keys(data).length > 0 ? (
        Object.entries(data).map(([monthKey, daysObj]) => (
          <div key={monthKey} className="flex flex-col gap-1">
            {/* ===== MONTH ===== */}
            <div className="font-bold text-lg">{monthKey}</div>

            {/* ===== DAYS ===== */}
            <div className="pl-4 flex flex-col gap-1">
              {Object.entries(daysObj).map(([day, transactions]) => {
                const toggleKey = `${monthKey}-${day}`;
                const isOpen = openDays[toggleKey] || false;

                return (
                  <div key={day} className="flex flex-col gap-1">
                    {/* DAY HEADER */}
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-10 font-semibold">{day}</div>

                      <button
                        onClick={() => toggleDay(monthKey, day)}
                        className="text-blue-500"
                      >
                        {transactions.length} transaksi {isOpen ? "▾" : "▸"}
                      </button>
                    </div>

                    {/* TRANSACTIONS LIST (COLLAPSIBLE) */}
                    {isOpen && (
                      <div className="pl-8 flex flex-col gap-1">
                        {transactions.map((t, i) => (
                          <div
                            key={i}
                            className="p-2 rounded border flex flex-col bg-gray-50"
                          >
                            <div className="font-semibold">
                              {t.category_name} — Rp{t.amount}
                            </div>
                            <div className="text-sm opacity-70">{t.note}</div>
                            <div className="text-xs opacity-50">
                              {t.account_name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <div>No transactions</div>
      )}
    </div>
  );
}
