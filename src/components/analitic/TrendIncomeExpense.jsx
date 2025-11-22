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

// #region Sample data
const data = [
  {
    name: "January",
    income: 4000,
    expense: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
    amt: 2210,
  },
  {
    name: "March",
    income: 2000,
    expense: 9800,
    amt: 2290,
  },
  {
    name: "April",
    income: 2780,
    expense: 3908,
    amt: 2000,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
];

export default function TrendIncomeExpense({
  dataChart,
  account,
  isAccountLoading,
}) {
  const [sort, setSort] = useState("All");

  //console.log("this is account on trendIncome", account);

  //FUNCTION HANDLE CHANGE

  function handleFilterChange(value) {
    setSort(value);
    console.log(value);
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
  console.log("ini base", base);

  //FUNCTION SORT

  // FILTER DATA

  const filteredData = dataChart.filter((item) => {
    if (sort === "All") {
      return dataChart;
    }
    return item.account_name === sort;
  });

  //
  for (const t of filteredData) {
    const dt = new Date(t.created_at);
    const monthName = dt.toLocaleString("en-US", { month: "long" });

    console.log("ini monthname", monthName);
    console.log("ini amount", t.amount);

    const row = base.find((b) => b.name === monthName);
    console.log("ini row", row);

    if (row) {
      if (t.type === "Income") row.income += Number(t.amount);
      if (t.type === "Expense") row.expense += Number(t.amount);
    }
  }

  console.log("ini nilai filtered data", filteredData);
  return (
    <div className="w-full h-80">
      <div>
        {isAccountLoading ? (
          <>loading....</>
        ) : (
          <select onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="All">All Account</option>
            {account.map((item, index) => (
              <option key={index} value={item.account_name}>
                {item.account_name}
              </option>
            ))}
          </select>
        )}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={base}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="red"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="expense" stroke="lime" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
