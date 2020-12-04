import { readInput } from "./../../utils";

export const rawInput = readInput();

export class Bag {
  color: string;
  count: number;

  constructor(color: string, count: number) {
    this.color = color;
    this.count = count;
  }
}

export class BagContent {
  color: string;
  bags: Bag[] = [];

  constructor(line: string) {
    const splittedLine = line
      .replace(/ bags| bag|\./g, "")
      .replace(/no other/g, "0 no other")
      .split(" contain ");
    this.color = splittedLine[0];
    splittedLine[1].split(",").map((value) => {
      const splitted = value.trim().split(" ");
      this.bags.push(
        new Bag(splitted[1] + " " + splitted[2], parseInt(splitted[0]))
      );
    });
  }
}

const canContain = (
  color: string,
  set: Set<string>,
  allBags: BagContent[]
): Set<string> => {
  allBags.forEach((rule) => {
    rule.bags
      .filter((rule) => rule.color === color)
      .forEach(() => {
        set.add(rule.color);
        canContain(rule.color, set, allBags);
      });
  });
  return set;
};

const feelTheWeight = (
  color: string,
  count: number,
  multiplier: number,
  allBags: BagContent[]
) =>
  allBags
    .filter((rule) => rule.color === color)
    .reduce(
      (count, rule) =>
        rule.bags
          .filter((rule) => rule.count > 0)
          .reduce(
            (count: number, rule) =>
              feelTheWeight(
                rule.color,
                count + rule.count * multiplier,
                rule.count * multiplier,
                allBags
              ),
            count
          ),
      count
    );

export const parse = (input: string): BagContent[] =>
  input.split(/\r?\n/).map((rule) => new BagContent(rule));

export const processPartOne = (input: string): number => {
  let bags = parse(input);
  let result = canContain("shiny gold", new Set(), bags);
  return result.size;
};

export const processPartTwo = (input: string): number => {
  let bags = parse(input);
  let result = feelTheWeight("shiny gold", 0, 1, bags);
  return result;
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/07 - Part 1:", resultA); // -> 155
console.log("[Solution] 2020/07 - Part 2:", resultB); // -> 54803
