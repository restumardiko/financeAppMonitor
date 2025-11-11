import { useEffect, useCallback } from "react";
import useLatestTransactionStore from "../../app/store/useTransactionsStore";
import TransactionsCard from "./transactionsCard";

export default function TransactionsHistory() {
  const { LatestTransactions, fetchLatestTransactions } =
    useLatestTransactionStore();

  const stableFetch = useCallback(() => {
    fetchLatestTransactions();
  }, [fetchLatestTransactions]);

  useEffect(() => {
    if (!LatestTransactions || LatestTransactions.length === 0) {
      console.log("ini latest transactions", LatestTransactions);
      stableFetch();
    }
  }, [stableFetch]);

  return (
    <div className="recent_transactions gap-2 flex flex-col">
      <TransactionsCard transactions={LatestTransactions} />
    </div>
  );
}
