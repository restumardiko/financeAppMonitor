export default async function getAllTransaction(transactionRepo) {
  const transactions = await transactionRepo.getAll();
  return transactions;
}
