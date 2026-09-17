import Money from "../../../domain/valueObjects/money";
import createAccount from "./createAccount";

function makeFakeRepository() {
  const store = [];
  return {
    save: jest.fn(async (account) => {
      store.push(account);
      return account;
    }),
    _store: store,
  };
}

test("should create an account via the use case", async () => {
  const fakeRepo = makeFakeRepository();
  const account = await createAccount({
    name: "Savings",
    balance: Money.create(250),
    accountRepository: fakeRepo,
  });

  expect(fakeRepo.save).toHaveBeenCalledTimes(1);
  expect(fakeRepo.save).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Savings",
      balance: 250,
    }),
  );
  expect(account).toEqual(
    expect.objectContaining({
      name: "Savings",
      balance: 250,
    }),
  );
});
