import { readInput } from "./../../utils";

export const rawInput = readInput();

function encryptLoop({
  loopSize = Infinity,
  subjectNumber,
  searchValue,
}: {
  subjectNumber: number;
  loopSize?: number;
  searchValue?: number;
}) {
  let loop = 0;
  let value = 1;

  while (loop < loopSize) {
    loop++;
    value *= subjectNumber;
    value %= 20201227;

    if (searchValue && value === searchValue) {
      return { loopSize: loop, value };
    }
  }

  return {
    loopSize,
    value,
  };
}

export function findEncryptionKey(cardKey: number, doorKey: number) {
  const door = encryptLoop({ subjectNumber: 7, searchValue: doorKey });
  const encryptionKey = encryptLoop({
    subjectNumber: cardKey,
    loopSize: door.loopSize,
  });

  return encryptionKey.value;
}

export const parse = (input: string): number[] =>
  input.split(/\r?\n/).map((value) => parseInt(value));

export const processPartOne = (input: string): number => {
  return findEncryptionKey(parse(input)[0], parse(input)[1]);
};

export const processPartTwo = (input: string): number => {
  return 0;
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/25 - Part 1:", resultA); // -> 12181021
console.log("[Solution] 2020/25 - Part 2:", resultB); // -> 33780
