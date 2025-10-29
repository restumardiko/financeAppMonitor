"use client";

import TrendIncomeExpense from "../../../components/statistic/linechart";
import CategoryChart from "../../../components/statistic/piechart";
import TotalBalanceEachTime from "../../../components/statistic/simpleAreaChart";
import useTransactionStore from "../../store/useTransactionsStore";

export default function Analitic() {
  const { transactions } = useTransactionStore();
  console.log("data passed", transactions);
  return (
    <div>
      <div className=" summary">
        <div>total income:</div>
        <div>total expense</div>
        <div className="balance">
          <div>total balance:</div>
        </div>
      </div>

      <div className="category_charts">
        <div>
          account <br /> sort by time <br /> income/expense
        </div>
        <CategoryChart />
      </div>

      <div className="trend bg-gray-50">
        <div>
          sort income/expense <br />
          income <br />
          expense
        </div>
        <TrendIncomeExpense />
      </div>
      <div className="total_balance_chart w-full h-80">
        <div>
          sort all <br />
          ovo <br />
          dana
        </div>
        <TotalBalanceEachTime />
      </div>
      <div className="each_category_each_time"></div>
    </div>
  );
}
