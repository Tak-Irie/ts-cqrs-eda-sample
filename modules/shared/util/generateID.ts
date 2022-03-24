import { ulid } from "ulid";

export const generateId = () => {
  return ulid();
};
