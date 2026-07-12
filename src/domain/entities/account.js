import Id from "../common/id.js";
import Money from "../valueObjects/money.js";

export default class Account {
  constructor({ id, name, balance }) {
    if (!name || name.trim().length < 2) {
      throw new Error("name should not be empty or less than two");
    }

    this.id = id ? new Id(id) : Id.generate();
    this.name = name;
    this.balance =
      balance instanceof Money ? balance : Money.create(balance ?? 0);
  }

  deposit(amount) {
    this.balance = this.balance.add(Money.create(amount));
    return this;
  }

  withdraw(amount) {
    this.balance = this.balance.subtract(Money.create(amount));
    return this;
  }

  getBalance() {
    return this.balance.toNumber();
  }

  toJSON() {
    return {
      id: this.id.toString(),
      name: this.name,
      balance: this.balance.toNumber(),
    };
  }
}
