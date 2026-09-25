import Money from "../../../domain/valueObjects/money";

export default async function deleteAccount({
  accountId,
  accountRepository,
  transactionRepo,
}) {
  //cek di accountRepository by name and id
  const account = await accountRepository.get(accountId);
  const accountTransaction = await transactionRepo.get(accountId);
  const isAccountDeletable = () => {
    if (!account) {
      return false;
    }
    if (account.balance <= Money.create(0) && !accountTransaction) {
      return true;
    }
  };
  if (isAccountDeletable) {
    const deletedAccount = await accountRepository.delete(name, id);
    return deletedAccount;
  }
  throw new Error("Account cannot be deleted");
}
