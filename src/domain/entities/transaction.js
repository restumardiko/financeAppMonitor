import Money from "../valueObjects/money";
import TransactionType from "../valueObjects/transactionType";
export default class Transaction {
  #id;
  #amount;
  #transactionType;
  #date;
  #accountId;
  #description;
  #status;
  constructor({ amount, transactionType, date, accountId, description }) {
    this.#id = crypto.randomUUID();
    this.#amount = amount;
    this.#transactionType = transactionType;
    this.#date = date;
    this.#accountId = accountId;
    this.#description = description;
    this.#status = "PENDING";
  }
  static create({ amount, transactionType, date, accountId, description }) {
    if (!amount || !(amount instanceof Money)) {
      throw new Error("Amount is not valid");
    }
    if (!(transactionType instanceof TransactionType)) {
      throw new Error("transaction type is not valid");
    }
    //should be a property of account's instance !
    if (!accountId) {
      throw new Error("accountId cannot be empty");
    }
    if (!description) {
      throw new Error("description cannot be empty");
    }
    if (!(date instanceof Date) || !date || isNaN(date)) {
      throw new Error("invalid date transaction");
    }
    if (date > new Date()) {
      throw new Error("Transaction cannot be in the future");
    }
    return new Transaction({
      amount,
      transactionType,
      date,
      accountId,
      description,
    });
  }
  isPending() {
    return this.#status === "PENDING";
  }
  isConfirmed() {
    return this.#status === "CONFIRMED";
  }
  confirm() {
    if (!this.isPending()) {
      throw new Error("Only pending transaction can be confirmed");
    }
    return (this.#status = "CONFIRMED");
  }
  cancel() {
    if (!this.isConfirmed()) {
      throw new Error("cannot cancel confirmed transaction ");
    }
    return (this.#status = "CANCELED");
  }
  //getter
  get id() {
    return this.#id;
  }

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
  get status() {
    return this.#status;
  }
  toJSON() {
    return {
      id: this.#id,
      amount: this.#amount,
      transactionType: this.#transactionType,
      date: this.#date,
      accountId: this.#accountId,
      description: this.#description,
      status: this.#status,
    };
  }

  //setter
  set amount(amount) {
    if (!amount || !(amount instanceof Money)) {
      throw new Error("Amount is not valid");
    }
    this.#amount = amount;
  }
  set date(date) {
    if (!(date instanceof Date) || !date || isNaN(date)) {
      throw new Error("invalid date transaction");
    }
    if (date > new Date()) {
      throw new Error("Transaction cannot be in the future");
    }

    this.#date = date;
  }
  set transactionType(transactionType) {
    if (!(transactionType instanceof TransactionType)) {
      throw new Error("transaction type is not valid");
    }
    this.#transactionType = transactionType;
  }
  set accountId(accountId) {
    this.#accountId = accountId;
  }
  set description(description) {
    if (!description) {
      throw new Error("description cannot be empty");
    }

    this.#description = description;
  }
}
