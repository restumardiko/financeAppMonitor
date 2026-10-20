export default async function getAllTransAccount({
  accountId,
  transactionRepo,
}) {
  const allTransAccount =
    await transactionRepo.getAllTransactionAccount(accountId);
  return allTransAccount;
}
