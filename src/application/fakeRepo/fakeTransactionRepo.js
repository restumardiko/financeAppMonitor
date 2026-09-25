export default class FakeTransactionRepo {
  data;
  constructor(initialData) {
    this.data = initialData;
  }
  save(transaction) {
    this.data.push(transaction);
    return transaction;
  }
  get(transactionId) {
    return this.data.find((transaction) => {
      return transaction.userId === transactionId;
    });
  }
  delete(transactionId) {
    const whichIndex = this.data.findIndex(
      (transaction) => transaction.userId === transactionId,
    );

    if (whichIndex !== -1) {
      this.data.splice(whichIndex, 1);
      return true;
    }

    return false;
  }
}
