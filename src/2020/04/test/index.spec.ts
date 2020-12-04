import { expect } from "chai";
import {
  rawInput,
  isPassportValid,
  parsePassports,
  processPartOne,
  processPartTwo,
  Attribute,
} from "../index";

describe(`2020 - Day 4`, () => {
  describe("isPassportValid", () => {
    it("should return true whith this passport 1", async () => {
      const passport = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm`;
      expect(isPassportValid(parsePassports(passport)[0], false)).to.equal(true);
    });
    it("should return false whith this passport 2", async () => {
      const passport = `iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929`;
      expect(isPassportValid(parsePassports(passport)[0], false)).to.equal(false);
    });
    it("should return true whith this passport 3", async () => {
      const passport = `hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm`;
      expect(isPassportValid(parsePassports(passport)[0], false)).to.equal(true);
    });
    it("should return false whith this passport 4", async () => {
      const passport = `hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;
      expect(isPassportValid(parsePassports(passport)[0], false)).to.equal(false);
    });
    it("should return false whith this passport 5", async () => {
      const passport = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926`;
      expect(isPassportValid(parsePassports(passport)[0], true)).to.equal(false);
    });

    it("should return true whith this passport 6", async () => {
      const passport = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f`;
      expect(isPassportValid(parsePassports(passport)[0], true)).to.equal(true);
    });

    it("should return true whith this passport 7", async () => {
      const passport = `eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm`;
      expect(isPassportValid(parsePassports(passport)[0], true)).to.equal(true);
    });

    it("should return false whith this passport 8", async () => {
      const passport = `iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946`;
      expect(isPassportValid(parsePassports(passport)[0], true)).to.equal(false);
    });

    
    it("should return false whith this passport 9", async () => {
      const passport = `hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277`;
      expect(isPassportValid(parsePassports(passport)[0], true)).to.equal(false);
    });

    it("should return true whith this passport 10", async () => {
      const passport = `hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022`;
      expect(isPassportValid(parsePassports(passport)[0], true)).to.equal(true);
    });
  });

  describe("isRuleValid", () => {
    it("byr valid", async () => {
      expect(new Attribute("byr:2002").isAttributeValid()).to.equal(true);
    });
    it("byr invalid", async () => {
      expect(new Attribute("byr:2003").isAttributeValid()).to.equal(false);
    });
    it("hgt valid 1", async () => {
      expect(new Attribute("hgt:60in").isAttributeValid()).to.equal(true);
    });
    it("hgt valid 2", async () => {
      expect(new Attribute("hgt:190cm").isAttributeValid()).to.equal(true);
    });
    it("hgt invalid 1", async () => {
      expect(new Attribute("hgt:190in").isAttributeValid()).to.equal(false);
    });
    it("hgt invalid 2", async () => {
      expect(new Attribute("hgt:190").isAttributeValid()).to.equal(false);
    });

    it("hcl valid", async () => {
      expect(new Attribute("hcl:#123abc").isAttributeValid()).to.equal(true);
    });
    it("hcl invalid 1", async () => {
      expect(new Attribute("hcl:#123abz").isAttributeValid()).to.equal(false);
    });
    it("hcl invalid 2", async () => {
      expect(new Attribute("hcl:123abc").isAttributeValid()).to.equal(false);
    });
    it("ecl valid", async () => {
      expect(new Attribute("ecl:brn").isAttributeValid()).to.equal(true);
    });
    it("ecl invalid", async () => {
      expect(new Attribute("ecl:wat").isAttributeValid()).to.equal(false);
    });

    it("pid valid", async () => {
      expect(new Attribute("pid:000000001").isAttributeValid()).to.equal(true);
    });
    it("pid invalid", async () => {
      expect(new Attribute("pid:0123456789").isAttributeValid()).to.equal(
        false
      );
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 204 when using the input file`, async () => {
      expect(await processPartOne(rawInput)).to.equal(204);
    });
    it(`[Part 2] should always return 179 when using the input file`, async () => {
      expect(await processPartTwo(rawInput)).to.equal(179);
    });
  });
});
