"useClient";

import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function CategoryChart({
  dataChart,
  account,
  isAccountLoading,
}) {
  // ambil tiap bulan
  function getUniqueMonths(transactions) {
    const months = transactions.map((t) => {
      const d = new Date(t.created_at);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      return `${y}-${m}`;
    });

    return [...new Set(months)];
  }

  const uniqueMonths = getUniqueMonths(dataChart ?? []);

  const [sort, setSort] = useState({
    type: "Income",
    account: "All",
    time: "All",
  });

  function handleFilterChange(key, value) {
    setSort((prev) => ({ ...prev, [key]: value }));
  }

  // FILTER DATA

  const filteredData = dataChart.filter((item) => {
    const matchType = item.type === sort.type;

    const matchAccount =
      sort.account === "All" ? true : item.account_name === sort.account;

    const matchTime =
      sort.time === "All" ? true : item.created_at.startsWith(sort.time);

    return matchType && matchAccount && matchTime;
  });

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
      "kesehatan",
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
    <div className="w-full h-80 space-y-6">
      {/* Filter Section */}
      <div className="sort_button flex flex-wrap gap-4">
        {/* Type Filter */}
        <select
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className="rounded-md border px-3 py-2"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        {/* Account Filter */}
        {isAccountLoading ? (
          <p className="text-sm text-zinc-500">Loading account...</p>
        ) : (
          <select
            onChange={(e) => handleFilterChange("account", e.target.value)}
            className="rounded-md border px-3 py-2"
          >
            <option value="All">All Account</option>
            {account.map((item, index) => (
              <option key={index} value={item.account_name}>
                {item.account_name}
              </option>
            ))}
          </select>
        )}

        {/* Time Filter */}
        <select
          onChange={(e) => handleFilterChange("time", e.target.value)}
          className="rounded-md border px-3 py-2"
        >
          <option value="All">All Time</option>
          {uniqueMonths.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Section */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={endData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {endData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
