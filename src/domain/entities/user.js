export default class User {
  constructor({
    id,
    name = "",
    email = "",
    avatar = null,
    createdAt = null,
    updatedAt = null,
    isActive = true,
  }) {
    this.id = id ?? this.generateId();
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.createdAt = createdAt ?? new Date().toISOString();
    this.updatedAt = updatedAt ?? this.createdAt;
    this.isActive = isActive;
  }

  updateProfile({ name, email, avatar }) {
    if (name !== undefined) this.name = name;
    if (email !== undefined) this.email = email;
    if (avatar !== undefined) this.avatar = avatar;

    this.updatedAt = new Date().toISOString();
    return this;
  }

  setActive(isActive) {
    this.isActive = isActive;
    this.updatedAt = new Date().toISOString();
    return this;
  }

  getDisplayName() {
    return this.name?.trim() || this.email?.split("@")[0] || "User";
  }

  getInitials() {
    const name = this.name?.trim() || this.email || "User";
    const words = name.split(/\s+/).filter(Boolean);

    if (words.length === 0) return "U";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }

  isValid() {
    return Boolean(this.name?.trim() && this.email?.trim());
  }

  toJSON() {
    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isActive: this.isActive,
    };
  }
}
