export default class Transaction {
  constructor({ id, amount, transactionType, date, accountId, description }) {
    this.id = id;
    this.amount = amount;
    this.type = transactionType;
    this.date = date;
    this.accountId = accountId;
    this.description = description;
  }
}
