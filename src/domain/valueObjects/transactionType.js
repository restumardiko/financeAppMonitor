export default class TransactionType {
  static VALID_NAME = ["INCONE", "EXPENSE"];
  #name;
  #validCategories;
  constructor({ name, validCategories }) {
    this.#name = name; // "expense" or "income"
    this.#validCategories = validCategories; // ["food", "health", ...]
  }

  static create({name,validCategories}) {
    const normalizedName = name;
    if (TransactionType.VALID_NAME.includes()) {
      throw new Error("Transaction name is not valid");
    }
  }
}
