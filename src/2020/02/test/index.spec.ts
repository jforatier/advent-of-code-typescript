import { expect } from "chai";
import {
  rawInput,
  atLeastAtMostValid,
  atLeastAtMostOnce,
  processPartOne,
  processPartTwo,
} from "../index";

describe(`2020 - Day 2`, () => {
  describe("atLeastAtMostValid", () => {
    it("should return true whith input '1-3 a: abcde'", async () => {
      expect(
        await atLeastAtMostValid("abcde", {
          atLeast: 1,
          atMost: 3,
          letter: "a",
        })
      ).to.equal(true);
    });
    it("should return false whith input '1-3 b: cdefg'", async () => {
      expect(
        await atLeastAtMostValid("cdefg", {
          atLeast: 1,
          atMost: 3,
          letter: "b",
        })
      ).to.equal(false);
    });
    it("should return true whith input '2-9 c: ccccccccc'", async () => {
      expect(
        await atLeastAtMostValid("ccccccccc", {
          atLeast: 2,
          atMost: 9,
          letter: "c",
        })
      ).to.equal(true);
    });
  });

  describe("atLeastAtMostOnce", () => {
    it("should return true whith input '1-3 a: abcde'", async () => {
      expect(
        await atLeastAtMostOnce("abcde", { atLeast: 1, atMost: 3, letter: "a" })
      ).to.equal(true);
    });
    it("should return false whith input '1-3 b: cdefg'", async () => {
      expect(
        await atLeastAtMostOnce("cdefg", { atLeast: 1, atMost: 3, letter: "b" })
      ).to.equal(false);
    });
    it("should return false whith input '2-9 c: ccccccccc'", async () => {
      expect(
        await atLeastAtMostOnce("ccccccccc", {
          atLeast: 2,
          atMost: 9,
          letter: "c",
        })
      ).to.equal(false);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 383 when using the input file`, async () => {
      expect(await processPartOne(rawInput.split("\n").map(String))).to.equal(
        383
      );
    });
    it(`[Part 2] should always return 272 when using the input file`, async () => {
      expect(await processPartTwo(rawInput.split("\n").map(String))).to.equal(
        272
      );
    });
  });
});
