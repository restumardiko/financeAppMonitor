export default async function getAllAccount(accountRepository) {
  //get all account from repo
  const accounts = await accountRepository.getAll();
  //return those all
  return accounts;
}
