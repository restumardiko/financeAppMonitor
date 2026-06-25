export default class Money {
  constructor(amount) {
    if (typeof amount !== "number" || Number.isNaN(amount)) {
      throw new Error("Amount must be a valid number");
    }

    this.amount = Number(amount.toFixed(2));
  }

  static create(amount) {
    return new Money(amount);
  }

  add(other) {
    if (!(other instanceof Money)) {
      throw new Error("Other value must be a Money instance");
    }

    return new Money(this.amount + other.amount);
  }

  subtract(other) {
    if (!(other instanceof Money)) {
      throw new Error("Other value must be a Money instance");
    }

    return new Money(this.amount - other.amount);
  }

  toNumber() {
    return this.amount;
  }

  toString() {
    return this.amount.toFixed(2);
  }
}
