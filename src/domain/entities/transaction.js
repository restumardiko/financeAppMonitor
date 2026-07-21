export default class Transaction {
  #id;
  #amount;
  #transactionType;
  #date;
  #accountId;
  #description;
  #status;
  constructor({
    id,
    amount,
    transactionType,
    date,
    accountId,
    description,
    status,
  }) {
    this.#id = id;
    this.#amount = amount;
    this.#transactionType = transactionType;
    this.#date = date;
    this.#accountId = accountId;
    this.#description = description;
    this.#status = status;
  }
  static create(id,amount,transactionType,date,accountId,description) {
    if (!id) {
      throw new Error("Id cannot be empty");
    }
    if (!amount) {
      throw new Error("Amount cannot be empty");
    }
    if (!transactionType) {
      throw new Error("transaction type cannot be empty");
    }
    if (!accountId) {
      throw new Error("accountId cannot be empty");
    }
    if (!description) {
      throw new Error("description cannot be empty");
    }
    if (date > new Date()) {
      throw new Error("Transaction cannot be in the future");
    }
    return new Transaction({
      id,
      amount,
      transactionType,
      date,
      accountId,
      description,
      status,
    });
  }
  isPending() {
    return this.#status === "PENDING";
  }
  isConfirmed() {
    return this.#status === "CONFIRMEDD";
  }
  confirm() {
    if (!this.isPending) {
      throw new Error("Only pending transaction can be confirmed");
    }
    return (this.#status = "CONFIRMED");
  }
  cancel() {
    if (!this.isConfirmed) {
      throw new Error("cannot cancel confirmed transaction ");
    }
    return (this.#status = "CANCELED");
  }
  //getter
  get amount() {
    return this.#amount;
  }
  get transactionType() {
    return this.#transactionType;
  }
  get date() {
    return this.#date;
  }
  get accountId() {
    return this.#accountId;
  }
  get description() {
    return this.#description;
  }
  //setter
  set amount(amount) {
    this.#amount = amount;
  }
  set date(date) {
    this.#date = date;
  }
  set transactionType(transactionType) {
    this.#transactionType = transactionType;
  }
  set accountId(accountId) {
    this.#accountId = accountId;
  }
  set description(description) {
    this.#description = description;
  }
}
