import { expect } from "chai";
import {
  rawInput,
  parse,
  processPartOne,
  processPartTwo,
  Instruction,
  Mask,
  Program,
} from "../index";

const part1sample1 = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

const part2sample1 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

describe(`2020 - Day 14`, () => {
  describe("Functions", () => {
    it(`apply should write value 73 with mask XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X and value 11`, async () => {
      let value = 0b000000000000000000000000000000001011; //  (decimal 11)
      let mask: Mask = new Mask("mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X");
      let result = 0b000000000000000000000000000001001001; //  (decimal 73)
      expect(mask.apply(value)).to.equal(result);
    });
    it(`apply should write value 101 with mask XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X and value 101`, async () => {
      let value = 0b000000000000000000000000000001100101; //  (decimal 101)
      let mask: Mask = new Mask("mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X");
      let result = 0b000000000000000000000000000001100101; //  (decimal 101)
      expect(mask.apply(value)).to.equal(result);
    });
    it(`apply should write value 0 with mask XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X and value 64`, async () => {
      let value = 0b000000000000000000000000000000001011; //  (decimal 11)
      let mask: Mask = new Mask("mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X");
      let result = 0b000000000000000000000000000001001001; //  (decimal 73)
      expect(mask.apply(value)).to.equal(result);
    });
    it(`applyWithDecoder should write value [26, 27, 58, 59] with mask 000000000000000000000000000000X1001X and value 42`, async () => {
      let value = 0b000000000000000000000000000000101010; //  (decimal 42)
      let mask: Mask = new Mask("mask = 000000000000000000000000000000X1001X");
      let result = [26, 27, 58, 59];
      expect(mask.applyWithDecoder(value)).to.eql(result);
    });
    it(`applyWithDecoder should write value [16, 17, 18, 19, 24, 25, 26, 27] with mask 00000000000000000000000000000000X0XX and value 26`, async () => {
      let value = 0b000000000000000000000000000000011010; //  (decimal 26)
      let mask: Mask = new Mask("mask = 00000000000000000000000000000000X0XX");
      let result = [16, 17, 18, 19, 24, 25, 26, 27];
      expect(mask.applyWithDecoder(value)).to.eql(result);
    });
  });

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput)[0]).to.equal(
        "mask = 00101X10011X0X111110010X010011X10101"
      );
      expect(parse(rawInput)[1]).to.equal("mem[41248] = 4595332");
    });
    it(`should have mask line look like`, async () => {
      expect(
        new Mask("mask = 00101X10011X0X111110010X010011X10101").mask
      ).to.equal("00101X10011X0X111110010X010011X10101");
    });
    it(`should have instruction line look like`, async () => {
      expect(new Instruction("mem[8] = 11").position).to.equal(8);
      expect(new Instruction("mem[8] = 11").value).to.equal(11);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 165 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(165);
    });
    it(`[Part 2 - Sample 1] should return 208 when using the sample 2`, async () => {
      expect(processPartTwo(part2sample1)).to.equal(208);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 10717676595607 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(10717676595607);
    });
    it(`[Part 2] should always return 3974538275659 when using the input file`, async () => {
      expect(processPartTwo(rawInput)).to.equal(3974538275659);
    });
  });
});
