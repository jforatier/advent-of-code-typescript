import { readInput } from "./../../utils";

export const rawInput = readInput();

const SEA_MONSTER: string[] = [
  "                  # ",
  "#    ##    ##    ###",
  " #  #  #  #  #  #   ",
];

export class Tile {
  id: number;
  data: string[];

  constructor(id: number, data: string[]) {
    this.id = id;
    this.data = data;
  }

  getTopEdge(): string {
    return this.data[0];
  }

  getBottomEdge(): string {
    return this.data.slice(-1)[0];
  }

  getLeftEdge(): string {
    return this.data.map((line) => line[0]).join("");
  }

  getRightEdge(): string {
    return this.data.map((line) => line.slice(-1)[0]).join("");
  }

  getEdges(): string[] {
    return [
      this.getTopEdge(),
      this.getBottomEdge(),
      this.getLeftEdge(),
      this.getRightEdge(),
    ];
  }

  rotate() {
    this.data = rotateGrid(this.data);
  }

  flipVertically() {
    this.data = flipGridVertically(this.data);
  }

  flipHorizontally() {
    this.data = flipGridHorizontally(this.data);
  }
}

export class Carte {
  tiles: Tile[] = [];
  constructor(data: string[]) {
    for (let index = 0; index < data.length; index++) {
      let line = data[index];

      if (line.startsWith("Tile ")) {
        let grid: string[] = [];
        let id = +line.slice(5, -1);
        index++;

        for (; index < data.length && data[index].length > 0; index++) {
          grid.push(data[index]);
        }

        this.tiles.push(new Tile(id, grid));
      }
    }
  }

  getEdgeMap = (): Map<string, number[]> => {
    let map = new Map<string, number[]>();
    for (const tile of this.tiles) {
      let edges = tile.getEdges();
      for (let edge of edges) {
        addEdgeToMap(map, edge, tile.id);
        addEdgeToMap(map, reverseString(edge), tile.id);
      }
    }
    return map;
  };
  getCorner = (): Tile | undefined => {
    let corner: Tile | undefined = undefined;
    for (const tile of this.tiles) {
      let neighborsCount = tile
        .getEdges()
        .filter((e) => this.getEdgeMap().get(e)!.length == 2).length;

      if (neighborsCount === 2) {
        corner = tile;
      }
    }
    return corner;
  };

  generateMap = (): string[] => {
    let gridSize = Math.sqrt(this.tiles.length);
    let map: string[] = [];

    let tiles = new Map<number, Tile>();
    for (const tile of this.tiles) {
      tiles.set(tile.id, tile);
    }

    let topLeft = this.getCorner()!;
    while (!isTopLeftCorner(topLeft, this.getEdgeMap())) {
      topLeft.rotate();
    }

    let tileSize = topLeft.data.length;
    let anchor = topLeft;

    for (let i = 0; i < gridSize; i++) {
      let mapChunk: string[] = [];

      for (let x = 0; x < tileSize - 2; x++) {
        mapChunk.push("");
      }

      let cursor = anchor;
      for (let j = 0; j < gridSize; j++) {
        for (let row = 1; row < tileSize - 1; row++) {
          mapChunk[row - 1] += cursor.data[row].slice(1, -1);
        }

        if (j !== gridSize - 1) {
          cursor = getTileOnRight(cursor, this.getEdgeMap(), tiles);
        }
      }

      map.push(...mapChunk);
      if (i !== gridSize - 1) {
        anchor = getTileOnBottom(anchor, this.getEdgeMap(), tiles);
      }
    }
    return map;
  };

  multiplyEdges = (): number => {
    let result = 1;
    for (const tile of this.tiles) {
      let neighbors = tile
        .getEdges()
        .filter((e) => this.getEdgeMap().get(e)!.length == 2).length;

      if (neighbors === 2) {
        result *= tile.id;
      }
    }
    return result;
  };

  countRoughness = (map: string[]): number => {
    let result = 0;
    let hashes = countChars(map, "#");

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 2; j++) {
        let monsters = countSeaMonsters(map);
        if (monsters > 0) {
          result = hashes - countChars(SEA_MONSTER, "#") * monsters;
        }
        map = flipGridVertically(map);
      }
      map = rotateGrid(map);
    }
    return result;
  };
}

function rotateGrid(data: string[]): string[] {
  let result: string[] = [];
  for (let col = data.length - 1; col >= 0; col--) {
    result.push(data.map((line) => line[col]).join(""));
  }
  return result;
}

function flipGridVertically(data: string[]): string[] {
  return data.reverse();
}

function flipGridHorizontally(data: string[]): string[] {
  return data.map((row) => reverseString(row));
}

function addEdgeToMap(
  edges: Map<string, number[]>,
  edge: string,
  tileId: number
) {
  let list = edges.get(edge);
  if (!list) {
    edges.set(edge, []);
    list = edges.get(edge)!;
  }
  list.push(tileId);
}

function reverseString(str: string): string {
  return str.split("").reverse().join("");
}

function match(val1: string, val2: string): boolean {
  return val1 === val2 || val1 === reverseString(val2);
}

function isTopLeftCorner(tile: Tile, map: Map<string, number[]>): boolean {
  return (
    map.get(tile.getTopEdge())!.length === 1 &&
    map.get(tile.getLeftEdge())!.length === 1
  );
}

function getTileOnRight(
  tile: Tile,
  edges: Map<string, number[]>,
  map: Map<number, Tile>
): Tile {
  let right = tile.getRightEdge();
  let pair = edges.get(right)!;
  let neighborTile = map.get(tile.id == pair[0] ? pair[1] : pair[0])!;
  while (!match(right, neighborTile.getLeftEdge())) {
    neighborTile.rotate();
  }
  if (right !== neighborTile.getLeftEdge()) {
    neighborTile.flipVertically();
  }
  return neighborTile;
}

function getTileOnBottom(
  tile: Tile,
  edges: Map<string, number[]>,
  map: Map<number, Tile>
): Tile {
  let bottom = tile.getBottomEdge();
  let pair = edges.get(bottom)!;
  let neighborTile = map.get(tile.id == pair[0] ? pair[1] : pair[0])!;
  while (!match(bottom, neighborTile.getTopEdge())) {
    neighborTile.rotate();
  }
  if (bottom !== neighborTile.getTopEdge()) {
    neighborTile.flipHorizontally();
  }
  return neighborTile;
}

function countSeaMonsters(grid: string[]): number {
  let count = 0;
  for (let row = 0; row < grid.length - SEA_MONSTER.length; row++) {
    for (let col = 0; col < grid[row].length - SEA_MONSTER[0].length; col++) {
      let allMatch = true;
      for (let sr = 0; allMatch && sr < SEA_MONSTER.length; sr++) {
        for (let sc = 0; sc < SEA_MONSTER[sr].length; sc++) {
          if (SEA_MONSTER[sr][sc] === "#" && grid[row + sr][col + sc] !== "#") {
            allMatch = false;
            break;
          }
        }
      }
      if (allMatch) {
        count++;
      }
    }
  }

  return count;
}

function countChars(grid: string[], char: string): number {
  return grid
    .map((str) => str.split("").filter((ch) => ch === char).length)
    .reduce((acc, v) => acc + v);
}

export const parse = (input: string): string[] => input.split(/\r?\n/);

export const processPartOne = (input: string): number => {
  let map: Carte = new Carte(parse(input));
  return map.multiplyEdges();
};

export const processPartTwo = (input: string): number => {
  let map: Carte = new Carte(parse(input));
  let completeMap = map.generateMap();
  return map.countRoughness(completeMap);
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/20 - Part 1:", resultA); // -> 140656720229539
console.log("[Solution] 2020/20 - Part 2:", resultB); // -> 1885
