import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo } from "../index";

const part1sample1 = `1 + 2 * 3 + 4 * 5 + 6`;
const part1sample2 = `1 + (2 * 3) + (4 * (5 + 6))`;
const part1sample3 = `2 * 3 + (4 * 5)`;
const part1sample4 = `5 + (8 * 3 + 9 + 3 * 4 * 3)`;
const part1sample5 = `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`;
const part1sample6 = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;

describe(`2020 - Day 18`, () => {
  describe("Functions", () => {});

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput).length).to.equal(374);
      expect(parse(rawInput)[0].length).to.equal(105);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 71 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(71);
    });
    it(`[Part 1 - Sample 2] should return 51 when using the sample 1`, async () => {
      expect(processPartOne(part1sample2)).to.equal(51);
    });
    it(`[Part 1 - Sample 3] should return 26 when using the sample 1`, async () => {
      expect(processPartOne(part1sample3)).to.equal(26);
    });
    it(`[Part 1 - Sample 4] should return 437 when using the sample 1`, async () => {
      expect(processPartOne(part1sample4)).to.equal(437);
    });
    it(`[Part 1 - Sample 5] should return 12240 when using the sample 1`, async () => {
      expect(processPartOne(part1sample5)).to.equal(12240);
    });
    it(`[Part 1 - Sample 6] should return 13632 when using the sample 1`, async () => {
      expect(processPartOne(part1sample6)).to.equal(13632);
    });
    it(`[Part 2 - Sample 1] should return 231 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample1)).to.equal(231);
    });
    it(`[Part 2 - Sample 2] should return 51 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample2)).to.equal(51);
    });
    it(`[Part 2 - Sample 3] should return 46 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample3)).to.equal(46);
    });
    it(`[Part 2 - Sample 4] should return 1445 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample4)).to.equal(1445);
    });
    it(`[Part 2 - Sample 5] should return 669060 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample5)).to.equal(669060);
    })
    it(`[Part 2 - Sample 6] should return 23340 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample6)).to.equal(23340);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 36382392389406 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(36382392389406);
    });
    it(`[Part 2] should always return 381107029777968 when using the input file`, async () => {
      expect(processPartTwo(rawInput)).to.equal(381107029777968);
    });
  });
});
