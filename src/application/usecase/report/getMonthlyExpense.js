export default async function getMonthlyExpense({ transactionRepo }) {
  const allTransactions = await transactionRepo.getAll();
  const monthlyExpenseTransactions = allTransactions.filter(
    (transaction) =>
      transaction.transactionType.type === "EXPENSE" &&
      transaction.date.getMonth() === new Date().getMonth() &&
      transaction.date.getFullYear() === new Date().getFullYear(),
  );
  const totalMonthlyExpense = monthlyExpenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );
  return totalMonthlyExpense;
}
