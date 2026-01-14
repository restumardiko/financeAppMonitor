// "use client";
import {} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TotalBalanceEachTime({
  dataChart,
  account,
  isAccountLoading,
  initialBalance,
}) {
  console.log("ini inisial balance", initialBalance);
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

  //  Ambil tahun unik dari transaksi
  function getUniqueYears(transactions) {
    const years = transactions.map((t) => new Date(t.created_at).getFullYear());
    return [...new Set(years)];
  }

  const uniqueYear = getUniqueYears(dataChart ?? []);
  console.log("uniqueYear", typeof uniqueYear[0]);

  const [sort, setSort] = useState({
    account: "",
    time: uniqueYear[0],
  });

  function handleFilterChange(key, value) {
    setSort((prev) => ({ ...prev, [key]: value }));
  }

  //filter selected account previous years transactions
  const arrBeyondArrTarget = [];
  dataChart.map((i) => {
    if (new Date(i.created_at).getFullYear() >= sort.time) {
      return;
    } else if (i.account_name !== sort.account) {
      return;
    }
    console.log("kita disini", i);
    arrBeyondArrTarget.push(i);
  });
  console.log("ini arrBeyondArrTarget", arrBeyondArrTarget);
  // distant prevYearTransaction
  const prevYearBalance = arrBeyondArrTarget.reduce((acc, trx) => {
    const amount = Number(trx.amount);
    acc += trx.type === "Income" ? amount : -amount;

    return acc;
  }, 0);

  console.log("ini prev year balance", prevYearBalance);

  //  FILTER TRANSAKSI SESUAI ACCOUNT & TAHUN
  const filteredData = useMemo(() => {
    if (!dataChart?.length) return [];

    return dataChart.filter((item) => {
      const matchAccount = item.account_name === sort.account;

      const matchTime = item.created_at.startsWith(String(sort.time));

      return matchAccount && matchTime;
    });
  }, [dataChart, sort]);
  console.log("ini filtered data", filteredData);

  //  INITIAL BALANCE (All / Single Account)
  function getInitialBalanceEachAccount() {
    if (!initialBalance?.length) return 0;

    const selectedAccount = initialBalance.find(
      (item) => item.account_name === sort.account
    );

    return selectedAccount ? Number(selectedAccount.initial_balance) : 0;
  }

  //  RUNNING BALANCE PER BULAN (JAN–DES)
  function getMonthlyRunningBalance(
    sortedTransactions,
    initialBalance,
    months
  ) {
    const grouped = sortedTransactions.reduce((acc, trx) => {
      const d = new Date(trx.created_at);
      const monthIndex = d.getMonth(); // 0 - 11

      if (!acc[monthIndex]) acc[monthIndex] = 0;

      const amount = Number(trx.amount);
      acc[monthIndex] += trx.type === "Income" ? amount : -amount;

      return acc;
    }, {});

    let running = initialBalance + prevYearBalance;

    return months.map((month, i) => {
      if (grouped[i]) running += grouped[i];

      return {
        name: month,
        balance: running,
      };
    });
  }

  //  DATA FINAL UNTUK CHART
  const chartData = useMemo(() => {
    const initial = getInitialBalanceEachAccount();
    return getMonthlyRunningBalance(filteredData, initial, months);
  }, [filteredData, initialBalance, sort]);

  console.log("ini chart final data", chartData);

  return (
    <div className="w-full h-full">
      <h1 className="text-emerald-500 text-xl mb-4 text-center font-bold">
        Total Balance
      </h1>
      {/* FILTER SECTION */}
      <div className="flex flex-wrap items-center gap-2 text-emerald-600 my-2">
        {/* FILTER TAHUN */}
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
          <option value="">Select Account</option>
          {account.map((item, index) => (
            <option key={index} value={item.account_name}>
              {item.account_name}
            </option>
          ))}
        </select>
      </div>

      {/* CHART SECTION */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 12, left: 20, bottom: 12 }}
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

            <Area
              type="monotone"
              dataKey="balance"
              stroke="#6366f1"
              fill="#a5b4fc"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
