import { readFileSync } from "fs";
import * as getCallerFile from "get-caller-file";

export const readInput = () => {
  const file = getCallerFile().replace("index.ts", "input.txt");

  return readFileSync(file).toString();
};
