import { readInput } from "./../../utils";

export const rawInput = readInput();

class Coord {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

enum Direction {
  NORTH = "N",
  SOUTH = "S",
  EAST = "E",
  WEST = "W",
}
const DirectionsSorted: Direction[] = [
  Direction.NORTH,
  Direction.EAST,
  Direction.SOUTH,
  Direction.WEST,
];

enum Action {
  NORTH = "N",
  SOUTH = "S",
  EAST = "E",
  WEST = "W",
  LEFT = "L",
  RIGHT = "R",
  FORWARD = "F",
}

export class Move {
  action: Action;
  value: number;

  constructor(line: string) {
    this.action = line.substring(0, 1) as Action;
    this.value = parseInt(line.substring(1, line.length), 10);
  }
}

export class Boat {
  instructions: Move[];
  position: Coord;
  waypoint: Coord;
  direction: Direction;

  constructor(instructions: Move[]) {
    this.instructions = instructions;
    this.position = new Coord(0, 0);
    this.waypoint = new Coord(10, -1);
    this.direction = Direction.EAST;
  }

  moveWaypoint = (move: Move) => {
    switch (move.action) {
      case Action.NORTH:
        this.waypoint.y -= move.value;
        break;
      case Action.SOUTH:
        this.waypoint.y += move.value;
        break;
      case Action.EAST:
        this.waypoint.x += move.value;
        break;
      case Action.WEST:
        this.waypoint.x -= move.value;
        break;
      case Action.LEFT:
        {
          let turns = move.value / 90;
          while (turns) {
            this.waypoint = {
              x: this.waypoint.y * 1,
              y: this.waypoint.x * -1,
            };
            turns--;
          }
        }
        break;
      case Action.RIGHT:
        {
          let turns = move.value / 90;
          while (turns) {
            this.waypoint = {
              x: this.waypoint.y * -1,
              y: this.waypoint.x * 1,
            };
            turns--;
          }
        }
        break;
      case Action.FORWARD:
        this.position.x += this.waypoint.x * move.value;
        this.position.y += this.waypoint.y * move.value;
        break;
      default:
        throw Error("unknown action: " + move.action);
    }
  };

  move = (move: Move) => {
    let dirPos;
    switch (move.action) {
      case Action.NORTH:
        this.position.y -= move.value;
        break;
      case Action.SOUTH:
        this.position.y += move.value;
        break;
      case Action.EAST:
        this.position.x += move.value;
        break;
      case Action.WEST:
        this.position.x -= move.value;
        break;
      case Action.LEFT:
        dirPos =
          (DirectionsSorted.indexOf(this.direction) - move.value / 90) %
          DirectionsSorted.length;
        this.direction =
          DirectionsSorted[
            dirPos >= 0 ? dirPos : DirectionsSorted.length + dirPos
          ];
        break;
      case Action.RIGHT:
        dirPos =
          (DirectionsSorted.indexOf(this.direction) + move.value / 90) %
          DirectionsSorted.length;
        this.direction =
          DirectionsSorted[
            dirPos >= 0 ? dirPos : DirectionsSorted.length + dirPos
          ];
        break;
      case Action.FORWARD:
        this.move({
          action: this.direction.toString() as Action,
          value: move.value,
        });
        break;
      default:
        throw Error("unknown action: " + move.action);
    }
  };
}

export const parse = (input: string): Move[] =>
  input.split(/\r?\n/).map((item) => new Move(item));

export const processPartOne = (input: string): number => {
  let boat = new Boat(parse(input));
  for (const instr of boat.instructions) {
    boat.move(instr);
  }
  return Math.abs(boat.position.x) + Math.abs(boat.position.y);
};

export const processPartTwo = (input: string): number => {
  let boat = new Boat(parse(input));
  for (const instr of boat.instructions) {
    boat.moveWaypoint(instr);
  }
  return Math.abs(boat.position.x) + Math.abs(boat.position.y);
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/12 - Part 1:", resultA); // -> 420
console.log("[Solution] 2020/12 - Part 2:", resultB); // -> 42073
