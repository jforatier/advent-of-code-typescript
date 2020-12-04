import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo } from "../index";

const part1sample1 = `0,3,6`;
const part1sample2 = `1,3,2`;
const part1sample3 = `2,1,3`;
const part1sample4 = `1,2,3`;
const part1sample5 = `2,3,1`;
const part1sample6 = `3,2,1`;
const part1sample7 = `3,1,2`;

describe(`2020 - Day 15`, () => {
  describe("Functions", () => {
  });

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput)[0]).to.equal(19);
      expect(parse(rawInput)[1]).to.equal(20);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 436 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1, 2020)).to.equal(436);
    });
    it(`[Part 1 - Sample 2] should return 1 when using the sample 1`, async () => {
      expect(processPartOne(part1sample2, 2020)).to.equal(1);
    });
    it(`[Part 1 - Sample 3] should return 10 when using the sample 1`, async () => {
      expect(processPartOne(part1sample3, 2020)).to.equal(10);
    });
    it(`[Part 1 - Sample 4] should return 27 when using the sample 1`, async () => {
      expect(processPartOne(part1sample4, 2020)).to.equal(27);
    });
    it(`[Part 1 - Sample 5] should return 78 when using the sample 1`, async () => {
      expect(processPartOne(part1sample5, 2020)).to.equal(78);
    });
    it(`[Part 1 - Sample 6] should return 438 when using the sample 1`, async () => {
      expect(processPartOne(part1sample6, 2020)).to.equal(438);
    });
    it(`[Part 1 - Sample 7] should return 1836 when using the sample 1`, async () => {
      expect(processPartOne(part1sample7, 2020)).to.equal(1836);
    });

    it(`[Part 2 - Sample 1] should return 436 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1, 30000000)).to.equal(175594);
    });
    it(`[Part 2 - Sample 2] should return 1 when using the sample 1`, async () => {
      expect(processPartOne(part1sample2, 30000000)).to.equal(2578);
    });
    it(`[Part 2 - Sample 3] should return 10 when using the sample 1`, async () => {
      expect(processPartOne(part1sample3, 30000000)).to.equal(3544142);
    });
    it(`[Part 2 - Sample 4] should return 27 when using the sample 1`, async () => {
      expect(processPartOne(part1sample4, 30000000)).to.equal(261214);
    });
    it(`[Part 2 - Sample 5] should return 78 when using the sample 1`, async () => {
      expect(processPartOne(part1sample5, 30000000)).to.equal(6895259);
    });
    it(`[Part 2 - Sample 6] should return 438 when using the sample 1`, async () => {
      expect(processPartOne(part1sample6, 30000000)).to.equal(18);
    });
    it(`[Part 2 - Sample 7] should return 1836 when using the sample 1`, async () => {
      expect(processPartOne(part1sample7, 30000000)).to.equal(362);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 1325 when using the input file`, async () => {
      expect(processPartOne(rawInput, 2020)).to.equal(1325);
    });
    it(`[Part 2] should always return 59006 when using the input file`, async () => {
      expect(processPartOne(rawInput, 30000000)).to.equal(59006);
    });
  });
});
