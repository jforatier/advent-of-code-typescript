import { readInput } from "./../../utils";

export const rawInput = readInput();

export const BirthYear = "byr";
export const IssueYear = "iyr";
export const ExpirationYear = "eyr";
export const Height = "hgt";
export const HairColor = "hcl";
export const EyeColor = "ecl";
export const PassportID = "pid";
export const CountryID = "cid";

export const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const mandatoryAttributesName = [
  BirthYear,
  IssueYear,
  ExpirationYear,
  Height,
  HairColor,
  EyeColor,
  PassportID,
];

export class Attribute {
  name: string;
  value: string;

  constructor(input: string) {
    const params = input.split(":");
    this.name = params[0];
    this.value = params[1];
  }

  // ----------- Part 2 -------------------
  isAttributeValid = () => {
    switch (this.name) {
      case BirthYear:
        return (
          this.value.length === 4 &&
          parseInt(this.value) >= 1920 &&
          parseInt(this.value) <= 2002
        );
      case IssueYear:
        return (
          this.value.length === 4 &&
          parseInt(this.value) >= 2010 &&
          parseInt(this.value) <= 2020
        );
      case ExpirationYear:
        return (
          this.value.length === 4 &&
          parseInt(this.value) >= 2020 &&
          parseInt(this.value) <= 2030
        );
      case Height:
        if (this.value.endsWith("cm")) {
          const hgtNum = parseInt(this.value.split("cm")[0], 10);
          return hgtNum >= 150 && hgtNum <= 193;
        } else if (this.value.endsWith("in")) {
          const hgtNum = parseInt(this.value.split("in")[0], 10);
          return hgtNum >= 59 && hgtNum <= 76;
        } else {
          return false;
        }
      case HairColor:
        return /^#[0-9a-f]{6}$/.test(this.value);
      case EyeColor:
        return !!eyeColors.find((color) => color === this.value);
      case PassportID:
        return /^[0-9]{9}$/.test(this.value);
      case CountryID:
        return true;
      default:
        console.log(this.name);
        return false;
    }
    // -----------------------------------------------
  };
}

export class Passport {
  attributes: Attribute[] = [];

  constructor(input: string) {
    const lines = input.split("\n");

    lines.forEach((element) => {
      const attributesString = element.split(" ");
      attributesString.forEach((attribute) => {
        const attributeCasted = new Attribute(attribute);
        if (attributeCasted.name && attributeCasted.value) {
          this.attributes.push(attributeCasted);
        }
      });
    });
  }

  isValid = () => {
    return (
      this.attributes.filter((element) => !element.isAttributeValid()).length <=
      0
    );
  };

  hasAllValidAttributes = (mandatoryAttributesName: string[]): boolean => {
    const foundAttributes: Attribute[] = [];
    this.attributes.forEach((element) => {
      if (
        element &&
        mandatoryAttributesName.includes(element.name) &&
        element.value
      ) {
        foundAttributes.push(element);
      }
    });
    return foundAttributes.length === mandatoryAttributesName.length;
  };
}

export const isPassportValid = (
  passport: Passport,
  checkAttributes: boolean
): boolean => {
  if (checkAttributes) {
    return (
      passport.isValid() &&
      passport.hasAllValidAttributes(mandatoryAttributesName)
    );
  }
  return passport.hasAllValidAttributes(mandatoryAttributesName);
};

export const countPasswordValid = (
  passports: Passport[],
  checkAttributes: boolean
): number => {
  let count = 0;
  passports.forEach((passport) => {
    if (isPassportValid(passport, checkAttributes)) {
      count++;
    }
  });
  return count;
};

export const parsePassports = (input: string): Passport[] =>
  input
    .split(/\r?\n\r?\n/)
    .map((raw) => raw.replace(/\r?\n/g, " "))
    .map((item) => new Passport(item));

export const processPartOne = (input: string): number => {
  return countPasswordValid(parsePassports(input), false);
};

export const processPartTwo = (input: string): number => {
  return countPasswordValid(parsePassports(input), true);
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/04 - Part 1:", resultA); // -> 204
console.log("[Solution] 2020/04 - Part 2:", resultB); // -> 179
