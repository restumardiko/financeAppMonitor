import TransactionType from "./transactionType";

test("reject invalid type", () => {
  expect(() => {
    TransactionType.create({ type: "notValid", category: "SALARY" });
  }).toThrow(/^neither Income nor Expense$/);
});
test("reject invalid category on expense type", () => {
  expect(() => {
    TransactionType.create({ type: "expense", category: "SALARY" });
  }).toThrow(/^Category is not valid$/);
});
test("reject invalid category on income type", () => {
  expect(() => {
    TransactionType.create({ type: "income", category: "FOOD" });
  }).toThrow(/^Category is not valid$/);
});
test("return the validated transaction type and category", () => {
  const base = TransactionType.create({ type: "Income", category: "Etc." });

  expect(base.getTransactionType()).toEqual({
    type: "INCOME",
    category: "ETC.",
  });
});
