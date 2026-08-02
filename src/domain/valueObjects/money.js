export default class Money {
  #amount;
  constructor(amount) {
    this.#amount = Number(amount.toFixed(2));
  }

  static create(amount) {
    if (typeof amount !== "number" || Number.isNaN(amount) || amount < 0) {
      throw new Error("Amount must be a valid number");
    }
    return new Money(amount);
  }

  add(other) {
    if (!(other instanceof Money)) {
      throw new Error("Other value must be a Money instance");
    }

    return new Money(this.#amount + other.#amount);
  }

  subtract(other) {
    if (!(other instanceof Money)) {
      throw new Error("Other value must be a Money instance");
    }

    return new Money(this.#amount - other.#amount);
  }

  get amount() {
    return this.#amount;
  }

  toString() {
    return this.#amount.toFixed(2);
  }
}
