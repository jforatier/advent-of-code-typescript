import { readInput } from "./../../utils";

export const rawInput = readInput();

interface Position {
  x: number;
  y: number;
}

const movements: Map<string, Position> = new Map();
movements.set("R", { x: 1, y: 0 });
movements.set("U", { x: 0, y: 1 });
movements.set("L", { x: -1, y: 0 });
movements.set("D", { x: 0, y: -1 });

function getWireMap(wire: string): Set<string> {
  const map = new Set<string>();

  let moves = wire.split(",");
  let x = 0;
  let y = 0;
  let i = 0;
  while (i < moves.length) {
    const move = moves[i];
    const position = movements.get(move.charAt(0)) as Position;
    const len = Number(move.substr(1));
    for (let m = 0; m < len; m++) {
      x += position.x;
      y += position.y;

      map.add(`${x}, ${y}`);
    }
    i++;
  }
  return map;
}

function getIntersectionList(wire: string, map: Set<string>): Set<string> {
  const intersections = new Set<string>();

  let moves = wire.split(",");
  let x = 0;
  let y = 0;
  let i = 0;
  while (i < moves.length) {
    const move = moves[i];
    const dir = movements.get(move.charAt(0)) as Position;
    const len = Number(move.substr(1));
    for (let m = 0; m < len; m++) {
      x += dir.x;
      y += dir.y;

      const location = `${x}, ${y}`;
      if (map.has(location)) {
        intersections.add(location);
      }
    }
    i++;
  }

  return intersections;
}

function simpleDist(xy: string): number {
  return xy
    .split(",")
    .map((v) => Math.abs(Number(v)))
    .reduce((a, v) => a + v, 0);
}

const getDistance = (firstCoords: string, secondCoords: string): number => {
  const map = getWireMap(firstCoords);
  const intersections = getIntersectionList(secondCoords, map);

  const iArray = Array.from(intersections.values());

  return iArray.reduce((a, v) => {
    const d = simpleDist(v);
    return d < a ? d : a;
  }, simpleDist(iArray[0]));
};

function findSteps(
  wire: string,
  intersections: Set<string>
): Map<string, number> {
  const steps = new Map<string, number>();

  let moves = wire.split(",");
  let x = 0;
  let y = 0;
  let i = 0;
  let stepCount = 0;
  while (i < moves.length) {
    const move = moves[i];
    const dir = movements.get(move.charAt(0)) as Position;
    const len = Number(move.substr(1));
    for (let m = 0; m < len; m++) {
      x += dir.x;
      y += dir.y;
      stepCount++;

      const location = `${x}, ${y}`;
      if (intersections.has(location) && !steps.has(location)) {
        steps.set(location, stepCount);
      }
    }
    i++;
  }

  return steps;
}

function findFewestSteps(firstCoords: string, secondCoords: string): number {
  const map = getWireMap(firstCoords);
  const intersections = getIntersectionList(secondCoords, map);

  const steps1 = findSteps(firstCoords, intersections);
  const steps2 = findSteps(secondCoords, intersections);

  return Array.from(intersections.values()).reduce((a, v) => {
    const stepTotal = (steps1.get(v) as number) + (steps2.get(v) as number);
    return stepTotal < a ? stepTotal : a;
  }, 100000000);
}

export const parse = (input: string): string[] => input.split(/\r?\n/);

export const processPartOne = (input: string): number => {
  return getDistance(parse(input)[0], parse(input)[1]);
};

export const processPartTwo = (input: string): number => {
  return findFewestSteps(parse(input)[0], parse(input)[1]);
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2019/03 - Part 1:", resultA); // -> 258
console.log("[Solution] 2019/03 - Part 2:", resultB); // -> 12304
