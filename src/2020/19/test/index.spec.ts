import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo, Message } from "../index";

const part1sample1 = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`;

describe(`2020 - Day 19`, () => {
  describe("Functions", () => {
  });

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput).length).to.equal(613);
      expect(parse(rawInput)[0].length).to.equal(17);
    });
  });

  describe("Sample", () => {
    it(`[Part 2 - Sample 1] should return 848 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(2);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 241 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(241);
    });
    it(`[Part 2] should always return 424 when using the input file`, async () => {
      expect(processPartTwo(rawInput)).to.equal(424);
    });
  });
});
