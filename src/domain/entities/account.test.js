import Account from "./account";

test("should create an account with a given name and balance", () => {
  const account = new Account({ name: "Test Account", balance: 100 });
  expect(account.name).toBe("Test Account");
  expect(account.getBalance()).toBe(100);
});
test("should return error when create account with empty name", () => {
  expect(() => new Account({ name: "", balance: 100 })).toThrow(
    "name should not be empty or less than two",
  );
});
//test("should return error when create account with negative balance");

test("should deposit money into the account", () => {
  const account = new Account({ name: "Test Account", balance: 100 });
  account.deposit(50);
  expect(account.getBalance()).toBe(150);
});

test("should withdraw money into the account", () => {
  const account = new Account({ name: "Test Account", balance: 100 });
  account.withdraw(50);
  expect(account.getBalance()).toBe(50);
});

test("should return accont's balance", () => {
  const account = new Account({ name: "Test Account", balance: 100 });
  expect(account.getBalance()).toBe(100);
});
