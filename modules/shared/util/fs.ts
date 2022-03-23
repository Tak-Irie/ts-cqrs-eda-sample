import { readFile } from "fs/promises";

export const readFileWithFallback = (filePath: string, fallback: string) =>
  readFile(filePath, "utf-8").catch(() => fallback);
