import { expect } from "chai";
import { rawInput, processPartOne, processPartTwo } from "../index";

const part1sample1 = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

describe(`2020 - Day 9`, () => {
  
  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should always return 127 when using the sample 1`, async () => {
      expect(await processPartOne(part1sample1, 5)).to.equal(127);
    });
    it(`[Part 2 - Sample 1] should always return 62 when using the sample 1`, async () => {
      expect(await processPartTwo(part1sample1, 5)).to.equal(62);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 1930745883 when using the input file`, async () => {
      expect(await processPartOne(rawInput, 25)).to.equal(1930745883);
    });
    it(`[Part 2] should always return 268878261 when using the input file`, async () => {
      expect(await processPartTwo(rawInput, 25)).to.equal(268878261);
    });
  });
});
