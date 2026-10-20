import months from "./months";

export default async function getTotalIncome({
  accountId,
  year,
  transactionRepo,
}) {
  const allTransactions =
    await transactionRepo.getAllTransactionsAccount(accountId);
  const incomeTransactions = allTransactions.filter(
    (transaction) =>
      transaction.transactionType.type === "INCOME" &&
      transaction.date.getFullYear() === year,
  );
  const totalIncome = months.map((month, index) => {
    const transactionInMonth = incomeTransactions.filter((transaction) => {
      return transaction.date.getMonth() === index;
    });
    const total = transactionInMonth.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    return { [month]: total };
  });
  return totalIncome;
}
