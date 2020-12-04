import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo, Document } from "../index";

const part1sample1 = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

const part2sample1 = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
7,3,47
3,9,18
15,1,5
5,14,9`;

describe(`2020 - Day 16`, () => {
  describe("Functions", () => {
  });

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(new Document(rawInput).rules.length).to.equal(20);
      expect(new Document(rawInput).yourTickets.length).to.equal(20);
      expect(new Document(rawInput).nearbyTickets.length).to.equal(240);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 71 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(71);
    });
    it(`[Part 2 - Sample 1] should return 1716 when using the sample 1`, async () => {
      expect(processPartTwo(part2sample1)).to.equal(1716);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 23115 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(23115);
    });
    it(`[Part 2] should always return 239727793813 when using the input file`, async () => {
      expect(processPartTwo(rawInput)).to.equal(239727793813);
    });
  });
});
