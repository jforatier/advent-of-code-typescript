import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo } from "../index";

const part1sample1 = `5764801
17807724`;

describe(`2020 - Day 25`, () => {
  describe("Functions", () => {});

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput).length).to.equal(2);
      expect(parse(rawInput)[0]).to.equal(19241437);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 14897079 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(14897079);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 12181021 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(12181021);
    });
  });
});
