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
    throw new Error(
      "Account cannot be deleted neither empty nor empty transaction",
    );
  }
  //lil bit skeptic about what kind of data returned by this function
  return await accountRepo.delete(accountId);
}
