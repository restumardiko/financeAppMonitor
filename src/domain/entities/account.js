import Money from "../valueObjects/money.js";
//havent privated yet

export default class Account {
  #id;
  #name;
  #balance;

  constructor({ name, balance, id }) {
    this.#id = id || crypto.randomUUID();
    this.#name = name;
    this.#balance = balance;
  }
  static create({ name, balance, id }) {
    if (!name || name.trim().length < 2) {
      throw new Error("Name should not be empty or less than two");
    }
    if (!(balance instanceof Money)) {
      throw new Error("Balance is not valid");
    }
    return new Account({ name, balance, id });
  }
  deposit(amount) {
    this.#balance = this.#balance.add(Money.create(amount));
    return this;
  }

  withdraw(amount) {
    this.#balance = this.#balance.subtract(Money.create(amount));
    return this;
  }
  canBeDeleted({ hasTransactions }) {
    return this.#balance.isZero() && !hasTransactions;
  }

  get balance() {
    return this.#balance;
  }
  get name() {
    return this.#name;
  }
  get id() {
    return this.#id;
  }

  toJSON() {
    return {
      id: this.#id.toString(),
      name: this.#name,
      balance: this.#balance.toNumber(),
    };
  }
}
