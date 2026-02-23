"use client";

import api from "@/lib/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import CategoryChart from "../../../components/analitic/CategoryChart";
import TotalBalanceEachTime from "../../../components/analitic/TotalBalanceEachTime";
import TrendIncomeExpense from "../../../components/analitic/TrendIncomeExpense";
import { formatIDR } from "../../../lib/utils/idrCurrency";

export default function Analitic() {
  const router = useRouter();

  const handleAuthError = (error) => {
    if (error?.response?.status === 401) {
      router.push("/login");
    }
  };

  const {
    data: userInfo,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["userInformation"],
    queryFn: async () => {
      const res = await api.get("/userInformation");
      return res.data;
    },
    retry: false,
    onError: handleAuthError,
  });

  const {
    data: account,
    isLoading: isAccountLoading,
    error: accountError,
  } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const res = await api.get("/showAccount");
      return res.data.data;
    },
    retry: false,
    onError: handleAuthError,
  });

  const {
    data: transaction = [],
    isLoading: isTransactionLoading,
    error: transactionError,
  } = useQuery({
    queryKey: ["analytic"],
    queryFn: async () => {
      const res = await api.get("/transactions");
      return res.data.data;
    },
    retry: false,
    onError: handleAuthError,
  });

  if (isUserLoading || isAccountLoading || isTransactionLoading) {
    return <p>Loading...</p>;
  }

  if (userError || accountError || transactionError) {
    return <p>Something went wrong. Please login again.</p>;
  }

  const totalIncome = transaction
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transaction
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="space-y-20">
      <h1 className="text-2xl text-emerald-600 mb-4 font-bold">Analytic</h1>

      {/* Summary */}
      <div className="space-y-2 mb-10 text-emerald-700">
        <div className="flex gap-1">
          Total Income:
          <div className="text-amber-600">{formatIDR.format(totalIncome)}</div>
        </div>

        <div className="flex gap-1">
          Total Expense:
          <div className="text-amber-600">{formatIDR.format(totalExpense)}</div>
        </div>

        <div className="flex gap-1">
          Total Balance:
          <div className="text-amber-600">
            {formatIDR.format(userInfo?.total_balance ?? 0)}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col gap-10">
        <CategoryChart dataChart={transaction} account={account} />

        <TrendIncomeExpense dataChart={transaction} account={account} />

        <TotalBalanceEachTime
          dataChart={transaction}
          account={account}
          initialBalance={userInfo?.initial_balance ?? 0}
          isUserLoading={isUserLoading}
        />
      </div>
    </div>
  );
}
