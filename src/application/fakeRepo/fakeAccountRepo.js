import { accountMap } from "./map";

export default class FakeAccountRepo {
  data;
  constructor(initialData) {
    this.data = initialData;
  }
  save(account) {
    this.data.push(account);
    return account;
  }
  get(accountId) {
    const raw = this.data.find((account) => {
      return account.accountId === accountId;
    });
    return accountMap(raw);
  }
  delete(accountId) {
    const whichIndex = this.data.findIndex(
      (account) => account.accountId === accountId,
    );

    if (whichIndex !== -1) {
      this.data.splice(whichIndex, 1);
      return true;
    }

    return false;
  }
}
