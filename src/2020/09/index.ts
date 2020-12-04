import { readInput } from "./../../utils";

export const rawInput = readInput();

export class Preamble {
  values: number[] = [];
  max: number;

  constructor(input: number[], max: number) {
    this.values = input;
    this.max = max;
  }

  getNotFoundValue = () => {
    for (let i = this.max; i < this.values.length; i++) {
      if (!this.isValid(this.values, Math.max(i - this.max, 0), i)) {
        return this.values[i];
      }
    }
  };

  getWeakness = (): number => {
    const notFoundValue: number = this.getNotFoundValue();
    let result: number = 0;

    for (let i = 0; i < this.values.length; i++) {
      for (let j = i + 2; j < this.values.length; j++) {
        const contiguousArray = this.values.slice(i, j);
        if (contiguousArray.reduce((a, b) => a + b, 0) === notFoundValue) {
          result = Math.min(...contiguousArray) + Math.max(...contiguousArray);
          break;
        }
      }
    }
    return result;
  };

  isValid = (values: number[], start: number, stop: number) => {
    const actual = values[stop];
    for (let i = start; i < stop; i++) {
      for (let j = i + 1; j <= stop; j++) {
        if (values[i] + values[j] === actual) {
          return true;
        }
      }
    }
    return false;
  };
}

export const parse = (input: string): number[] =>
  input.split(/\r?\n/).map((item) => parseInt(item));

export const processPartOne = (input: string, preambleMax: number): number => {
  let preamble: Preamble = new Preamble(parse(input), preambleMax);
  return preamble.getNotFoundValue();
};

export const processPartTwo = (input: string, preambleMax: number): number => {
  let preamble: Preamble = new Preamble(parse(input), preambleMax);
  return preamble.getWeakness();
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput, 25);
const resultB = processPartTwo(rawInput, 25);
console.timeEnd("Time");

console.log("[Solution] 2020/09 - Part 1:", resultA); // -> 1930745883
console.log("[Solution] 2020/09 - Part 2:", resultB); // -> 268878261
