import { expect } from "chai";
import {
  rawInput,
  getRow,
  getColumn,
  getSeatId,
  processPartOne,
  processPartTwo,
} from "../index";

describe(`2020 - Day 5`, () => {
  describe("readOnBoardPass method", () => {
    const line1 = "FBFBBFFRLR"
    const line2 = "BFFFBBFRRR"
    const line3 = "FFFBBBFRRR"
    const line4 = "BBFFBBFRLL"
    describe("getRow", () => {
      it("FBFBBFFRLR should return 44", async () => {
        expect(getRow(line1)).to.equal(44);
      });
      it("BFFFBBFRRR should return 70", async () => {
        expect(getRow(line2)).to.equal(70);
      });
      it("FFFBBBFRRR should return 14", async () => {
        expect(getRow(line3)).to.equal(14);
      });
      it("BBFFBBFRLL should return 102", async () => {
        expect(getRow(line4)).to.equal(102);
      });
    });

    describe("getColumn", () => {
      it("FBFBBFFRLR should return 5", async () => {
        expect(getColumn(line1)).to.equal(5);
      });
      it("BFFFBBFRRR should return 7", async () => {
        expect(getColumn(line2)).to.equal(7);
      });
      it("FFFBBBFRRR should return 7", async () => {
        expect(getColumn(line3)).to.equal(7);
      });
      it("BBFFBBFRLL should return 4", async () => {
        expect(getColumn(line4)).to.equal(4);
      });
    });

    describe("getSeatId", () => {
      it("FBFBBFFRLR should return 357", async () => {
        expect(getSeatId(line1)).to.equal(357);
      });
      it("BFFFBBFRRR should return 567", async () => {
        expect(getSeatId(line2)).to.equal(567);
      });
      it("FFFBBBFRRR should return 119", async () => {
        expect(getSeatId(line3)).to.equal(119);
      });
      it("BBFFBBFRLL should return 820", async () => {
        expect(getSeatId(line4)).to.equal(820);
      });
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 828 when using the input file`, async () => {
      expect(await processPartOne(rawInput)).to.equal(828);
    });
    it(`[Part 2] should always return 565 when using the input file`, async () => {
      expect(await processPartTwo(rawInput)).to.equal(565);
    });
  });
});
