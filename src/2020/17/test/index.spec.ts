import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo } from "../index";

const part1sample1 = `.#.
..#
###`;

describe(`2020 - Day 17`, () => {
  describe("Functions", () => {});

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput)[0]).to.equal("##......");
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 112 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1, 6)).to.equal(112);
    });
    it(`[Part 2 - Sample 1] should return 848 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample1, 6)).to.equal(848);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 306 when using the input file`, async () => {
      expect(processPartOne(rawInput, 6)).to.equal(306);
    });
    it(`[Part 2] should always return 2572 when using the input file`, async () => {
      expect(processPartTwo(rawInput, 6)).to.equal(2572);
    });
  });
});
