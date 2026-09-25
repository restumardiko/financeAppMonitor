import Money from "../../../domain/valueObjects/money";
import FakeAccountRepo from "../../fakeRepo/fakeAccountRepo";
import { fakeAccountInitialData } from "../../fakeRepo/initialDataRepo";
import createAccount from "./createAccount";

test("should create an account via the use case", async () => {
  const fakeRepo = new FakeAccountRepo(fakeAccountInitialData);
  const saveSpy = jest.spyOn(fakeRepo, "save");
  const account = await createAccount({
    name: "Savings",
    balance: Money.create(2000),
    accountRepository: fakeRepo,
  });

  expect(account).toHaveProperty("name");
  expect(fakeRepo.data).toHaveLength(3);
  expect(saveSpy).toHaveBeenCalledTimes(1);
});
