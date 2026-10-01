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
    return this.data.find((account) => {
      return account.accountId === accountId;
    });
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
