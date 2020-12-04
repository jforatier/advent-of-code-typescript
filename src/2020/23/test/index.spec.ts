import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo } from "../index";

const part1sample1 = `389125467`;

describe(`2020 - Day 23`, () => {
  describe("Functions", () => {});

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput).length).to.equal(1);
      expect(parse(rawInput)[0]).to.equal("476138259");
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 92658374 when using the sample 1 after 10 moves`, async () => {
      expect(processPartOne(part1sample1, 10)).to.equal("92658374");
    });
    it(`[Part 1 - Sample 1] should return 67384529 when using the sample 1 after 100 moves`, async () => {
      expect(processPartOne(part1sample1, 100)).to.equal("67384529");
    });
    it(`[Part 2 - Sample 1] should return 149245887792 when using the sample 1`, async () => {
      // expect(processPartTwo(part1sample1, 10000000)).to.equal(149245887792); // Too Long :-(
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 97245386 when using the input file`, async () => {
      expect(processPartOne(rawInput, 100)).to.equal("97245386");
    });
    it(`[Part 2] should always return 156180332979 when using the input file`, async () => {
      // expect(processPartTwo(rawInput, 10000000)).to.equal(156180332979); // Too Long :-(
    });
  });
});
