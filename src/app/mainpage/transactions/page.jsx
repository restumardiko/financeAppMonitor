"use client";
import api from "@/lib/api";
import { CornerRightUp, CornerRightDown } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TransactionsCard from "../../../components/wallet/transactionsCard";

export default function AllTransactionsHistory() {
  const [openDays, setOpenDays] = useState({});
  // contoh: { "2025-11-12": true }
  const [openMonths, setOpenMonths] = useState({});

  const toggleDay = (dayKey) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
  };

  const toggleMonth = (monthKey) => {
    setOpenMonths((prev) => ({
      ...prev,
      [monthKey]: !prev[monthKey],
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
    <div className="all_transactions gap-4 flex flex-col">
      <h2 className="font-bold text-lg text-emerald-700">Transactions</h2>

      {data && Object.keys(data).length > 0 ? (
        Object.entries(data).map(([monthKey, daysObj]) => {
          const monthOpen = openMonths[monthKey];

          return (
            <div key={monthKey} className="border p-2 rounded-lg">
              {/* MONTH HEADER */}
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => toggleMonth(monthKey)}
              >
                <div className="font-bold text-xl text-amber-500">
                  {monthKey}
                </div>
                <button className="text-lg text-emerald-700">
                  {monthOpen ? <CornerRightUp /> : <CornerRightDown />}
                </button>
              </div>

              {/* DAYS LIST */}
              {monthOpen && (
                <div className="pl-4 mt-2 flex flex-col gap-1">
                  {Object.entries(daysObj).map(([day, transactions]) => {
                    const dayOpen = openDays[`${monthKey}-${day}`];

                    return (
                      <div key={day} className="border-b pb-2">
                        {/* DAY HEADER */}
                        <div
                          className="flex justify-between items-center cursor-pointer "
                          onClick={() => toggleDay(`${monthKey}-${day}`)}
                        >
                          <div className="font-semibold text-amber-600">
                            {day}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-emerald-800">
                              {transactions.length} transaksi
                            </span>
                            <button className="text-emerald-800">
                              {dayOpen ? (
                                <CornerRightUp />
                              ) : (
                                <CornerRightDown />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* LIST TRANSACTIONS */}
                        {dayOpen && (
                          <div className="pl-4 mt-2 flex flex-col gap-2">
                            <TransactionsCard transactions={transactions} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div>No transactions</div>
      )}
    </div>
  );
}
