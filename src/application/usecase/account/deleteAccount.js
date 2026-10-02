export default async function deleteAccount({
  accountId,
  accountRepo,
  transactionRepo,
}) {
  const account = await accountRepo.get(accountId);

  if (!account) {
    throw new Error("Account not found");
  }

  const hasTransactions = await transactionRepo.hasTransactionFor(accountId);
  if (!account.canBeDeleted({ hasTransactions })) {
    throw new Error("Account cannot be deleted");
  }

  await accountRepo.delete(accountId);
}
