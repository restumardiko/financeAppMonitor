// const createAccountRepository = {
//   create: jest.fn(({ name, balance }) => ({
//     id: "acc_123",
//     name,
//     balance: balance.toNumber(),
//   })),
// };

// test("should create an account via the use case", () => {
//   const account = createAccount({
//     name: "Savings",
//     balance: Money.create(250),
//     accountRepository: createAccountRepository,
//   });

//   expect(account.name).toBe("Savings");
//   expect(account.balance).toBe(250);
//   expect(createAccountRepository.create).toHaveBeenCalledWith({
//     id: "acc_123",
//     name: "Savings",
//     balance: 250,
//   });
// });

// test("should reject empty names", () => {
//   expect(() =>
//     createAccount({
//       name: "",
//       balance: Money.create(10),
//       accountRepository: createAccountRepository,
//     }),
//   ).toThrow("Name should not be empty or less than two");
// });
