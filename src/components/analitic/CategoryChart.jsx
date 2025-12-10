"use client";

import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#00C49F",
  "#FFBB28",
  "#2DD4BF",
  "#0088FE",
  "#FF8042",
  "#A28CF6",
  "#FF5C8A",
  "#F97316",
];

export default function CategoryChart({ dataChart, account }) {
  // ambil tiap bulan
  function getUniqueYears(transactions) {
    const months = transactions.map((t) => {
      const d = new Date(t.created_at);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      return `${y}`;
    });

    return [...new Set(months)];
  }

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

  const uniqueYears = getUniqueYears(dataChart ?? []);

  const [sort, setSort] = useState({
    type: "Income",
    account: "All",
    year: "All",
    month: "All",
  });

  function handleFilterChange(key, value) {
    setSort((prev) => ({ ...prev, [key]: value }));
  }

  // FILTER DATA
  const filteredData = dataChart.filter((item) => {
    const date = new Date(item.created_at);
    const itemYear = date.getFullYear().toString();
    const itemMonth = months[date.getMonth()];

    const matchType = item.type === sort.type;

    const matchAccount =
      sort.account === "All" ? true : item.account_name === sort.account;

    const matchYear = sort.year === "All" ? true : itemYear === sort.year;

    const matchMonth = sort.month === "All" ? true : itemMonth === sort.month;

    return matchType && matchAccount && matchYear && matchMonth;
  });

  console.log("ini filtered data", filteredData);
  console.log("ini dataChart", dataChart);

  // END DATA MAKER

  const endDataMaker = (filtered) => {
    if (sort.type === "Income") {
      const categories = ["Gaji", "Bisnis", "Lain-lain"];

      return categories.map((cat) => {
        const total = filtered
          .filter((item) => item.category_name === cat)
          .reduce((acc, curr) => acc + Number(curr.amount), 0);

        return { name: cat, value: total };
      });
    }

    // Expense categories
    const expenseCategories = [
      "Makanan & Minuman",
      "Transportasi",
      "Tagihan & Kebutuhan Rumah",
      "Hiburan & Gaya Hidup",
      "Kesehatan",
    ];

    return expenseCategories.map((cat) => {
      const total = filtered
        .filter((item) => item.category_name === cat)
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

      return { name: cat, value: total };
    });
  };

  const endData = endDataMaker(filteredData);

  //console.log("filteredData:", filteredData);
  //console.log("endData:", endData);

  return (
    <div className="w-full h-auto ">
      <h1 className="text-emerald-500 text-xl mb-4 text-center font-bold">
        Categories Percentage
      </h1>
      {/* Filter Section */}
      <div className="sort_button flex flex-wrap gap-1">
        {/* Type Filter */}
        <select
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className="rounded-md border px-3 py-2 text-emerald-600"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        {/* Account Filter */}

        <select
          onChange={(e) => handleFilterChange("account", e.target.value)}
          className="rounded-md border px-3 py-2 text-emerald-600"
        >
          <option value="All">All Account</option>
          {account.map((item, index) => (
            <option key={index} value={item.account_name}>
              {item.account_name}
            </option>
          ))}
        </select>

        {/* Year Filter */}
        <select
          onChange={(e) => handleFilterChange("year", e.target.value)}
          className="rounded-md border px-3 py-2 text-emerald-600"
        >
          <option value="All">All Year</option>
          {uniqueYears.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        {/* month Filter */}
        <select
          onChange={(e) => handleFilterChange("month", e.target.value)}
          className="rounded-md border px-3 py-2 text-emerald-600"
        >
          <option value="All">All Month</option>
          {months.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Section */}
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={endData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={66}
              dataKey="value"
              labelLine
              label={({ percent }) =>
                percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ""
              }
            >
              {endData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(value)
              }
              contentStyle={{
                maxWidth: 220,
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
