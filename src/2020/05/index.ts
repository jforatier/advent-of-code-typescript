import { readInput } from "./../../utils";

export const rawInput = readInput();

export enum Plane {
  Front = "F",
  Back = "B",
  Left = "L",
  Right = "R",
}

export class Row {
  min: number = 0;
  max: number = 127;
}

export class Column {
  min: number = 0;
  max: number = 7;
}

export class Position {
  rowLow: number = 0;
  rowHigh: number = 127;
  columnLow: number = 0;
  columnHigh: number = 7;
}

export const lowerHalf = (lower: number, upper: number): [number, number] => [
  lower,
  upper - (upper - lower + 1) / 2,
];
export const upperHalf = (lower: number, upper: number): [number, number] => [
  lower + (upper - lower + 1) / 2,
  upper,
];

export const getFunctionForLetter = (letter, position: Position): Position => {
  switch (letter) {
    case Plane.Front:
      [position.rowLow, position.rowHigh] = lowerHalf(
        position.rowLow,
        position.rowHigh
      );
      break;
    case Plane.Back:
      [position.rowLow, position.rowHigh] = upperHalf(
        position.rowLow,
        position.rowHigh
      );
      break;
    case Plane.Left:
      [position.columnLow, position.columnHigh] = lowerHalf(
        position.columnLow,
        position.columnHigh
      );
      break;
    case Plane.Right:
      [position.columnLow, position.columnHigh] = upperHalf(
        position.columnLow,
        position.columnHigh
      );
      break;
    default:
      console.log("Unknown letter" + letter);
  }
  return position;
};

export const getRow = (line: string): number => {
  let position = new Position();
  for (const letter of line) {
    position = getFunctionForLetter(letter, position);
  }
  return Math.min(position.rowLow, position.rowHigh);
};

export const getColumn = (line: string): number => {
  let position = new Position();
  for (const letter of line) {
    position = getFunctionForLetter(letter, position);
  }
  return Math.min(position.columnLow, position.columnHigh);
};

export const getSeatId = (line: string): number => {
  return getRow(line) * 8 + getColumn(line);
};

export const getIdOfMySeat = (input: string): number => {
  const seats: number[] = [];
  input.split(/\r?\n/).forEach((element) => {
    seats.push(getSeatId(element));
  });
  const remainingSeat: number[] = [];
  seats.forEach((element) => {
    if (!seats.includes(element + 1) && element < seats.length) {
      remainingSeat.push(element + 1);
    }
  });
  return remainingSeat[0];
};

export const parsePlaneMap = (input: string) =>
  input
    .split(/\r?\n/)
    .map((item) => getSeatId(item))
    .reduce((item, currentValue) => Math.max(item, currentValue));

export const processPartOne = (input: string): number => {
  return parsePlaneMap(input);
};

export const processPartTwo = (input: string): number => {
  return getIdOfMySeat(input);
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/05 - Part 1:", resultA); // -> 828
console.log("[Solution] 2020/05 - Part 2:", resultB); // -> 565
