export default async function logout({ userRepository, userId }) {
  const logout = await userRepository.logout(userId);
  return logout;
}
