import { readInput } from "./../../utils";

const rawInput = readInput();
export const input = rawInput.split("\n").map(Number);

export const sumMake2020 = (
  firsValue: number,
  secondValue: number,
  thirdValue?: number
): boolean => {
  if (thirdValue) {
    return firsValue + secondValue + thirdValue === 2020;
  }
  return firsValue + secondValue === 2020;
};

export const find2020with2 = (input: number[]) => {
  let result = 0;
  input.forEach((value) => {
    input.forEach((value2) => {
      if (sumMake2020(value, value2)) {
        result = value * value2;
      }
    });
  });
  return result;
};

export const find2020with3 = (input: number[]): number => {
  let result = 0;
  input.forEach((value) => {
    input.forEach((value2) => {
      input.forEach((value3) => {
        if (sumMake2020(value, value2, value3)) {
          result = value * value2 * value3;
        }
      });
    });
  });
  return result;
};

/* Results */

console.time("Time");
const resultA = find2020with2(input);
const resultB = find2020with3(input);
console.timeEnd("Time");

console.log("[Solution] 2020/01 - Part 1:", resultA); // -> 1006176
console.log("[Solution] 2020/01 - Part 2:", resultB); // -> 199132160
