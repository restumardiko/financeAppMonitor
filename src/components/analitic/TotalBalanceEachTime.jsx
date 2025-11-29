// "use client";
import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

  const [sort, setSort] = useState({
    account: "All",
    time: uniqueYear[0],
  });

  function handleFilterChange(key, value) {
    setSort((prev) => ({ ...prev, [key]: value }));
  }

  //  FILTER TRANSAKSI SESUAI ACCOUNT & TAHUN
  const filteredData = useMemo(() => {
    if (!dataChart?.length) return [];

    return dataChart.filter((item) => {
      const matchAccount =
        sort.account === "All" ? true : item.account_name === sort.account;

      const matchTime = item.created_at.startsWith(String(sort.time));

      return matchAccount && matchTime;
    });
  }, [dataChart, sort]);

  //  INITIAL BALANCE (All / Single Account)
  function getInitialBalanceEachAccount() {
    if (!initialBalance?.length) return 0;

    if (sort.account === "All") {
      return initialBalance.reduce(
        (total, item) => total + Number(item.initial_balance),
        0
      );
    }

    const selectedAccount = initialBalance.find(
      (item) => item.account_name === sort.account
    );

    return selectedAccount ? Number(selectedAccount.initial_balance) : 0;
  }

  //  RUNNING BALANCE PER BULAN (JAN–DES)
  function getMonthlyRunningBalance(transactions, initialBalance, months) {
    const grouped = transactions.reduce((acc, trx) => {
      const d = new Date(trx.created_at);
      const monthIndex = d.getMonth(); // 0 - 11

      if (!acc[monthIndex]) acc[monthIndex] = 0;

      const amount = Number(trx.amount);
      acc[monthIndex] += trx.type === "Income" ? amount : -amount;

      return acc;
    }, {});

    let running = initialBalance;

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
    <div className="w-full h-full mt-20 space-y-8">
      {/* FILTER SECTION */}
      <div className="flex flex-wrap items-center gap-4">
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
        {isAccountLoading ? (
          <p className="text-sm text-zinc-500">Loading account...</p>
        ) : (
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
        )}
      </div>

      {/* CHART SECTION */}
      <div className="w-full h-[350px] rounded-xl border  shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 12, left: 0, bottom: 12 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />

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
