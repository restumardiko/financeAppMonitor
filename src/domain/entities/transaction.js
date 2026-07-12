export default class Transaction {
  constructor({
    id,
    amount,
    transactionType,
    date,
    accountId,
    description,
    status,
  }) {
    this.id = id;
    this.amount = amount;
    this.type = transactionType;
    this.date = date;
    this.accountId = accountId;
    this.description = description;
    this.status = status;
  }
  //create transaction
  // toJSON() {
  //   return {
  //     id: this.id.toString(),
  //     amount: this.amount,
  //     type: this.type,
  //     date: this.date,
  //     account: this.accountId,
  //     description: this.description,
  //   };
  //}

  //
}
