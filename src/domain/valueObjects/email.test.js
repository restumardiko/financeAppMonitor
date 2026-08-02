import Email from "./email";

test("should return error when the email format isnt correct", () => {
  expect(() => {
    Email.create("arbitraryemailformat.co");
  }).toThrow(/^the email format is not correct$/);
});
// test("shouldnot allow creating new instance use new ", () => {
//   expect(() => {
//     new Email("emailExample@gmail.com");
//   }).toThrow();
// });
test("should create an email with correct given value", () => {
  const validEmail = Email.create("emailExample@gmail.com");
  expect(validEmail.validEmail).toEqual("emailExample@gmail.com");
});
