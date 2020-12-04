import { expect } from "chai";
import {
  rawInput,
  swithInstructionAt,
  Instruction,
  processPartOne,
  processPartTwo,
} from "../index";

const part1sample1 = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

describe(`2020 - Day 8`, () => {
  describe("swithInstructionAt", () => {
    it("should return jpm change", async () => {
      expect(
        swithInstructionAt(0, [
          { argument: 58, operation: "jmp" },
          { argument: -12, operation: "acc" },
        ])
      ).to.eql([
        { argument: 58, operation: "nop" },
        { argument: -12, operation: "acc" },
      ]);
    });

    it("should return nop changed", async () => {
      expect(
        swithInstructionAt(1, [
          { argument: 58, operation: "acc" },
          { argument: -12, operation: "nop" },
        ])
      ).to.eql([
        { argument: 58, operation: "acc" },
        { argument: -12, operation: "jmp" },
      ]);
    });
  });

  describe("parse", () => {
    it("acc -99 should return { operation: 'acc', argument: -99,}", async () => {
      expect(new Instruction("acc -99")).to.eql({
        operation: "acc",
        argument: -99,
      });
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should always return 5 when using the sample 1`, async () => {
      expect(await processPartOne(part1sample1)).to.equal(5);
    });
    it(`[Part 2 - Sample 1] should always return 8 when using the sample 1`, async () => {
      expect(await processPartTwo(part1sample1)).to.equal(8);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 1684 when using the input file`, async () => {
      expect(await processPartOne(rawInput)).to.equal(1684);
    });
    it(`[Part 2] should always return 2188 when using the input file`, async () => {
      expect(await processPartTwo(rawInput)).to.equal(2188);
    });
  });
});
