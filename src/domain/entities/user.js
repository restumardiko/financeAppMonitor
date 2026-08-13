import Email from "../valueObjects/email";
export default class User {
  #id;
  #name;
  #email;
  #createdAt;
  constructor({ id, name, email }) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#createdAt = new Date().toISOString();
  }

  static create({ id, name, email }) {
    if (!id) {
      throw new Error("Invalid id");
    }
    if (!name || name.length < 3) {
      throw new Error("Name is not valid");
    }
    if (!(email instanceof Email)) {
      throw new Error("Email is not valid");
    }
    return new User({ id, name, email });
  }

  updateProfile({ name, email }) {
    if (!name || name.length < 3) {
      throw new Error("Name is not valid");
    }
    if (!(email instanceof Email)) {
      throw new Error("Email is not valid");
    }
    this.#name = name;
    this.#email = email;
    return this;
  }

  getDisplayName() {
    return (
      this.#name?.trim() || this.#email.validEmail?.split("@")[0] || "User"
    );
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email.validEmail,
      createdAt: this.#createdAt,
    };
  }
}
