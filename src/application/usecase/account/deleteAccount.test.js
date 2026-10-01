import FakeAccountRepo from "../../fakeRepo/fakeAccountRepo";
import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import {
  fakeAccountInitialData,
  fakeTransactionInitialData,
} from "../../fakeRepo/initialDataRepo";
import deleteAccount from "./deleteAccount";

test("account can be deleted", async () => {
  const fakeAccountRepository = new FakeAccountRepo(fakeAccountInitialData);
  const fakeTransactionRepository = new FakeTransactionRepo(
    fakeTransactionInitialData,
  );
  const deleteSpy = jest.spyOn(fakeAccountRepository, "delete");
  const getSpy = jest.spyOn(fakeAccountRepository, "get");
  const result = await deleteAccount({
    accountId: "2",
    accountRepo: fakeAccountRepository,
    transactionRepo: fakeTransactionRepository,
  });

  expect(deleteSpy).toHaveBeenCalled(1);
  expect(getSpy).toHaveBeenCalled(1);
  expect(fakeAccountRepository.data).toHaveLength(0);
  expect(result).toBe({ accountId: "2", name: "BCA", balance: 2000 });
});

/*
test("empty account cannot be deleted", async () => {
  const fakeAccountRepository = new FakeAccountRepo(fakeAccountInitialData);
  const fakeTransactionRepository = new FakeTransactionRepo(
    fakeTransactionInitialData,
  );

  expect(async () => {
    return await deleteAccount({
      accountId: "3", //there is no "3" in the repo's id
      fakeAccountRepository,
      fakeTransactionRepository,
    }).toThrow(/^Account cannot be deleted$/);
  });
});
test("account that has transactions cannot be deleted", async () => {
  const fakeAccountRepository = new FakeAccountRepo(fakeAccountInitialData);
  const fakeTransactionRepository = new FakeTransactionRepo(
    fakeTransactionInitialData,
  );

  expect(async () => {
    return await deleteAccount(
      "1",
      fakeAccountRepository,
      fakeTransactionRepository,
    ).toThrow(/^Account cannot be deleted$/);
  });
});
*/
