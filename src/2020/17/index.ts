import { readInput } from "./../../utils";

export const rawInput = readInput();

export enum State {
  INACTIVE = ".",
  ACTIVE = "#",
}

type Cubes = Map<string, string>;

const parseInput = (input: string[], newDim: boolean): Cubes => {
  const field = input.map((line) => line.split(""));
  const cubes = new Map();

  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if (field[y][x] === State.ACTIVE) {
        if (newDim) {
          cubes.set([x, y, 0, 0].join(","), field[y][x]);
        } else {
          cubes.set([x, y, 0].join(","), field[y][x]);
        }
      }
    }
  }

  return cubes;
};

const getNeighbours = (ignoreSelf: boolean): [number, number, number][] => {
  const neighbours: [number, number, number][] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (ignoreSelf && x === 0 && y === 0 && z === 0) {
          continue;
        }
        neighbours.push([x, y, z]);
      }
    }
  }

  return neighbours;
};

const getNeighboursTwo = (
  ignoreSelf: boolean
): [number, number, number, number][] => {
  const neighbours: [number, number, number, number][] = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        for (let w = -1; w <= 1; w++) {
          if (ignoreSelf && x === 0 && y === 0 && z === 0 && w === 0) {
            continue;
          }

          neighbours.push([x, y, z, w]);
        }
      }
    }
  }

  return neighbours;
};

const expand = (cubes: Cubes): Cubes => {
  const newCubes = new Map(cubes);
  const neighbours = getNeighbours(false);

  for (const [key] of cubes) {
    const [x, y, z] = key.split(",").map((pos) => parseInt(pos));
    for (const [nX, nY, nZ] of neighbours) {
      const newPos = [x + nX, y + nY, z + nZ].join(",");
      newCubes.set(newPos, cubes.get(newPos) || State.INACTIVE);
    }
  }

  return newCubes;
};

const expandTwo = (cubes: Cubes): Cubes => {
  const newCubes = new Map(cubes);
  const neighbours = getNeighboursTwo(false);

  for (const [key] of cubes) {
    const [x, y, z, w] = key.split(",").map((pos) => parseInt(pos));
    for (const [nX, nY, nZ, nW] of neighbours) {
      const newPos = [x + nX, y + nY, z + nZ, w + nW].join(",");
      newCubes.set(newPos, cubes.get(newPos) || State.INACTIVE);
    }
  }

  return newCubes;
};

const reduce = (cubes: Cubes): Cubes => {
  const newCubes = new Map();

  for (const [key, value] of cubes) {
    if (value === State.ACTIVE) {
      newCubes.set(key, value);
    }
  }

  return newCubes;
};

const run = (cube: Cubes): Cubes => {
  const targetCubes = expand(cube);
  const newCubes = new Map(targetCubes);
  const neighbours = getNeighbours(true);

  for (const [key, value] of targetCubes) {
    const [x, y, z] = key.split(",").map((pos) => parseInt(pos));
    const active = neighbours
      .map(([nX, nY, nZ]) => {
        return cube.get([x + nX, y + nY, z + nZ].join(",")) || State.INACTIVE;
      })
      .filter((s) => s === State.ACTIVE).length;

    if (value === State.ACTIVE) {
      newCubes.set(
        key,
        active === 2 || active === 3 ? State.ACTIVE : State.INACTIVE
      );
    } else {
      newCubes.set(key, active === 3 ? State.ACTIVE : State.INACTIVE);
    }
  }

  return reduce(newCubes);
};

const runTwo = (cubes: Cubes): Cubes => {
  const targetCubes = expandTwo(cubes);
  const newCubes = new Map(targetCubes);
  const neighbours = getNeighboursTwo(true);

  for (const [key, value] of targetCubes) {
    const [x, y, z, w] = key.split(",").map((pos) => parseInt(pos));
    const active = neighbours
      .map(([nX, nY, nZ, nW]) => {
        return (
          cubes.get([x + nX, y + nY, z + nZ, w + nW].join(",")) ||
          State.INACTIVE
        );
      })
      .filter((s) => s === State.ACTIVE).length;

    if (value === State.ACTIVE) {
      newCubes.set(
        key,
        active === 2 || active === 3 ? State.ACTIVE : State.INACTIVE
      );
    } else {
      newCubes.set(key, active === 3 ? State.ACTIVE : State.INACTIVE);
    }
  }

  return reduce(newCubes);
};

export const parse = (input: string): string[] => input.split(/\r?\n/);

export const processPartOne = (input: string, cycles: number): number => {
  let cubes = parseInput(parse(input), false);
  for (let i = 0; i < cycles; i++) {
    cubes = run(cubes);
  }
  return cubes.size;
};

export const processPartTwo = (input: string, cycles: number): number => {
  let cubes = parseInput(parse(input), true);
  for (let i = 0; i < cycles; i++) {
    cubes = runTwo(cubes);
  }
  return cubes.size;
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput, 6);
const resultB = processPartTwo(rawInput, 6);
console.timeEnd("Time");

console.log("[Solution] 2020/17 - Part 1:", resultA); // -> 306
console.log("[Solution] 2020/17 - Part 2:", resultB); // -> 2572
