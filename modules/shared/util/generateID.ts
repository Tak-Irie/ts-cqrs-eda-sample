import { ulid } from "ulid";

export const generateID = () => {
  return ulid();
};
