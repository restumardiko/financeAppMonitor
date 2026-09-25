import FakeAccountRepo from "./fakeAccountRepo";
import { fakeAccountInitialData } from "./initialDataRepo";

test("can save account to repo", () => {
  const fakeAccountRepo = new FakeAccountRepo(fakeAccountInitialData);
  fakeAccountRepo.save({
    id: "4",
    name: "MANDIRI",
    balance: 4000,
  });
  expect(fakeAccountRepo.data.length).toEqual(3);
});
test("can get account from repo", () => {
  const fakeAccountRepo = new FakeAccountRepo(fakeAccountInitialData);
  const result = fakeAccountRepo.get("2");
  expect(result).toEqual({
    id: "2",
    name: "BCA",
    balance: 2000,
  });
});
// Test("can delete account on repo")
