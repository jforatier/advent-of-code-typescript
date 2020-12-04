import { expect } from "chai";
import {
  rawInput,
  processPartOne,
  processPartTwo,
} from "../index";

describe(`2020 - Day 6`, () => {
  describe("Response", () => {
    it(`[Part 1] should always return 6443 when using the input file`, async () => {
      expect(await processPartOne(rawInput)).to.equal(6443);
    });
    it(`[Part 2] should always return 3232 when using the input file`, async () => {
      expect(await processPartTwo(rawInput)).to.equal(3232);
    });
  });

});
