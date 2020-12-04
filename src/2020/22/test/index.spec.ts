import { expect } from "chai";
import {
  rawInput,
  parse,
  processPartOne,
  processPartTwo,
  Party,
} from "../index";

const part1sample1 = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

describe(`2020 - Day 22`, () => {
  describe("Functions", () => {
    it(`should have a line look like`, async () => {
      let party = new Party(parse(part1sample1));
      expect(party.playerOne).to.eql([9, 2, 6, 3, 1]);
      expect(party.playerTwo).to.eql([5, 8, 4, 7, 10]);
    });
  });

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput).length).to.equal(52);
      expect(parse(rawInput)[0].length).to.equal(9);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 306 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(306);
    });
    it(`[Part 2 - Sample 1] should return 291 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample1)).to.equal(291);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 32199 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(32199);
    });
    it(`[Part 2] should always return 33780 when using the input file`, async () => {
      expect(processPartTwo(rawInput)).to.equal(33780);
    });
  });
});
