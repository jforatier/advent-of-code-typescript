import { readInput } from "./../../utils";

export const rawInput = readInput();

export class Party {
  playerOne: number[] = [];
  playerTwo: number[] = [];

  constructor(lines: string[]) {
    let isPlayerOne: boolean = false;
    lines.forEach((element) => {
      if (element.includes("Player 1:")) {
        isPlayerOne = true;
      } else if (element.includes("Player 2:")) {
        isPlayerOne = false;
      } else {
        if (isPlayerOne) {
          this.playerOne.push(parseInt(element, 10));
        } else {
          this.playerTwo.push(parseInt(element, 10));
        }
      }
    });
  }

  play = () => {
    do {
      const player1Card = this.playerOne.shift();
      const player2Card = this.playerTwo.shift();

      if (player1Card > player2Card) {
        this.playerOne.push(player1Card);
        this.playerOne.push(player2Card);
      } else if (player2Card > player1Card) {
        this.playerTwo.push(player2Card);
        this.playerTwo.push(player1Card);
      }
    } while (this.playerOne.length && this.playerTwo.length);
  };

  playRecursive = (playerOne: number[], playerTwo: number[]): number => {
    const playedCards = new Set();

    do {
      const currentCards = `${playerOne.join(",")} ${playerTwo.join(",")}`;
      if (+playedCards.has(currentCards) | +playedCards.add(currentCards))
        return 0;

      const playerOneCard = playerOne.shift();
      const playerTwoCard = playerTwo.shift();
      const winner = Number(
        playerOne.length >= playerOneCard && playerTwo.length >= playerTwoCard
          ? this.playRecursive(
              playerOne.slice(0, playerOneCard),
              playerTwo.slice(0, playerTwoCard)
            )
          : playerOneCard < playerTwoCard
      );

      [playerOne, playerTwo][winner].push(
        [playerOneCard, playerTwoCard][winner],
        [playerOneCard, playerTwoCard][winner ^ 1]
      );
    } while (playerOne.length && playerTwo.length);

    return playerOne.length ? 0 : 1;
  };

  result = (): number => {
    const winnerDeck =
      this.playerOne.length === 0 ? this.playerTwo : this.playerOne;
    return winnerDeck
      .map((acc, index) => acc * (winnerDeck.length - index))
      .reduce((prev, curr) => prev + curr);
  };
}

export const parse = (input: string): string[] =>
  input.split(/\r?\n/).filter((line) => !!line);

export const processPartOne = (input: string): number => {
  const party = new Party(parse(input));
  party.play();
  return party.result();
};

export const processPartTwo = (input: string): number => {
  const party = new Party(parse(input));
  party.playRecursive(party.playerOne, party.playerTwo);
  return party.result();
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/22 - Part 1:", resultA); // -> 32199
console.log("[Solution] 2020/22 - Part 2:", resultB); // -> 33780
