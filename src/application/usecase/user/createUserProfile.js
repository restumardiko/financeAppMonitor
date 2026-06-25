import User from "../../../domain/entities/user.js";

export default async function createUserProfile({ userRepository, payload }) {
  if (!payload) {
    throw new Error("Payload is required");
  }

  const user = new User(payload);

  if (!user.isValid()) {
    throw new Error("Name and email are required");
  }

  if (typeof userRepository.getByEmail === "function") {
    const existingUser = await userRepository.getByEmail(user.email);

    if (existingUser) {
      throw new Error("User already exists");
    }
  }

  const createdUser = await userRepository.create(user.toJSON());

  return new User({
    id: createdUser.id ?? user.id,
    name: createdUser.name ?? user.name,
    email: createdUser.email ?? user.email,
    avatar: createdUser.avatar ?? user.avatar,
    createdAt: createdUser.createdAt ?? createdUser.created_at ?? user.createdAt,
    updatedAt: createdUser.updatedAt ?? createdUser.updated_at ?? user.updatedAt,
    isActive: createdUser.isActive ?? createdUser.is_active ?? user.isActive,
  });
}
