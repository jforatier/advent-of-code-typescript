import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo } from "../index";

const part1sample1 = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;

describe(`2020 - Day 21`, () => {
  describe("Functions", () => {});

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput).length).to.equal(30);
      expect(parse(rawInput)[0].length).to.equal(394);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 5 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(5);
    });
    it(`[Part 2 - Sample 1] should return 'mxmxvkd,sqjhc,fvjkl' when using the sample 1`, async () => {
      expect(processPartTwo(part1sample1)).to.equal("mxmxvkd,sqjhc,fvjkl");
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 1679 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(1679);
    });
    it(`[Part 2] should always return "lmxt,rggkbpj,mxf,gpxmf,nmtzlj,dlkxsxg,fvqg,dxzq" when using the input file`, async () => {
      expect(processPartTwo(rawInput)).to.equal(
        "lmxt,rggkbpj,mxf,gpxmf,nmtzlj,dlkxsxg,fvqg,dxzq"
      );
    });
  });
});
