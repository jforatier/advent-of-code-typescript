import { expect } from "chai";
import {
  rawInput,
  parse,
  processPartOne,
  processPartTwo,
  BagOfAdapter,
} from "../index";

const part1sample1 = `16
10
15
5
1
11
7
19
6
12
4`;

const part1sample2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

describe(`2020 - Day 10`, () => {
  describe("Functions", () => {
    it(`getDifference should return { '1': 7, '3': 5 }`, async () => {
      expect(
        new BagOfAdapter(
          part1sample1.split(/\r?\n/).map((item) => parseInt(item))
        ).getDifference()[1]
      ).to.equal(7);
    });
  });

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput)[0]).to.equal(153);
    });
  });

  describe("Sample 2", () => {
    it(`[Part 1 - Sample 1] should return 27 when using the sample 1 with a difference of 1`, async () => {
      expect(await processPartOne(part1sample1, [1, 3])).to.equal(35);
    });
    it(`[Part 1 - Sample 2] should return 22 when using the sample 2 with a difference of 1`, async () => {
      expect(await processPartOne(part1sample2, [1, 3])).to.equal(220);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 2346 when using the input file`, async () => {
      expect(await processPartOne(rawInput, [1, 3])).to.equal(2346);
    });
    it(`[Part 2] should always return 6044831973376 when using the input file`, async () => {
      expect(await processPartTwo(rawInput, [1, 3])).to.equal(6044831973376);
    });
  });
});
