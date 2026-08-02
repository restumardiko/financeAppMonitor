import Id from "../common/id.js";
import Money from "../valueObjects/money.js";

export default class Account {
  #id;
  #name;
  #balance;

  constructor({ name, balance }) {
    this.#id = Id.generate();
    this.#name = name;
    this.#balance =
      balance instanceof Money ? balance : Money.create(balance ?? 0);
  }
  static create({ name, balance }) {
    if (!name || name.trim().length < 2) {
      throw new Error("name should not be empty or less than two");
    }
    if (typeof balance !== "number" || balance < 0) {
      throw new Error("balance should be number and should not be negative");
    }
    return new Account({ name, balance });
  }
  deposit(amount) {
    this.#balance = this.#balance.add(Money.create(amount));
    return this;
  }

  withdraw(amount) {
    this.#balance = this.#balance.subtract(Money.create(amount));
    return this;
  }

  get balance() {
    return this.#balance.toNumber();
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
