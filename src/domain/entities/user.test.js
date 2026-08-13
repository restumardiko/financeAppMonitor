import User from "../entities/user";
import Email from "../valueObjects/email";

const id = crypto.randomUUID();
const name = "Lorem Ipsum";
const email = Email.create("example@email.com");

//should create user
test("should create user with correct data given", () => {
  expect(() => {
    User.create({ name, id, email });
  }).not.toThrow();
});

//reject invalid name or email

test("should reject with invalid name or invalid email", () => {
  expect(() => {
    User.create({ name: "", id, email });
  }).toThrow("Name is not valid");
  expect(() => {
    User.create({ name, id, email: Email.create("invalidEmail.com") });
  }).toThrow();
});
//user's properties can be updated & returned then
test("user can be updated", () => {
  const newUser = User.create({ name, id, email });
  expect(() => {
    newUser.updateProfile({
      name: "new name",
      email: Email.create("newEmail@mail.com"),
    });
  }).not.toThrow();
  expect(() => {
    newUser.updateProfile({
      name: "",
      email: Email.create("newEmail@gmail.com"),
    });
  }).toThrow("Name is not valid");
});
//user's name can be displayed
test("user's name can be displayed", () => {
  const newUser = User.create({ name, id, email });
  expect(newUser.getDisplayName()).toBe("Lorem Ipsum");
});
