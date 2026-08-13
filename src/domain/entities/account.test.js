import Money from "../valueObjects/money";
import Account from "./account";

const balance = Money.create(100);

test("should create an account with a given name and balance", () => {
  const account = Account.create({
    name: "Test Account",
    balance: balance,
  });
  expect(account.name).toBe("Test Account");
  expect(account.balance).toBe(100);
});
test("should return error when create account with empty name", () => {
  expect(() => Account.create({ name: "", balance: balance })).toThrow(
    /^Name should not be empty or less than two$/,
  );
});
test("should return error when create account with invalide balance", () => {
  expect(() => Account.create({ name: "Test Account", balance: -50 })).toThrow(
    /^Balance is not valid$/,
  );
});

test("should deposit money into the account", () => {
  const account = Account.create({ name: "Test Account", balance: balance });
  account.deposit(50);
  expect(account.balance).toBe(150);
});

test("should withdraw money into the account", () => {
  const account = Account.create({ name: "Test Account", balance: balance });
  account.withdraw(50);
  expect(account.balance).toBe(50);
});
