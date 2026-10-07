import { mapAccount, mapAccounts } from "./map";
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
      return account.id === accountId;
    });
    return mapAccount(raw);
  }
  getAll() {
    return mapAccounts(this.data);
  }
  delete(accountId) {
    const whichIndex = this.data.findIndex(
      (account) => account.id === accountId,
    );

    if (whichIndex !== -1) {
      this.data.splice(whichIndex, 1);
      return true;
    }

    return false;
  }
}
