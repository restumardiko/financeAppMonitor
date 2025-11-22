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
export default function TotalBalanceEachTime({
  dataChart,
  account,
  isAccountLoading,
}) {
  const [sort, setSort] = useState("All");

  //FUNCTION HANDLE CHANGE

  function handleFilterChange(value) {
    setSort(value);
    console.log(value);
  }
  //function filter raw data
  const filteredData = dataChart.filter((item) => {
    if (sort === "All") {
      return dataChart;
    }
    return item.account_name === sort;
  });

  console.log("ini nilai filtered data", filteredData);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="mt-40">
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
