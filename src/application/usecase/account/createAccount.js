import Account from "../../../domain/entities/account.js";

export default async function createAccount({
  name,
  balance,
  accountRepository,
}) {
  const account = Account.create({ name, balance });

  await accountRepository.save(account);

  return account.toJSON();
}
