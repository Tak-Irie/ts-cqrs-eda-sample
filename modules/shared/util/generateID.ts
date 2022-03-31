import { ulid } from "ulid";
import { v4 } from "uuid";

export const generateULID = () => {
  return ulid();
};

export const generateUUIDv4 = () => {
  return v4();
};
