import { expect } from "chai";
import { input, sumMake2020, find2020with2, find2020with3 } from "../index";

describe(`2020 - Day 1`, () => {
  describe("sumMake2020", () => {
    it("should return false whith values 12,569", async () => {
      expect(await sumMake2020(12, 569)).to.equal(false);
    });

    it("should return true whith values 1721,299", async () => {
      expect(await sumMake2020(1721, 299)).to.equal(true);
    });

    it("should return true whith values 979,366,675", async () => {
      expect(await sumMake2020(979, 366, 675)).to.equal(true);
    });

    it("should return false whith values 179,306,675", async () => {
      expect(await sumMake2020(179, 306, 675)).to.equal(false);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 1006176 when using the input file`, async () => {
      expect(await find2020with2(input)).to.equal(1006176);
    });
    it(`[Part 2] should always return 199132160 when using the input file`, async () => {
      expect(await find2020with3(input)).to.equal(199132160);
    });
  });
});
