import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo } from "../index";

const part1sample1 = `F10
N3
F7
R90
F11`;

describe(`2020 - Day 12`, () => {
  describe("Functions", () => {});

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput)[0].action).to.equal("F");
      expect(parse(rawInput)[0].value).to.equal(99);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 25 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(25);
    });
    it(`[Part 2 - Sample 1] should return 286 when using the sample 2`, async () => {
      expect(processPartTwo(part1sample1)).to.equal(286);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 420 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(420);
    });
    it(`[Part 2] should always return 42073 when using the input file`, async () => {
      expect(processPartTwo(rawInput)).to.equal(42073);
    });
  });
});
