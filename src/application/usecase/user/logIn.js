export default async function login({ userRepository, payload }) {
  const login = await userRepository.login(payload);
  return login;
}
