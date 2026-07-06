// transactionType.js
class TransactionType {
  constructor(name, validCategories) {
    this.name = name; // "expense" or "income"
    this.validCategories = validCategories; // ["food", "health", ...]
  }
}

// Usage
const expenseType = new TransactionType("expense", [
  "food",
  "health",
  "transport",
]);
const incomeType = new TransactionType("income", [
  "salary",
  "business",
  "investment",
]);
