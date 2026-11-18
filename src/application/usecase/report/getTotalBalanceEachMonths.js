export default async function getTotalBalanceEachMonths({
  accountId,
  year,
  transactionRepo,
}) {
  const allTransactions =
    await transactionRepo.getAllTransactionsAccount(accountId);
  const allTransactionUntilSettledYear = (year) => {
    return;
  };

  return previousFixedBalance - walkingBalance;

  //unfinisihed yet
}
