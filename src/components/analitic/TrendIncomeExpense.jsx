"use client";

import { useQueryClient } from "@tanstack/react-query";
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
    name: "Page A",
    income: 4000,
    expense: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    income: 3000,
    expense: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    income: 2000,
    expense: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    income: 2780,
    expense: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    income: 1890,
    expense: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    income: 2390,
    expense: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
];
// #endregion

export default function TrendIncomeExpense({
  dataChart,
  account,
  isAccountLoading,
}) {
  const [sort, setSort] = useState("");

  //console.log("this is account on trendIncome", account);

  //FUNCTION HANDLE CHANGE

  function handleFilterChange(value) {
    setSort(value);
    console.log(value);
  }

  //FUNCTION SORT

  // FILTER DATA

  const filteredData = dataChart.filter((item) => {
    return item.account_name === sort;
  });

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
          data={data}
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
