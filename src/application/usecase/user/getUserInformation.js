import User from "../../../domain/entities/user.js";

export default async function getUserInformation({ userRepository, userId }) {
  if (!userId) {
    throw new Error("userId is required");
  }

  const data = await userRepository.getById(userId);

  if (!data) {
    throw new Error("User not found");
  }

  return new User({
    id: data.id ?? userId,
    name: data.name ?? data.full_name ?? "",
    email: data.email ?? "",
    avatar: data.avatar ?? data.avatar_url ?? null,
    createdAt: data.createdAt ?? data.created_at ?? null,
    updatedAt: data.updatedAt ?? data.updated_at ?? null,
    isActive: data.isActive ?? data.is_active ?? true,
  });
}
