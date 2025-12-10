"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TrendIncomeExpense({
  dataChart,
  account,
  isAccountLoading,
}) {
  function getUniqueYears(transactions) {
    const months = transactions.map((t) => {
      const d = new Date(t.created_at);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      return `${y}`;
    });

    return [...new Set(months)];
  }

  const uniqueYear = getUniqueYears(dataChart ?? []);

  const [sort, setSort] = useState({
    account: "All",
    time: uniqueYear[0],
  });

  function handleFilterChange(key, value) {
    setSort((prev) => ({ ...prev, [key]: value }));
  }

  //initial data
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const base = months.map((month) => ({ name: month, income: 0, expense: 0 }));
  //console.log("ini base", base);

  const filteredData = dataChart.filter((item) => {
    const matchAccount =
      sort.account === "All" ? true : item.account_name === sort.account;

    const matchTime = item.created_at.startsWith(sort.time);

    return matchAccount && matchTime;
  });
  //
  for (const t of filteredData) {
    const dt = new Date(t.created_at);
    const monthName = dt.toLocaleString("en-US", { month: "long" });

    const row = base.find((b) => b.name === monthName);

    if (row) {
      if (t.type === "Income") row.income += Number(t.amount);
      if (t.type === "Expense") row.expense += Number(t.amount);
    }
  }

  //console.log("ini nilai filtered data", filteredData);
  return (
    <div className="w-full ">
      <h1 className="text-emerald-500 text-xl mb-4 text-center font-bold">
        Trending Income Expense
      </h1>
      {/* FILTER SECTION */}
      <div className="flex items-center gap-2 text-emerald-600 ">
        {/* FILTER YEAR */}
        <select
          onChange={(e) => handleFilterChange("time", e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        >
          {uniqueYear.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* FILTER ACCOUNT */}

        <select
          onChange={(e) => handleFilterChange("account", e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="All">All Account</option>
          {account.map((item, index) => (
            <option key={index} value={item.account_name}>
              {item.account_name}
            </option>
          ))}
        </select>
      </div>

      {/* CHART SECTION */}
      <div className="w-full h-80   ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={base}
            margin={{ top: 10, right: 20, left: 15, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tickFormatter={(value) =>
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  notation: "compact",
                }).format(value)
              }
            />

            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(value)
              }
            />
            <Legend />

            <Line
              type="monotone"
              dataKey="income"
              stroke="lime"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="expense" stroke="red" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

//ini belum handle ketika datayear kosong yak
