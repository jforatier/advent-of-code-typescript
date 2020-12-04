import { readInput } from "./../../utils";

export const rawInput = readInput();

export class Bus {
  busId: number;
  waitTime: number;
  firstDeparture: number = 0;

  constructor(busId: number, firstDeparture?: number) {
    this.busId = busId;
    this.firstDeparture = firstDeparture;
  }

  isBusAvailable = (timeStamp: number): boolean => {
    return timeStamp % this.busId == 0;
  };
}

export class Notes {
  timestamp: number = 0; // [number of minutes] : earliest timestamp you could depart on a bus
  timeDiff: number = 0;
  rawBusIds: string[] = [];
  availableBusId: Bus[] = [];

  constructor(timestamp: number, rawBusIds: string[]) {
    this.timestamp = timestamp;
    this.rawBusIds = rawBusIds;
    this.rawBusIds.forEach((element) => {
      if (element !== "x") {
        this.availableBusId.push(new Bus(parseInt(element, 10), this.timeDiff));
      }
      this.timeDiff++;
    });
    this.timeDiff--; // remove last iteration
  }

  findFirstTimestampWithAllBusInSameRange = (offset?:number): number => {
    let timestamp = offset ? offset : 1;
    let busInRange: Bus[] = [];
    do {
      busInRange = this.availableBusId.filter((bus) =>
        bus.isBusAvailable(timestamp + bus.firstDeparture)
      );
      timestamp++;
    } while (busInRange.length < this.availableBusId.length);
    return timestamp - 1;
  };

  isAfter = (bus: Bus) => {
    return this.availableBusId.indexOf(bus);
  };

  getEarliestBus(): Bus[] {
    let busArrived: Bus[] = [];
    let currentTimeDiff: number = this.timestamp;
    do {
      this.availableBusId.forEach((bus) => {
        if (bus.isBusAvailable(currentTimeDiff)) {
          bus.waitTime = currentTimeDiff - this.timestamp;
          busArrived.push(bus);
        }
      });
      currentTimeDiff++;
    } while (busArrived.length === 0);
    return busArrived;
  }
}

export const parse = (input: string): string[] => input.split(/\r?\n/);

export const processPartOne = (input: string): number => {
  let notes = new Notes(
    parseInt(parse(input)[0], 10),
    parse(input)[1].split(",")
  );
  const firstArrivedBus = notes.getEarliestBus()[0];
  return firstArrivedBus.busId * firstArrivedBus.waitTime;
};

export const processPartTwo = (input: string, offset?: number): number => {
  let notes = new Notes(
    parseInt(parse(input)[0], 10),
    parse(input)[1].split(",")
  );
  return notes.findFirstTimestampWithAllBusInSameRange(offset);
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
// const resultB = processPartTwo(rawInput, 100000000000000);
console.timeEnd("Time");

console.log("[Solution] 2020/13 - Part 1:", resultA); // -> 3606
// console.log("[Solution] 2020/13 - Part 2:", resultB); // -> 379786358533423 // Work but disabled because taking > 90:00 ... (Need to iterate around Math patterns for perf)
