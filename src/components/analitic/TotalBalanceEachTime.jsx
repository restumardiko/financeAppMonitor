"use client";
import { useState } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// #region Sample data

// #endregion
const data = [
  { nama: "dkdk", uv: 200 },
  { name: "asu", uv: 300 },
];

export default function TotalBalanceEachTime({
  dataChart,
  account,
  isAccountLoading,
}) {
  // ambil tiap tahun
  function getUniqueYears(transactions) {
    const months = transactions.map((t) => {
      const d = new Date(t.created_at);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      return `${y}`;
    });

    return [...new Set(months)];
  }

  const uniqueMonths = getUniqueYears(dataChart ?? []);

  const [sort, setSort] = useState({
    account: "All",
    time: uniqueYear[0],
  });

  //FUNCTION HANDLE CHANGE

  function handleFilterChange(key, value) {
    setSort((prev) => ({ ...prev, [key]: value }));
  }

  // FILTER DATA

  const filteredData = dataChart.filter((item) => {
    const matchAccount =
      sort.account === "All" ? true : item.account_name === sort.account;

    const matchTime = item.created_at.startsWith(sort.time);

    return matchAccount && matchTime;
  });

  console.log("ini nilai filtered data", filteredData);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="mt-20">
        <select onChange={(e) => handleFilterChange("time", e.target.value)}>
          {uniqueMonths.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        {isAccountLoading ? (
          <>loading....</>
        ) : (
          <select
            onChange={(e) => handleFilterChange("account", e.target.value)}
          >
            <option value="All">All Account</option>
            {account.map((item, index) => (
              <option key={index} value={item.account_name}>
                {item.account_name}
              </option>
            ))}
          </select>
        )}
      </div>
      <ResponsiveContainer>
        <AreaChart
          responsive
          // data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width="auto" />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
