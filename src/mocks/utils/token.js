export const generateToken = (type = "access") =>
  `${type}_token-${Math.random().toString(36).slice(2)}`;
export const ACCESS_TTL = 50 * 1000; //5 detik
