import Money from "../../domain/valueObjects/money";
import FakeAccountRepo from "./fakeAccountRepo";
import { fakeAccountInitialData } from "./initialDataRepo";
import { accountMap } from "./map";
const fakeAccountRepo = new FakeAccountRepo(fakeAccountInitialData);

test("can save account to repo", () => {
  fakeAccountRepo.save({
    accountId: "4",
    name: "MANDIRI",
    balance: 4000,
  });
  expect(fakeAccountRepo.data).toHaveLength(3);
});
test("can get account from repo", () => {
  const result = fakeAccountRepo.get("2");
  expect(result).toEqual(
    accountMap({
      accountId: "2",
      name: "BCA",
      balance: Money.create(2000),
    }),
  );
});
test("can delete account on repo", () => {
  const result = fakeAccountRepo.delete("1");
  expect(result).toBeTruthy();
});
