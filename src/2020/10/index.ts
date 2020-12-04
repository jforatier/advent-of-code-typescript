import { readInput } from "./../../utils";

export const rawInput = readInput();

const builtInAdapterMax: number = 3;

export class BagOfAdapter {
  values: number[];

  constructor(values: number[]) {
    this.values = this.orderedValues(values);
    this.values.push(this.lastCompatibleAdapterValue());
  }

  includes = (value: number) => {
    return this.values.includes(value);
  };

  orderedValues = (values: number[]): number[] => {
    return values.map((a) => +a).sort((a, b) => a - b);
  };

  lastCompatibleAdapterValue = (): number => {
    return Math.max(...this.values) + builtInAdapterMax;
  };

  getDifference = (): Map<number, number> => {
    let current = 0;
    const diffs = new Map();
    for (let adapter of this.values) {
      const diff = adapter - current;
      current = adapter;
      let cnt = diffs[diff];
      if (!cnt) {
        cnt = 0;
      }
      diffs[diff] = cnt + 1;
    }
    return diffs;
  };
}

export const parse = (input: string): number[] =>
  input.split(/\r?\n/).map((item) => parseInt(item));

export const processPartOne = (input: string, param: number[]): number => {
  let bag: BagOfAdapter = new BagOfAdapter(parse(input));
  const diffs: Map<number, number> = bag.getDifference();
  return diffs[param[0]] * diffs[param[1]];
};

export const processPartTwo = (input: string, param: number[]): number => {
  let bag: BagOfAdapter = new BagOfAdapter(parse(input));
  const adapters = [...bag.values, bag.lastCompatibleAdapterValue()];
  const steps: Map<number, BagOfAdapter> = new Map();
  steps[1] = adapters.includes(1) ? 1 : 0;
  steps[2] = adapters.includes(2) ? steps[1] + 1 : 0;
  steps[3] = adapters.includes(3) ? steps[1] + steps[2] + 1 : 0;
  for (let j = 4; j <= bag.lastCompatibleAdapterValue(); j++) {
    steps[j] = adapters.includes(j)
      ? steps[j - 1] + steps[j - 2] + steps[j - 3]
      : 0;
  }
  return steps[bag.lastCompatibleAdapterValue()];
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput, [1, 3]);
const resultB = processPartTwo(rawInput, [1, 3]);
console.timeEnd("Time");

console.log("[Solution] 2020/10 - Part 1:", resultA); // -> 2346
console.log("[Solution] 2020/10 - Part 2:", resultB); // -> 6044831973376
