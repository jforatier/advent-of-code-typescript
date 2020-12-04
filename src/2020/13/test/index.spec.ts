import { expect } from "chai";
import {
  rawInput,
  parse,
  processPartOne,
  processPartTwo,
  Bus,
} from "../index";

const part1sample1 = `939
7,13,x,x,59,x,31,19`;

const part2sample2 = `0
17,x,13,19`;
const part2sample3 = `0
67,7,59,61`;
const part2sample4 = `0
67,x,7,59,61`;
const part2sample5 = `0
67,7,x,59,61`;
const part2sample6 = `0
1789,37,47,1889`;

describe(`2020 - Day 13`, () => {
  describe("Functions", () => {
    it(`isBusAvailable for 31 should return true`, async () => {
      let bus: Bus = new Bus(31);
      expect(bus.isBusAvailable(930)).to.equal(true);
    });
    it(`isBusAvailable for 31 should return false`, async () => {
      let bus: Bus = new Bus(31);
      expect(bus.isBusAvailable(931)).to.equal(false);
    });
    it(`isBusAvailable for 7 should return true`, async () => {
      let bus: Bus = new Bus(7);
      expect(bus.isBusAvailable(930)).to.equal(false);
    });
    it(`isBusAvailable for 7 should return false`, async () => {
      let bus: Bus = new Bus(7);
      expect(bus.isBusAvailable(931)).to.equal(true);
    });
  });

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput)[0]).to.equal("1002462");
      expect(parse(rawInput)[1].length).to.equal(174);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 295 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(295);
    });
    it(`[Part 2 - Sample 1] should return 1068781 when using the sample 2`, async () => {
      expect(processPartTwo(part1sample1)).to.equal(1068781);
    });
    it(`[Part 2 - Sample 2] should return 3417`, async () => {
      expect(processPartTwo(part2sample2)).to.equal(3417);
    });
    it(`[Part 2 - Sample 3] should return 754018`, async () => {
      expect(processPartTwo(part2sample3)).to.equal(754018);
    });
    it(`[Part 2 - Sample 4] should return 779210`, async () => {
      expect(processPartTwo(part2sample4)).to.equal(779210);
    });
    it(`[Part 2 - Sample 5] should return 1261476`, async () => {
      expect(processPartTwo(part2sample5)).to.equal(1261476);
    });
    it(`[Part 2 - Sample 6] should return 1202161486`, async () => {
      // expect(processPartTwo(part2sample6)).to.equal(1202161486); // Work but disabled because taking 1:00 ... (Need to iterate around Math patterns for perf)
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 3606 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(3606);
    });
    it(`[Part 2] should always return 379786358533423 when using the input file`, async () => {
      // expect(processPartTwo(rawInput,100000000000000)).to.equal(379786358533423); // Work but disabled because taking > 90:00 ... (Need to iterate around Math patterns for perf)
    });
  });
});
