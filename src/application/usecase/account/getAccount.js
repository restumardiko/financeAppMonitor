export default async function getAccount({ accountId, accountRepo }) {
  const account = await accountRepo.get(accountId);
  return account;
}
