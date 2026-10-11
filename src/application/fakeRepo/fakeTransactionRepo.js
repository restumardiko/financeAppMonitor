export default class FakeTransactionRepo {
  data;
  constructor(initialData) {
    this.data = initialData;
  }
  async save(transaction) {
    this.data.push(transaction);
    return transaction;
  }
  async get(transactionId) {
    return this.data.find((transaction) => {
      return transaction.id === transactionId;
    });
  }

  async getAll() {
    return this.data;
  }
  async getLatestTransaction() {
    return this.data.slice(-5);
  }

  async delete(transactionId) {
    const whichIndex = this.data.findIndex(
      (transaction) => transaction.id === transactionId,
    );

    if (whichIndex !== -1) {
      this.data.splice(whichIndex, 1);
      return true;
    }

    return false;
  }

  async hasTransactionFor(accountId) {
    const isTransAcc = this.data.find(
      (transaction) => transaction.accountId === accountId,
    );
    if (isTransAcc) {
      return true;
    }
    return false;
  }
  //
}
