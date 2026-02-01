"use client";

import api from "@/lib/api";

import { useQuery } from "@tanstack/react-query";
import CategoryChart from "../../../components/analitic/CategoryChart";
import generateDummyTransactions from "../../../components/analitic/data dummy";
import TotalBalanceEachTime from "../../../components/analitic/TotalBalanceEachTime";
import TrendIncomeExpense from "../../../components/analitic/TrendIncomeExpense";
import { formatIDR } from "../../../lib/utils/idrCurrency";

const transactionsss = generateDummyTransactions();

export default function Analitic() {
  //const queryClient = useQueryClient();
  //const userInformation = queryClient.getQueryData(["userInformation"]);
  const { data: userInfo, isLoading: isUserLoading } = useQuery({
    queryKey: ["userInformation"],
    queryFn: async () => {
      const res = await api.get("/userInformation");
      //console.log(res.data);

      return res.data;
    },
  });

  const { data: account, isLoading: isAccountLoading } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const res = await api.get("/showAccount");
      return res.data.data;
    },
  });

  const { data: transaction = [], isLoading: isTransactionLoading } = useQuery({
    queryKey: ["analytic"],
    queryFn: async () => {
      const res = await api.get("/transactions");

      return res.data.data;
    },
  });
  const totalIncome = transaction
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transaction
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  if (isTransactionLoading) return <p>Loading…</p>;

  return (
    <div className="space-y-20">
      <h1 className="text-2xl text-emerald-600 mb-4 font-bold">Analitic</h1>
      {/* Summary */}
      <div className="summary space-y-2 mb-10 text-emerald-700">
        <div className="flex flex-row gap-1">
          Total Income:
          <div className="text-amber-600">{formatIDR.format(totalIncome)}</div>
        </div>
        <div className="flex flex-row gap-1">
          Total Expense:
          <div className="text-amber-600">{formatIDR.format(totalExpense)}</div>
        </div>

        <div className="balance text-emerald-600 ">
          {isUserLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-row gap-1">
              Total Balance:
              <div className="text-amber-600">
                {formatIDR.format(userInfo.total_balance)}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="chart">
        {isAccountLoading ? (
          <p>Loading</p>
        ) : (
          <div className=" flex flex-col gap-10">
            {" "}
            {/* Category Chart */}
            <div className="category_charts">
              <CategoryChart dataChart={transaction} account={account} />
            </div>
            {/* Trend Chart */}
            <div className="trend">
              <TrendIncomeExpense dataChart={transaction} account={account} />
            </div>
            {/* Total Balance Over Time */}
            <div className="total_balance_chart ">
              <TotalBalanceEachTime
                dataChart={transaction}
                account={account}
                initialBalance={userInfo.initial_balance}
                isUserLoading={isUserLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
