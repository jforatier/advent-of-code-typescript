import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo } from "../index";

const part1sample1 = `R8,U5,L5,D3
U7,R6,D4,L4`;
const part1sample2 = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`;
const part1sample3 = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;

describe(`2019 - Day 3`, () => {
  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput)[0].length).to.equal(1462);
      expect(parse(rawInput)[1].length).to.equal(1476);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 6 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(6);
    });
    it(`[Part 1 - Sample 2] should return 6 when using the sample 1`, async () => {
      expect(processPartOne(part1sample2)).to.equal(159);
    });
    it(`[Part 1 - Sample 3] should return 6 when using the sample 1`, async () => {
      expect(processPartOne(part1sample3)).to.equal(135);
    });
    it(`[Part 2 - Sample 1] should return 30 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample1)).to.equal(30);
    });
    it(`[Part 2 - Sample 2] should return 610 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample2)).to.equal(610);
    });
    it(`[Part 2 - Sample 3] should return 410 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample3)).to.equal(410);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 258 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(258);
    });
    it(`[Part 2] should always return 12304 when using the input file`, async () => {
      expect(processPartTwo(rawInput)).to.equal(12304);
    });
  });
});
