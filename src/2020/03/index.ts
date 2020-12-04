import { readInput } from "./../../utils";

export const rawInput = readInput();

export interface Rule {
  atLeast: number;
  atMost: number;
  letter: string;
}

export const EMPTY = ".";
export const TREE = "#";

export interface Position {
  x: number;
  y: number;
}

class Map {
  map: string[];

  constructor(lines: string[]) {
    this.map = lines;
  }

  valueAt = (position: Position) => {
    return this.map[position.y][position.x];
  };

  countValue = (value: string, positions: Position[]) => {
    let result = 0;
    positions.forEach((element) => {
      if (this.valueAt(element) === value) {
        result++;
      }
    });
    return result;
  };

  toString = () => {
    let result = "";
    this.map.forEach((element) => {
      result = result.concat("\n").concat(element);
    });
    return result;
  };
}

class Movement {
  direction: string; // "L" | "R" | "U" | "D";
  move: number;

  constructor(item: string) {
    this.direction = item.substring(0, 1);
    this.move = parseInt(item.substring(1, item.length));
  }

  getNewPosition(previousPosition: Position): Position {
    let position = previousPosition;
    switch (this.direction) {
      case "L":
        position.x = position.x - this.move;
        break;
      case "R":
        position.x = position.x + this.move;
        break;
      case "D":
        position.y = position.y + this.move;
        break;
      case "U":
        position.y = position.y - this.move;
        break;
    }
    return position;
  }
}

export const getNumberOfTrees = (lines: string[]): number => {
  let map: Map = new Map(lines);
  let moves: Movement[] = [new Movement("R3"), new Movement("D1")];
  return sail(map, lines.length, moves);
};

export const getNumberOfTreesWithSlope = (
  lines: string[],
  slope: String
): number => {
  let map: Map = new Map(lines);
  let moves: Movement[] = [
    new Movement(slope.substring(0, 2)),
    new Movement(slope.substring(2, 4)),
  ];
  return sail(map, lines.length, moves);
};

export const sail = (map: Map, size: number, movements: Movement[]) => {
  let count = map.countValue("#", getPositionForMovements(movements, size));
  return count;
};

const getPositionForMovements = (
  movements: Movement[],
  size: number
): Position[] => {
  let positions: Position[] = [];
  let previousPosition = { x: 0, y: 0 };
  for (let index = 0; index < size - 1; index++) {
    movements.forEach((element) => {
      previousPosition = element.getNewPosition(previousPosition);
    });
    if (previousPosition.y < size + 1) {
      positions.push({ x: previousPosition.x, y: previousPosition.y });
    }
  }
  return positions;
};

export const processPartOne = (input: string): number => {
  let lines: string[] = input.split(/\r?\n/);
  for (let i = 0; i < 7; i++) {
    for (let index = 0; index < lines.length; index++) {
      lines[index] = lines[index] + lines[index];
    }
  }
  return getNumberOfTrees(lines);
};

export const processPartTwo = (input: string): number => {
  let lines: string[] = input.split(/\r?\n/);
  for (let i = 0; i < 7; i++) {
    for (let index = 0; index < lines.length; index++) {
      lines[index] += lines[index] + lines[index];
    }
  }
  const slopes = ["R1D1", "R3D1", "R5D1", "R7D1", "R1D2"];
  return slopes.reduce(
    (acc, slope) => acc * getNumberOfTreesWithSlope(lines, slope),
    1
  );
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/03 - Part 1:", resultA); // -> 211
console.log("[Solution] 2020/03 - Part 2:", resultB); // -> 3584591857
