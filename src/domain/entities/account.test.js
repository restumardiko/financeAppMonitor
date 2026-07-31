import Account from "./account";

test("should create an account with a given name and balance", () => {
  const account = Account.create({ name: "Test Account", balance: 100 });
  expect(account.name).toBe("Test Account");
  expect(account.balance).toBe(100);
});
test("should return error when create account with empty name", () => {
  expect(() => Account.create({ name: "", balance: 100 })).toThrow(
    /^name should not be empty or less than two^/,
  );
});
test("should return error when create account with negative balance", () => {
  expect(() =>
    Account.create({ name: "Test Account", balance: -50 }),
  ).toThrow();
});

test("should deposit money into the account", () => {
  const account = Account.create({ name: "Test Account", balance: 100 });
  account.deposit(50);
  expect(account.balance).toBe(150);
});

test("should withdraw money into the account", () => {
  const account = Account.create({ name: "Test Account", balance: 100 });
  account.withdraw(50);
  expect(account.balance).toBe(50);
});

test("should return accont's balance", () => {
  const account = Account.create({ name: "Test Account", balance: 100 });
  expect(account.balance).toBe(100);
});
