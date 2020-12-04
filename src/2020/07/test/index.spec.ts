import { expect } from "chai";
import { rawInput, processPartOne, processPartTwo } from "../index";

const part1sample1 = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const part2sample1 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

describe(`2020 - Day 7`, () => {
  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should always return 4 when using the sample 1`, async () => {
      expect(await processPartOne(part1sample1)).to.equal(4);
    });
    it(`[Part 2 - Sample 1] should always return 126 when using the sample 1`, async () => {
      expect(await processPartTwo(part2sample1)).to.equal(126);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 155 when using the input file`, async () => {
      expect(await processPartOne(rawInput)).to.equal(155);
    });
    it(`[Part 2] should always return 54803 when using the input file`, async () => {
      expect(await processPartTwo(rawInput)).to.equal(54803);
    });
  });
});
