
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

  expect(deleteSpy).toHaveBeenCalledTimes(1);
  expect(getSpy).toHaveBeenCalledTimes(1);
  expect(fakeAccountRepository.data).toHaveLength(1);
  expect(result).toBeTruthy();
});

test("account that has transactions cannot be deleted", async () => {
  const fakeAccountRepository = new FakeAccountRepo(fakeAccountInitialData);
  const fakeTransactionRepository = new FakeTransactionRepo(
    fakeTransactionInitialData,
  );

  await expect(
    deleteAccount({
      accountId: "1",
      accountRepo: fakeAccountRepository,
      transactionRepo: fakeTransactionRepository,
    }),
  ).rejects.toThrow(
    /^Account cannot be deleted neither empty nor empty transaction$/,
  );
});
