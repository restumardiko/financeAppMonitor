export default class TransactionType {
  static TYPE = { INCOME: "INCOME", EXPENSE: "EXPENSE" };
  static typeIncome = TransactionType.TYPE.INCOME;
  static typeExpense = TransactionType.TYPE.EXPENSE;
  static CATEGORY = {
    EXPENSE: ["FOOD", "TRANSPORT", "HOME", "HEALTH"],
    INCOME: ["SALARY", "BUSINESS", "ETC."],
  };

  #type;
  #validCategory;
  constructor({ type, category }) {
    this.#type = type;
    this.#validCategory = category;
  }

  static create({ type, category }) {
    const normalizedType = type.toUpperCase();
    const normalizedCategory = category.toUpperCase();
    const whichType = TransactionType.TYPE[normalizedType];
    const whichKindCategory = TransactionType.CATEGORY[normalizedType];

    if (!whichType) {
      throw new Error("neither Income nor Expense");
    }
    if (!whichKindCategory.includes(normalizedCategory)) {
      throw new Error("Category is not valid");
    }

    return new TransactionType({
      type: normalizedType,
      category: normalizedCategory,
    });
  }

  get type() {
    return this.#type;
  }
  get category() {
    return this.#validCategory;
  }
  getTransactionType() {
    return { type: this.#type, category: this.#validCategory };
  }
}
