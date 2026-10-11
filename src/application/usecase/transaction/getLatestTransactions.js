export default async function getLatestTransactions(transactionRepo) {
  const latestTransaction = await transactionRepo.getLatestTransaction();
  return latestTransaction;
}
