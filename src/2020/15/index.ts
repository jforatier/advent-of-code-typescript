import { readInput } from "./../../utils";

export const rawInput = readInput();

export class Value {
  value: number;
  firstSpokenTurn: number = 0;
  lastSpokenTurn: number;

  constructor(value: number, turn: number) {
    this.value = value;
    this.firstSpokenTurn = turn;
    this.lastSpokenTurn = undefined;
  }
  speak(turn) {
    this.lastSpokenTurn = turn;
  }
}

export class Game {
  startingNumber: number[] = [];
  values: Map<number, Value> = new Map(); // <value,Value>
  lastSpokenValue: number = 0;

  spokenValues = {}; // <turn,spoken_value> -- Part Two Migrage Map<number, number> to {} :-) https://stackoverflow.com/a/63620501

  constructor(startingNumbers: number[]) {
    this.startingNumber = startingNumbers;
  }

  getResult = (index: number, value: number): number => {
    const currentValue = this.values.get(value);
    let result = 0;
    if (currentValue) {
      if (!currentValue.lastSpokenTurn) {
        result = 0;
      } else {
        result = currentValue.firstSpokenTurn - currentValue.lastSpokenTurn;
      }
    } else {
      result = 0;
      this.values.set(
        this.lastSpokenValue,
        new Value(this.lastSpokenValue, index)
      );
    }
    return result;
  };

  getValueAt(duration: number): number {
    return this.spokenValues[duration];
  }

  run(duration: number) {
    for (let index = 1; index <= duration + 1; index++) {
      if (index <= this.startingNumber.length) {
        this.lastSpokenValue = this.startingNumber[index - 1];
        this.values.set(
          this.lastSpokenValue,
          new Value(this.lastSpokenValue, index)
        );
        continue;
      }

      let result: number = this.getResult(index, this.lastSpokenValue);

      const response = this.values.get(result);
      if (response) {
        response.lastSpokenTurn = response.firstSpokenTurn;
        response.firstSpokenTurn = index;
      } else {
        this.values.set(result, new Value(result, index));
      }

      this.lastSpokenValue = result;
      this.spokenValues[index] = result;
    }
  }
}

export const parse = (input: string): number[] =>
  input.split(",").map((item) => parseInt(item, 10));

export const processPartOne = (input: string, duration: number): number => {
  let game = new Game(parse(input));
  game.run(duration);
  return game.getValueAt(duration);
};

export const processPartTwo = (input: string, duration: number): number => {
  let game = new Game(parse(input));
  game.run(duration);
  return game.getValueAt(duration);
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput, 2020);
const resultB = processPartTwo(rawInput, 30000000);
console.timeEnd("Time");

console.log("[Solution] 2020/15 - Part 1:", resultA); // -> 1325
console.log("[Solution] 2020/15 - Part 2:", resultB); // -> 59006
