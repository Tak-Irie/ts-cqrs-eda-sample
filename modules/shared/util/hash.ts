import * as argon2 from "argon2";

const hashString = async (raw: string) => {
  const hashed = await argon2.hash(raw);
  return hashed;
};

const verifyHashedString = async (raw: string, hashed: string) => {
  const result = await argon2.verify(hashed, raw);
  return result;
};

export { hashString, verifyHashedString };
