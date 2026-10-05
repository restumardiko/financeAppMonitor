export default async function getAccount({ accountId, accountRepo }) {
  const allAccount = await accountRepo.get(accountId);
  return allAccount;
}
