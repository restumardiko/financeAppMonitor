export default class Id {
  constructor(value) {
    if (!value) {
      throw new Error("Id cannot be empty");
    }

    this.value = value;
  }

  static generate() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return new Id(crypto.randomUUID());
    }

    return new Id(`${Date.now()}-${Math.random().toString(16).slice(2)}`);
  }

  toString() {
    return this.value;
  }
}
//ILL REFACTOR THIS CLASS TO FUNCTION LATER
