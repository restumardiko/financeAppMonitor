import Account from "../../domain/entities/account";
import FakeAccountRepo from "./fakeAccountRepo";
import { fakeAccountInitialData } from "./initialDataRepo";
const fakeAccountRepo = new FakeAccountRepo(fakeAccountInitialData);

test("can save account to repo", () => {
  fakeAccountRepo.save({
    id: "4",
    name: "MANDIRI",
    balance: 4000,
  });
  expect(fakeAccountRepo.data).toHaveLength(3);
});
test("can get account from repo", () => {
  const result = fakeAccountRepo.get("2");
  expect(result).toBeInstanceOf(Account);
  expect(result.toJSON()).toEqual({ id: "2", name: "BCA", balance: 2000 });
});

test("can delete account on repo", () => {
  const result = fakeAccountRepo.delete("1");
  expect(result).toBeTruthy();
});
test("can get all accounts", () => {
  const result = fakeAccountRepo.getAll();
  expect(result).toEqual([
    { id: "2", name: "BCA", balance: 2000 },
    { id: "4", name: "MANDIRI", balance: 4000 },
  ]);
});
