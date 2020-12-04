import { readInput } from "./../../utils";

export const rawInput = readInput();

class Coord {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add = (coord: Coord) => {
    return new Coord(this.x + coord.x, this.y + coord.y);
  };
}

const Directions = {
  e: new Coord(1, 0),
  w: new Coord(-1, 0),
  ne: new Coord(0.5, -0.5),
  nw: new Coord(-0.5, -0.5),
  se: new Coord(0.5, 0.5),
  sw: new Coord(-0.5, 0.5),
};

class Floor {
  tiles: Coord[][] = [];

  constructor(input: string[]) {
    this.tiles = input
      .map((line) =>
        Array.from(line.matchAll(/e|w|nw|sw|ne|se/g)).map((m) => m[0])
      )
      .map((directions) =>
        directions.map((d) => Directions[d] || new Coord(0, 0))
      );
  }

  getBlackTiles = (): Set<string> => {
    const blackTiles = new Set<string>();

    for (const directions of this.tiles) {
      const tile = directions.reduce((r, l) => r.add(l));
      const key = `${tile.x},${tile.y}`;
      if (blackTiles.has(key)) {
        blackTiles.delete(key);
      } else {
        blackTiles.add(key);
      }
    }

    return blackTiles;
  };

  getLivingArtResult = (blackTiles: Set<string>): Set<string> => {
    let result: Set<string> = blackTiles;
    for (let day = 1; day <= 100; day++) {
      let valuesToCheck = [...result.values()];
      let remainingTiles = new Map();

      valuesToCheck.forEach((blackTile) => {
        const [xTile, yTile] = blackTile.split(",").map(Number);
        Object.values(Directions).forEach((coord) => {
          const tilePos = [xTile + coord.x, yTile + coord.y].toString();
          remainingTiles.set(tilePos, (remainingTiles.get(tilePos) ?? 0) + 1);
        });
      });

      result = [...remainingTiles.entries()].reduce(
        (filtered, [tile, count]) =>
          count === 2 || (result.has(tile) && count === 1)
            ? filtered.add(tile)
            : filtered,
        new Set() as Set<string>
      );
    }
    return result;
  };
}

export const parse = (input: string): string[] => input.split(/\r?\n/);

export const processPartOne = (input: string): number => {
  const floor = new Floor(parse(input));
  return floor.getBlackTiles().size;
};

export const processPartTwo = (input: string): number => {
  const floor = new Floor(parse(input));
  return floor.getLivingArtResult(floor.getBlackTiles()).size;
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/24 - Part 1:", resultA); // -> 244
console.log("[Solution] 2020/24 - Part 2:", resultB); // -> 3665
