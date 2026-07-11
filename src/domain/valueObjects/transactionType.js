export default class TransactionType {
  constructor(name, validCategories) {
    this.name = name; // "expense" or "income"
    this.validCategories = validCategories; // ["food", "health", ...]
  }
}
