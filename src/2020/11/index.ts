import { readInput } from "./../../utils";

export const rawInput = readInput();

const OCCUPIED_SEAT: string = "#";
const EMPTY_SEAT: string = "L";
const FLOOR: string = ".";

export interface Coord {
  row: number;
  column: number;
}

export interface SeatStatus {
  row: number;
  column: number;
  isOccupied: boolean;
}

export class SeatChange {
  row: number;
  column: number;
  current: string;
  target: string;

  constructor(row: number, column: number, current: string, target: string) {
    this.row = row;
    this.column = column;
    this.current = current;
    this.target = target;
  }
}

export class Boat {
  places: string[];

  constructor(places: string[]) {
    this.places = places;
  }

  numOfAvailablePlaces = () => {
    let count = 0;
    this.places.forEach((element) => {
      count += element.split(OCCUPIED_SEAT).length - 1;
    });
    return count;
  };

  switchSeat = (row: number, column: number, value: string) => {
    if (column > this.places[row].length - 1) {
      console.log("Cannot switch seat");
    }
    let newValue =
      this.places[row].substring(0, column) +
      value +
      this.places[row].substring(column + 1);
    this.places[row] = newValue;
  };

  getNewSeatValue = (
    values: string[],
    row: number,
    column: number,
    currentValue: string,
    visibility: number,
    controller: (values: string[], row: number, column: number) => SeatStatus[]
  ) => {
    switch (currentValue) {
      case "L":
        if (
          controller(values, row, column).filter((item) => item.isOccupied)
            .length == 0
        ) {
          return OCCUPIED_SEAT;
        }
      case OCCUPIED_SEAT:
        if (
          controller(values, row, column).filter((item) => item.isOccupied)
            .length >= visibility
        ) {
          return EMPTY_SEAT;
        }
    }
    return currentValue;
  };

  aroundOccupied = (
    values: string[],
    row: number,
    column: number
  ): SeatStatus[] => {
    let coordsToCheck: Coord[] = [];
    let seatStatus: SeatStatus[] = [];
    coordsToCheck.push({ row: row - 1, column: column - 1 });
    coordsToCheck.push({ row: row - 1, column: column });
    coordsToCheck.push({ row: row - 1, column: column + 1 });
    coordsToCheck.push({ row: row, column: column - 1 });
    // coordsToCheck.set(row, column);
    coordsToCheck.push({ row: row, column: column + 1 });
    coordsToCheck.push({ row: row + 1, column: column - 1 });
    coordsToCheck.push({ row: row + 1, column: column });
    coordsToCheck.push({ row: row + 1, column: column + 1 });

    coordsToCheck.forEach((item) => {
      if (
        item.row >= 0 &&
        item.column >= 0 &&
        item.row < values.length &&
        values[item.row][item.column]
      ) {
        seatStatus.push({
          row: item.row,
          column: item.column,
          isOccupied: values[item.row][item.column] === OCCUPIED_SEAT,
        });
      }
    });
    return seatStatus;
  };

  applyChanges = (changesToDo: SeatChange[]) => {
    changesToDo.forEach((element) => {
      this.switchSeat(element.row, element.column, element.target);
    });
  };

  aroundVisible = (
    values: string[],
    row: number,
    column: number
  ): SeatStatus[] => {
    let seatStatus: SeatStatus[] = [];
    let direction = 0;

    while (direction < 8) {
      const deltaY = Math.round(Math.sin((Math.PI * direction) / 4));
      const deltaX = Math.round(Math.cos((Math.PI * direction) / 4));

      let step = 1;

      while (step <= Infinity) {
        const seat = values[row + step * deltaY]?.[column + step * deltaX];
        if (seat === OCCUPIED_SEAT) {
          seatStatus.push({
            row: row + step * deltaY,
            column: column + step * deltaX,
            isOccupied: true,
          });
          break;
        } else if (seat !== FLOOR) {
          break;
        }
        step += 1;
      }
      direction += 1;
    }
    return seatStatus;
  };

  scan = (
    visibility,
    controller: (values: string[], row: number, column: number) => SeatStatus[]
  ): number => {
    let changesToDo: SeatChange[] = [];
    for (let row = 0; row < this.places.length; row++) {
      for (let column = 0; column < this.places[row].length; column++) {
        changesToDo.push(
          new SeatChange(
            row,
            column,
            this.places[row][column],
            this.getNewSeatValue(
              [...this.places],
              row,
              column,
              this.places[row][column],
              visibility,
              controller
            )
          )
        );
      }
    }
    this.applyChanges(changesToDo);
    return changesToDo.filter((item) => item.current !== item.target).length;
  };

  toString = () => {
    let result = "";
    this.places.forEach((element) => {
      result = result.concat(element + "\n");
    });
    return result;
  };
}

export const parse = (input: string): string[] =>
  input.split(/\r?\n/).map((item) => item);

export const processPartOne = (input: string): number => {
  let boat = new Boat(parse(input));
  let scanResult: number = 100;
  do {
    scanResult = boat.scan(4, boat.aroundOccupied);
  } while (scanResult != 0);
  return boat.numOfAvailablePlaces();
};

export const processPartTwo = (input: string): number => {
  let boat = new Boat(parse(input));
  let scanResult: number = 100;
  do {
    scanResult = boat.scan(5, boat.aroundVisible);
  } while (scanResult != 0);
  return boat.numOfAvailablePlaces();
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/11 - Part 1:", resultA); // -> 2113
console.log("[Solution] 2020/11 - Part 2:", resultB); // -> 1865
