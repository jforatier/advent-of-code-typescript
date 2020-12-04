import { readInput } from "./../../utils";

export const rawInput = readInput();

export class Cup {
  value: number;
  next?: Cup;

  constructor(value: number, next?: Cup) {
    this.value = value;
    this.next = next;
  }
}

export class Game {
  cups: number[];

  constructor(value: string[]) {
    this.cups = value[0].split("").map((round) => parseInt(round, 10));
  }

  generateCups = (numOfCups: number) => {
    const cups = [];
    const cupsMax = Math.max(...this.cups);
    for (let index = 0; index < numOfCups; index++) {
      cups.push(`${cupsMax + index}`);
    }
    this.cups = cups[0].split("").map((round) => parseInt(round, 10));
  };

  generateStack = (input: number[]) => {
    const result = new Map<number, Cup>();
    let min = Infinity;
    let max = -Infinity;
    let previous;

    const cups = input.map((value) => {
      const cup: Cup = new Cup(value, null);
      if (previous) {
        previous.next = cup;
      }
      previous = cup;
      result.set(cup.value, cup);

      if (value > max) {
        max = value;
      } else if (value < min) {
        min = value;
      }

      return cup;
    });
    cups[cups.length - 1].next = cups[0];

    return { cups: result, min, max };
  };

  play = (rounds: number = 100) => {
    const { cups, min, max } = this.generateStack(this.cups);
    let currentCup = cups.get(this.cups[0])!;

    let round = 0;
    while (round < rounds) {
      round++;
      const threeNextCups = [
        currentCup.next,
        currentCup.next.next,
        currentCup.next.next.next,
      ];

      const lastCup = threeNextCups[threeNextCups.length - 1];
      currentCup.next = lastCup.next;

      let destCupCandidate = currentCup.value - 1;
      while (
        !cups.has(destCupCandidate) ||
        threeNextCups.find((c) => c.value === destCupCandidate)
      ) {
        destCupCandidate--;

        if (destCupCandidate < min) {
          destCupCandidate = max;
        }
      }

      const destinationCup = cups.get(destCupCandidate);
      const afterInsertCup = destinationCup.next;
      destinationCup.next = threeNextCups[0];
      threeNextCups[threeNextCups.length - 1].next = afterInsertCup;
      currentCup = currentCup.next;
    }

    return cups;
  };

  getLabel = (cups: Map<number, Cup>): string => {
    const cupOne = cups.get(1)!;
    let label = "";
    let current: Cup = cupOne;

    while (current.next !== cupOne) {
      current = current.next;
      label += current.value;
    }
    return label;
  };

  getCupFinalists = (cups: Map<number, Cup>): number => {
    const cupOne = cups.get(1)!;
    let current: Cup = cupOne;

    while (current.next !== cupOne) {
      current = current.next;
    }

    const productOfNextTwo = cupOne.next.value * cupOne.next.next.value;

    return productOfNextTwo;
  };
}

export const parse = (input: string): string[] => input.split(/\r?\n/);

export const processPartOne = (input: string, moves: number): string => {
  const game = new Game(parse(input));
  return game.getLabel(game.play(moves));
};

export const processPartTwo = (input: string, moves: number): number => {
  const game = new Game(parse(input));
  game.generateCups(10000000);
  return game.getCupFinalists(game.play(moves));
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput, 100);
// const resultB = processPartTwo(rawInput, 10000000); // Too Long :-(
console.timeEnd("Time");

console.log("[Solution] 2020/23 - Part 1:", resultA); // -> 97245386
// console.log("[Solution] 2020/23 - Part 2:", resultB); // -> 156180332979
