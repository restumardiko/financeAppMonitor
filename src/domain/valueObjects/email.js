export default class Email {
  #validEmail;

  constructor(email) {
    this.#validEmail = email;
  }

  static create(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
    if (!isValidEmail) {
      throw new Error("the email format is not correct");
    }
    return new Email(value);
  }
  get validEmail() {
    return this.#validEmail;
  }
}
