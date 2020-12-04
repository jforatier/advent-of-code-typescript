import { expect } from "chai";
import {
  rawInput,
  operate,
  process,
  startPartOne,
  startPartTwo,
} from "../index";

describe(`2019 - Day 2`, () => {
  describe("operate", () => {
    it("should return [1, 4, 5, 6, 30, 50, 80] whith values 12,569", async () => {
      const inputArr = [1, 4, 5, 6, 30, 50, 0];
      expect(
        operate({
          instructionPointer: 0,
          instructions: inputArr,
        }).instructions.toString()
      ).to.equal([1, 4, 5, 6, 30, 50, 80].toString());
    });

    it("should return [2, 4, 5, 6, 30, 50, 1500] whith values 12,569", async () => {
      const inputArr = [2, 4, 5, 6, 30, 50, 0];
      expect(
        operate({
          instructionPointer: 0,
          instructions: inputArr,
        }).instructions.toString()
      ).to.equal([2, 4, 5, 6, 30, 50, 1500].toString());
    });

    it("should return [3500,9,10,70,2,3,11,0,99,30,40,50] whith values 12,569", async () => {
      const inputArr = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
      expect(
        process({
          instructionPointer: 0,
          instructions: inputArr,
        }).instructions.toString()
      ).to.equal([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50].toString());
    });

    it("should return [2,0,0,0,99] whith values 12,569", async () => {
      const inputArr = [1, 0, 0, 0, 99];
      expect(
        process({
          instructionPointer: 0,
          instructions: inputArr,
        }).instructions.toString()
      ).to.equal([2, 0, 0, 0, 99].toString());
    });

    it("should return [2,3,0,6,99] whith values 12,569", async () => {
      const inputArr = [2, 3, 0, 3, 99];
      expect(
        process({
          instructionPointer: 0,
          instructions: inputArr,
        }).instructions.toString()
      ).to.equal([2, 3, 0, 6, 99].toString());
    });

    it("should return [2,4,4,5,99,9801] whith values 12,569", async () => {
      const inputArr = [2, 4, 4, 5, 99, 0];
      expect(
        process({
          instructionPointer: 0,
          instructions: inputArr,
        }).instructions.toString()
      ).to.equal([2, 4, 4, 5, 99, 9801].toString());
    });

    it("should return [30,1,1,4,2,5,6,0,99] whith values 12,569", async () => {
      const inputArr = [1, 1, 1, 4, 99, 5, 6, 0, 99];
      expect(
        process({
          instructionPointer: 0,
          instructions: inputArr,
        }).instructions.toString()
      ).to.equal([30, 1, 1, 4, 2, 5, 6, 0, 99].toString());
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 3101878 when using the input file`, async () => {
      expect(startPartOne(rawInput.split(",").map(Number))).to.equal(3101878);
    });
    it(`[Part 2] should always return 8444 when using the input file and 19690720`, async () => {
      expect(startPartTwo(rawInput, 19690720)).to.equal(8444);
    });
  });
});
