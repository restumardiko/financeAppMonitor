import User from "../../../domain/entities/user.js";

export default async function updateUserProfile({ userRepository, userId, changes }) {
  if (!userId) {
    throw new Error("userId is required");
  }

  if (!changes || typeof changes !== "object") {
    throw new Error("Changes must be an object");
  }

  const currentUser = await userRepository.getById(userId);

  if (!currentUser) {
    throw new Error("User not found");
  }

  const user = new User({
    id: currentUser.id ?? userId,
    name: currentUser.name ?? "",
    email: currentUser.email ?? "",
    avatar: currentUser.avatar ?? null,
    createdAt: currentUser.createdAt ?? currentUser.created_at ?? null,
    updatedAt: currentUser.updatedAt ?? currentUser.updated_at ?? null,
    isActive: currentUser.isActive ?? currentUser.is_active ?? true,
    ...changes,
  });

  const updatedUser = await userRepository.update(userId, user.toJSON());

  return new User({
    id: updatedUser.id ?? user.id,
    name: updatedUser.name ?? user.name,
    email: updatedUser.email ?? user.email,
    avatar: updatedUser.avatar ?? user.avatar,
    createdAt: updatedUser.createdAt ?? updatedUser.created_at ?? user.createdAt,
    updatedAt: updatedUser.updatedAt ?? updatedUser.updated_at ?? user.updatedAt,
    isActive: updatedUser.isActive ?? updatedUser.is_active ?? user.isActive,
  });
}
