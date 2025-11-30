"use client";
import { useState } from "react";

export default function TransactionsCard({ transactions }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="recent_transactions flex flex-col gap-3">
      {Array.isArray(transactions) && transactions.length > 0 ? (
        transactions.map((item, index) => (
          <div
            key={index}
            onClick={() => handleToggle(index)}
            className="flex flex-col gap-2 rounded-xl border bg-white p-4 shadow-sm cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span
                  className={`text-xs font-semibold ${
                    item.type === "Income" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.type.toUpperCase()}
                </span>
                <span className="text-sm text-zinc-500">
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  •{" "}
                  {new Date(item.created_at).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* AMOUNT */}
              <div
                className={`text-sm font-bold ${
                  item.type === "Income" ? "text-green-600" : "text-red-500"
                }`}
              >
                Rp {Number(item.amount).toLocaleString("id-ID")}
              </div>
            </div>

            {openIndex === index && (
              <div className="rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700 border">
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {item.category_name}
                </p>
                <p>
                  <span className="font-semibold">Note:</span>{" "}
                  {item.note || "-"}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="rounded-xl bg-zinc-100 p-4 text-center text-sm text-zinc-500">
          No transactions
        </div>
      )}
    </div>
  );
}
