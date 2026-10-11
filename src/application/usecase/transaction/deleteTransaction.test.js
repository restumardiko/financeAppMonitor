import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import deleteTransaction from "./deleteTransaction";

test("transaction can be deleted", async () => {
  const fakeTransactionRepo = new FakeTransactionRepo(
    fakeTransactionInitialData,
  );
  const deleteSpy = jest.spyOn(fakeTransactionRepo, "delete");
  const result = await deleteTransaction({
    transactionId: "1",
    transactionRepo: fakeTransactionRepo,
  });
  expect(deleteSpy).toHaveBeenCalledTimes(1);
  expect(fakeTransactionRepo.data).toHaveLength(0);
  expect(result).toBeTruthy();
});
