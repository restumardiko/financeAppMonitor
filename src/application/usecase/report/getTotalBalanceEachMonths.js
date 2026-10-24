
export default async function getTotalBalanceEachMonths({
  accountId,
  year,
  transactionRepo,
}) {

 const allTransactions =
    await transactionRepo.getAllTransactionsAccount(accountId);
  const incomeTransactions = allTransactions.filter(
    (transaction) =>
      transaction.transactionType.type === "EXPENSE" &&
      transaction.date.getFullYear() === year,
  );



  const totalIncome = 
  const totalExpense = 
  const totalBalance = totalIncome - totalExpense;
  return totalBalance;
}
