import Account from "../../../domain/entities/account.js";

export default async function createAccount({
  name,
  balance,
  accountRepository,
}) {
  const account = Account.create({ name, balance });

  const savedAccount = await accountRepository.save(account);

  return savedAccount;
}
