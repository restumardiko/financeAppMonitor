export default class Transaction {
  constructor({
    id,
    amount,
    transactionType,
    date,
    category,
    accountId,
    description,
  }) {
    this.id = id;
    this.amount = amount;
    this.type = transactionType;
    this.date = date;
    this.category = category;
    this.accountId = accountId;
    this.description = description;
  }
}
